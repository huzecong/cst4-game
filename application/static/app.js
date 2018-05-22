'use strict';

let App = angular.module('myApp', [
    'ngMaterial'
]).config(['$locationProvider', '$mdThemingProvider',
    function ($locationProvider, $mdThemingProvider) {
        $locationProvider.hashPrefix('!');
        $mdThemingProvider.theme('default').primaryPalette('purple');
        $mdThemingProvider.enableBrowserColor();
    }
]).filter('character', function () {
    return function (input) {
        return String.fromCharCode(64 + parseInt(input, 10));
    };
}).filter('variableRemoveScope', function () {
    return function (input) {
        if (input[0] === '#' || input[0] === '$') return input.substr(1);
        return input;
    };
});

App.controller('AppCtrl', ['$scope', '$http', '$mdToast', function ($scope, $http, $mdToast) {
    let defaultEvent = {
        type: "main",
        name: "天下大计",
        stage: "计四年级毕业联欢",
        pages: [
            {
                id: "start",
                image: "logo.jpeg",
                choices: [
                    {
                        text: "开始游戏",
                    },
                    {
                        text: "载入游戏",
                    },
                    {
                        text: "成就列表",
                    }
                ],
                actions: [
                    exec(function () {
                        loadScript('/static/scripts/stage1.js');
                    }),
                    achieve("开始游戏")
                ]
            },
            {
                id: "deadline",
                deadline: {
                    targets: [3, 6, 9],
                    title: "造计算机",
                    time: 10000000,
                    moving: true,
                    badChoices: 3
                },
                actions: [
                    exec(function () {
                        loadScript('/static/scripts/stage1.js');
                    })
                ]
            }
        ],
    };

    $scope.current = {
        event: defaultEvent,
        page: defaultEvent.pages[0],
        choices: [],
        progress: 0,
        text: null,
        input: "",
        eventIndex: -1,
        ending: false
    };
    $scope.deadline = {
        progress: 0,
        clicks: 0,
        maxClicks: 0,
        timeRemaining: 0,
        targets: [],
        targetsPercentage: [],
        grade: 0,
        gradesList: [],
        timer: -1,
        badChoicesText: []
    };
    $scope.events = [];

    let inTransition = false;

    let pageMap = {};

    function initialize() {
        global.clear();
        local.clear();
    }

    let imageCache = [];

    function loadScript(url) {
        $http.get(url).then(function (response) {
            let currentScript = response.data;
            $scope.events = eval(currentScript);
            initialize();

            // load images
            imageCache = [];
            for (let event of $scope.events)
                for (let page of event.pages)
                    if (page.image !== undefined) {
                        let img = new Image();
                        img.src = '/static/image/' + page.image;
                        imageCache.push(img);
                    }

            loadEvent(0);
        });
    }

    function replaceVariables(text) {
        return text.replace(/{([^{}]+)}/g, function (str, name) {
            return lookup(name).value();
        });
    }

    function recursiveAddText(currentText, textArray) {
        if (textArray === null) return;
        if (typeof textArray === "string") {
            currentText.push(replaceVariables(textArray));
            return;
        }
        for (let text of textArray) {
            if (typeof text === "string") {
                currentText.push(replaceVariables(text));
            } else {
                recursiveAddText(currentText, text.value());
            }
        }
    }

    function initDeadline(ddlConfig) {
        $scope.deadline = {
            progress: 0,
            clicks: 0,
            targets: ddlConfig.targets.slice().sort(),
            timeRemaining: ddlConfig.time,
            grade: 0
        };
        $scope.deadline.maxClicks = $scope.deadline.targets[$scope.deadline.targets.length - 1];
        $scope.deadline.targetsPercentage =
            $scope.deadline.targets.map(x => 100 * x / $scope.deadline.maxClicks).reverse();

        if ($scope.deadline.targets.length === 1) {
            $scope.deadline.gradesList = ["失败", "通过！"];
        } else if ($scope.deadline.targets.length === 2) {
            $scope.deadline.gradesList = ["失败", "及格", "优秀！"];
        } else if ($scope.deadline.targets.length === 3) {
            $scope.deadline.gradesList = ["失败", "及格", "良好", "优秀！"];
        }

        $scope.deadline.badChoicesText = ["开小差", "打盹", "放弃治疗"].slice(0, ddlConfig.badChoices | 0);
        // if (ddlConfig.moving) {
        //     setTimeout(function () {
        //         let $board = document.querySelector(".deadline-board");
        //         let $buttons = Array.prototype.slice.call(document.querySelectorAll(".deadline-board .md-button"));
        //         console.log(document.querySelectorAll(".deadline-board .md-button"));
        //         console.log($buttons);
        //         let $left = $buttons.map(x => $board.offsetLeft - x.offsetLeft);
        //         let $right = $buttons.map(x => $board.offsetLeft + $board.offsetWidth - x.offsetLeft - x.offsetWidth);
        //         let $top = $buttons.map(x => $board.offsetTop - x.offsetTop);
        //         let $bottom = $buttons.map(x => $board.offsetTop + $board.offsetHeight - x.offsetTop - x.offsetHeight);
        //         console.log($left, $right, $top, $bottom);
        //     }, 100);
        // }

        // Start countdown timer
        let startTime = Date.now();
        let totalTime = ddlConfig.time;
        $scope.deadline.timer = setInterval(function () {
            let remaining = totalTime - (((Date.now() - startTime) / 1000) | 0);
            if (remaining <= 0) {
                finishDeadline();
            } else {
                $scope.$apply(function () {
                    $scope.deadline.timeRemaining = remaining;
                });
            }
        }, 1000);
    }

    function shrinkElement(element, height, callback, duration = 400) {
        let sectionHeight = element.offsetHeight;
        let tempTransition = element.style.transition;
        element.style.transition = "";
        inTransition = true;

        requestAnimationFrame(function () {
            element.style.height = sectionHeight + "px";
            element.style.transition = tempTransition + " height " + duration + "ms";

            requestAnimationFrame(function () {
                // console.log("shrink: " + sectionHeight + " to " + height);
                let eventListener = function (e) {
                    inTransition = false;

                    element.removeEventListener('transitionend', eventListener);
                    element.style.transition = tempTransition;
                    if (callback !== undefined && callback !== null) callback();
                };
                element.addEventListener('transitionend', eventListener);

                element.style.height = height + "px";
            });
        });
    }

    function expandElement(element, callback, duration = 400) {
        let tempHeight = element.style.height;
        let tempTransition = element.style.transition;
        element.style.transition = "";
        element.style.height = null;
        inTransition = true;

        requestAnimationFrame(function () {
            let targetHeight = element.offsetHeight;
            element.style.height = tempHeight;
            element.style.transition = tempTransition + " height " + duration + "ms";

            requestAnimationFrame(function () {
                // console.log("expand: " + tempHeight + " to " + targetHeight);
                let eventListener = function (e) {
                    inTransition = false;

                    element.removeEventListener('transitionend', eventListener);
                    element.style.height = null;
                    element.style.transition = tempTransition;
                    if (callback !== undefined && callback !== null) callback();
                };
                element.addEventListener('transitionend', eventListener);

                element.style.height = targetHeight + "px";
            });
        });
    }

    function changeCardContent(callback, height) {
        let $card = document.querySelector("md-card");
        let $cardHeader = document.querySelector("md-card-header");

        let headerHeight = $cardHeader.scrollHeight;
        $cardHeader.style.minHeight = headerHeight + "px";
        if (height === undefined) height = headerHeight;
        shrinkElement($card, height, function () {
            $scope.$apply(callback);

            expandElement($card, function () {
                $cardHeader.style.minHeight = null;
            });
        });
    }

    function loadPage(label, animate = true) {
        let loadPageImpl = function () {
            $scope.current.page = pageMap[label];

            if ($scope.current.page.deadline !== undefined) {
                let ddlConfig = $scope.current.page.deadline;
                initDeadline(ddlConfig);
            } else {
                let text = [];
                recursiveAddText(text, $scope.current.page.text);
                $scope.current.text = text;

                let choices = [];
                if ($scope.current.page.choices !== undefined && $scope.current.page.choices.length > 0) {
                    for (let choice of $scope.current.page.choices) {
                        let displayChoice = Object.assign({}, choice);
                        displayChoice.text = valueOf(choice.text);
                        choices.push(displayChoice);
                    }
                }
                $scope.current.choices = choices;
            }

            if ($scope.current.page.actionsBefore)
                runActions($scope.current.page.actionsBefore, false);
        };

        if (animate) {
            changeCardContent(loadPageImpl);
        } else {
            loadPageImpl();
        }
    }

    function loadEvent(idx, animate = true) {
        let loadEventImpl = function () {
            $scope.current.eventIndex = idx;
            $scope.current.progress = 100 * idx / $scope.events.length;
            $scope.current.event = $scope.events[idx];
            console.log($scope.current.event.name);
            pageMap = {};
            for (let page of $scope.current.event.pages)
                pageMap[page.id] = page;

            loadPage('start', false);
        };

        if (animate) {
            changeCardContent(loadEventImpl, 0);
        } else {
            loadEventImpl();
        }
    }

    let endingsList = [];
    let endingMap = {};

    $http.get('/static/scripts/ending.js').then(function (response) {
        let currentScript = response.data;
        endingsList = eval(currentScript);

        for (let ending of endingsList)
            endingMap[ending.name] = ending;
    });

    function loadEnding(name, animate = true) {
        if (name !== undefined) {
            let ending = endingMap[name];
            let loadEndingImpl = function () {
                $scope.current.event = {
                    name: ending.name,
                    stage: "结局"
                };
                $scope.current.page = {
                    image: ending.image,
                };
                $scope.current.choices = [];
                $scope.current.text = [];
                recursiveAddText($scope.current.text, ending.text);
                $scope.current.ending = true;
            };

            changeCardContent(loadEndingImpl, 0);
        }
    }

    function nextEvent() {
        local.clear();
        let nextIdx = $scope.current.eventIndex + 1;
        if (nextIdx >= $scope.events.length) {
            loadEnding();
        } else {
            loadEvent(nextIdx);
        }
    }

    function runActions(actions, nextEventIfNoJump = true) {
        let jumpTarget = null;
        let endingName = null;
        let toastContent = null;
        let exec = [];

        for (let action of actions) {
            if (action instanceof Exec) {
                exec.push(action);
                continue;
            }
            let val = action.value();
            // console.log(action.constructor.name, '=>', val);
            if (val instanceof Jump) {
                jumpTarget = val.label;
            } else if (val instanceof Log) {
                toastContent = val.msg;
            } else if (val instanceof Ending) {
                endingName = val.name;
            }
        }

        if (toastContent !== null) {
            $mdToast.showSimple(toastContent);
        }
        if (endingName !== null) {
            loadEnding(endingName);
        } else if (exec.length !== 0) {
            for (let action of exec)
                action.value();
        } else {
            if (jumpTarget !== null) {
                loadPage(jumpTarget);
            } else if (nextEventIfNoJump) {
                console.log("End event");
                nextEvent();
            }
        }
    }

    $scope.choose = function (index) {
        if (inTransition) return;

        let actions = [];
        if ($scope.current.page.actions)
            actions.push(...$scope.current.page.actions);
        if (index === -1) {
            console.log("Choose continue");
        } else {
            let choice = $scope.current.page.choices[index];
            console.log("Choose " + index + ": " + choice.text);
            if (choice.actions)
                actions.push(...choice.actions);
        }

        if ($scope.current.page.input) {
            console.log("Input " + $scope.current.page.input + ": " + $scope.current.input);
            set($scope.current.page.input, $scope.current.input).value()
        }

        runActions(actions);
    };

    function finishDeadline() {
        clearInterval($scope.deadline.timer);
        console.log("QTE: " + $scope.deadline.gradesList[$scope.deadline.grade]);

        let actions = [set("$__QTE__", $scope.deadline.grade)];
        if ($scope.current.page.actions)
            actions.push(...$scope.current.page.actions);

        runActions(actions);
    }

    if ($scope.current.page.deadline) {
        initDeadline($scope.current.page.deadline);
    }

    $scope.deadlineClick = function (delta) {
        $scope.deadline.clicks = Math.max(0, $scope.deadline.clicks + delta);
        let clicks = $scope.deadline.clicks;
        $scope.deadline.progress = 100 * clicks / $scope.deadline.maxClicks;
        let grade = 0;
        for (let i = $scope.deadline.targets.length - 1; i >= 0; --i)
            if (clicks >= $scope.deadline.targets[i]) {
                grade = i + 1;
                break;
            }
        $scope.deadline.grade = grade;
    };

    if (window.innerWidth >= 960) {
        $mdToast.show($mdToast.simple()
            .textContent("推荐在手机上使用Chrome浏览器进行游戏。" +
                "当然，也可以使用桌面版Chrome浏览器，进入审查元素并选择移动端视图。")
            .position("top left").hideDelay(5000));
    }
}]);
