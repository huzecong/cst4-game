// 'use strict';

let App = angular.module('myApp', [
    'ngMaterial', 'ngSanitize'
]).config(['$locationProvider', '$mdThemingProvider', '$sanitizeProvider',
    function ($locationProvider, $mdThemingProvider, $sanitizeProvider) {
        $locationProvider.hashPrefix('!');
        $mdThemingProvider.theme('default').primaryPalette('purple');
        $mdThemingProvider.enableBrowserColor();
        $sanitizeProvider.addValidAttrs(["style"]);
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

App.controller('AppCtrl', ['$scope', '$http', '$mdToast', '$mdMenu', '$timeout', function _mainController($scope, $http, $mdToast, $mdMenu, $timeout, _rawScriptingJS) {
    if (_rawScriptingJS === undefined) {
        let args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
        $http.get('/static/scripting.js').then(function (response) {
            args = args.concat([response.data]);
            console.log(args);
            _mainController.apply(null, args);
        });
        return;
    }
    // VariableStorage to be assigned by eval
    let global = null;
    let local = null;
    eval(_rawScriptingJS);  // evil impl that breaks under strict mode
    // if strict mode is required, simply copy-paste scripting.js into this scope

    $scope.current = {
        event: null,
        page: null,
        choices: [],
        progress: 0,
        text: null,
        input: "",
        eventIndex: -1,
        pageType: "text" // "deadline", "achievements", "ending"
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
        movingTimer: -1,
        badChoicesText: []
    };
    $scope.events = [];

    let inTransition = false;
    let pageMap = {};
    let imageCache = [];

    let endingsList = [];
    let endingMap = {};

    let achievementsList = [];
    let achievementMap = {};

    let failedExams = [];

    function sleep(ms) {
        return new Promise(resolve => {
            inTransition = true;
            setTimeout(() => {
                inTransition = false;
                resolve();
            }, ms)
        });
    }

    Array.prototype.shuffle = function () {
        // Credit: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/
        let array = this.slice();
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };

    Array.prototype.randomPick = function () {
        return this[Math.floor(Math.random() * this.length)];
    };

    function convertExamsToEvent(examEvent) {
        if (examEvent.actionsBefore !== undefined)
            runActions(examEvent.actionsBefore);

        let exams = examEvent.exams.filter(x => x.condition === undefined || x.condition.value());
        let examNames = exams.map(x => x.name);
        let failedExamNames = failedExams.map(x => x.name);
        let event = {
            type: "normal",
            name: "期末考试",
            stage: examEvent.stage,
            pages: [
                {
                    id: "start",
                    text: [
                        examEvent.stage + "的期末考试如期而至。",
                    ],
                    actions: [
                        set("$不及格学分", 0),
                        set("#不及格课程", 0)
                    ]
                }
            ]
        };
        if (examNames.length > 0) {
            event.pages[0].text.push("你需要参加的考试有：" + examNames.join("、"));
        } else {
            event.pages[0].text.push("你没有需要参加的考试。");
        }
        if (failedExamNames.length > 0) {
            event.pages[0].text.push("你还需要补考下列重修课程：" + failedExamNames.join("、"));
        }

        let correctAction = function (idx) {
            return [
                exec(async function () {
                    let button = document.querySelectorAll("#question-choices > button")[idx];
                    button.innerText = "正确";
                    button.style.color = "green";
                    await sleep(1000);
                })
            ];
        };
        let wrongAction = function (idx, exam) {
            return [
                exec(async function () {
                    let button = document.querySelectorAll("#question-choices > button")[idx];
                    button.innerText = "错误";
                    button.style.color = "red";
                    failedExams.push(exam);
                    await sleep(1000);
                }),
                increase("$不及格学分", exam.points),
                increase("#不及格课程", 1),
                ge("$不及格学分", 20).then(ending("退学"))
            ];
        };
        let pageNum = 0;
        let curExams = failedExams.concat(exams);
        failedExams = examEvent.exams.filter(x => x.condition !== undefined && !x.condition.value()); // take it next year
        for (let exam of curExams) {
            let q = exam.questions.randomPick();
            let page = {
                id: "q" + pageNum,
                image: q.image,
                text: [
                    '<div style="text-align: center"><b>' + exam.name + "期末考试" + '</b><br/>' + "学分：" + exam.points + '</div>'
                ].concat([q.text]),
                choices: [{
                    text: q.answer,
                    actions: correctAction
                }].concat(q.choices.map(x => ({
                    text: x,
                    actions: wrongAction
                }))).shuffle().map((x, idx) => ({
                    text: x.text,
                    actions: x.actions(idx, exam)
                })),
                actions: []
            };
            ++pageNum;
            event.pages.push(page);
        }
        for (let i = 0; i < pageNum; ++i)
            event.pages[i].actions.push(jump("q" + i));
        event.pages[pageNum].actions.push(jump("final"));
        event.pages.push(...examEvent.pages);
        return event;
    }

    function initialize() {
        global.clear();
        local.clear();
        let initActions = [
            set("#脱单", false),
            set("#体力", 0),
            set("#魅力", 0),
            set("#成绩", 0),
            set("#直博", false),
            set("#社工", 0),
            set("#不合格课程", 0)
        ];
        failedExams = [];
        for (let action of initActions)
            valueOf(action);
    }

    function loadScript(js, callback) {
        let jsValue = eval(js);
        if (!(jsValue instanceof Array))
            jsValue = [jsValue];
        $scope.events = jsValue;
        initialize();
        // cheat();

        // load images
        let imagePaths = [];
        imageCache = [];
        for (let event of $scope.events)
            if (event.type === "exam") {
                for (let exam of event.exams)
                    for (let q of exam.questions)
                        if (q.image !== undefined)
                            imagePaths.push(q.image)
            } else {
                for (let page of event.pages)
                    if (page.image !== undefined)
                        imagePaths.push(page.image);
            }
        for (let path of imagePaths) {
            let img = new Image();
            img.src = '/static/image/' + path;
            imageCache.push(img);
        }

        if (callback !== undefined) {
            callback();
        } else {
            loadEvent(0);
        }
    }

    function loadScriptFromUrl(url, callback) {
        $http.get(url).then(function (response) {
            let currentScript = response.data;
            loadScript(currentScript, callback);
        });
    }

    function recursiveAddText(currentText, textArray) {
        if (!textArray) return;
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
        $scope.current.pageType = "deadline";
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

        let initMovingButtons = function () {
            let $board = document.querySelector(".deadline-board");
            let $buttons = Array.prototype.slice.call(document.querySelectorAll(".deadline-board .md-button"));
            let $padding = 5;
            let ratio = $board.offsetWidth / $board.offsetHeight;
            let $left = $buttons.map(x => $padding - x.offsetLeft);
            let $width = $buttons.map(x => $board.offsetWidth - x.offsetWidth - 2 * $padding);
            let $top = $buttons.map(x => $padding - x.offsetTop);
            let $height = $buttons.map(x => $board.offsetHeight - x.offsetHeight - 2 * $padding);

            let deltaX = [], deltaY = [];
            let speed = 0.5; // 100% in a second
            for (let i in $buttons) {
                let theta = (Math.random() - 0.5) * Math.PI;
                let x = Math.cos(theta), y = Math.sin(theta);
                x *= speed;
                y *= speed;
                deltaX.push(x);
                deltaY.push(y);
            }

            let posX = [], posY = [];
            for (let i in $buttons) {
                posX.push(-$left[i] / $width[i]);
                posY.push(-$top[i] / ratio / $height[i]);
            }

            function rectify(x) {
                let val = x % 2.0;
                if (val < 0) val += 2.0;
                if (val > 1.0) return 2.0 - val;
                else return val;
            }

            let fps = 60;
            $scope.deadline.movingTimer = setInterval(function () {
                for (let i in $buttons) {
                    let value = $buttons[i];
                    posX[i] += deltaX[i] / fps;
                    posY[i] += deltaY[i] / fps;
                    value.style.left = ($left[i] + rectify(posX[i]) * $width[i]) + "px";
                    value.style.top = ($top[i] + rectify(posY[i] * ratio) * $height[i]) + "px";
                }
            }, 1000 / fps);
        };

        let initTimer = function () {
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
        };

        let actuallyInit = function () {
            if (ddlConfig.moving)
                initMovingButtons();
            initTimer();
        };

        // Run this after current digest cycle, so that everything is loaded
        $timeout(function () {
            // Countdown before start
            let countdown = 3;
            let $countdown = document.querySelector(".deadline-board-countdown");
            let $countdownTextWrapper = $countdown.querySelector("div");
            let $countdownText = $countdownTextWrapper.querySelector("b");
            $countdown.style.display = "flex";
            $countdown.style.opacity = "1";
            $countdownTextWrapper.style.transform = "";
            let countdownFunc = function () {
                if (countdown === 0) {
                    $countdownText.innerText = "GO!";
                    $countdown.style.opacity = "0";
                    $countdownTextWrapper.style.transform = "scale(2.5)";
                    clearInterval(countdownTimer);
                    setTimeout(function () {
                        $countdown.style.display = "none";
                        actuallyInit();
                    }, 300);
                } else {
                    $countdownText.innerText = countdown;
                    --countdown;
                }
            };
            countdownFunc();
            let countdownTimer = setInterval(countdownFunc, 1000);
        }, 0, false);
    }

    function shrinkElement(element, height, callback, duration = 400) {
        if (inTransition) return;
        let sectionHeight = element.offsetHeight;
        let tempTransition = element.style.transition;
        element.style.transition = "";
        inTransition = true;

        requestAnimationFrame(function () {
            element.style.height = sectionHeight + "px";
            element.style.transition = tempTransition + " height " + duration + "ms";

            requestAnimationFrame(function () {
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

    function loadText(pageText) {
        let text = [];
        recursiveAddText(text, pageText);
        $scope.current.text = text;
        $scope.current.html = text.map(x => "<p>" + x + "</p>").join("\n");
    }

    function loadPage(label, animate = true) {
        let loadPageImpl = function () {
            if (!(label in pageMap)) {
                throw '跳转的页面标识"' + label + '"未定义';
            }
            $scope.current.page = pageMap[label];

            if ($scope.current.page.actionsBefore)
                runActions($scope.current.page.actionsBefore);

            if ($scope.current.page.deadline !== undefined) {
                let ddlConfig = $scope.current.page.deadline;
                initDeadline(ddlConfig);
            } else {
                $scope.current.pageType = "text";
                loadText($scope.current.page.text);

                let choices = [];
                if ($scope.current.page.choices && $scope.current.page.choices.length > 0) {
                    for (let choice of $scope.current.page.choices) {
                        let displayChoice = Object.assign({}, choice);
                        displayChoice.text = valueOf(choice.text);
                        choices.push(displayChoice);
                    }
                }
                $scope.current.choices = choices;
            }
        };

        if (animate) {
            changeCardContent(loadPageImpl);
        } else {
            loadPageImpl();
        }
    }

    function loadEvent(idx, animate = true, pageId = 'start') {
        let loadEventImpl = function () {
            let event = $scope.events[idx];
            $scope.current.pageType = "text";
            $scope.current.eventIndex = idx;
            $scope.current.progress = 100 * idx / $scope.events.length;

            if (event.type === "exam")
                event = convertExamsToEvent(event);
            // console.log(event);
            $scope.current.event = event;
            // console.log($scope.current.event.name);
            pageMap = {};
            for (let page of $scope.current.event.pages) {
                if (page.id in pageMap) {
                    throw '重复的页面标识"' + page.id + '"';
                }
                pageMap[page.id] = page;
            }
            $scope.current.input = "";  // only reset input box upon event switching

            loadPage(pageId, false);
        };

        if (animate) {
            changeCardContent(loadEventImpl, 0);
        } else {
            loadEventImpl();
        }
    }

    function grantAchievement(name, toast = true) {
        let achievementId = achievementMap[name];
        if (achievementId === undefined)
            throw "未定义的成就：" + name;
        let bitStr = localStorage.getItem("_achievements");
        if (bitStr[achievementId] === "0") {
            if (toast) showToast("解锁成就：" + name);
            bitStr = bitStr.substr(0, achievementId) + "1" + bitStr.substr(achievementId + 1);
            localStorage.setItem("_achievements", bitStr);
        }
    }

    function drawEndingImage(path) {
        let image = new Image();
        image.src = '/static/image/' + path;
        image.onload = function () {
            let canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0);
            ctx.font = "400 20pt SimHei";
            ctx.fillText(global.values['姓名'], 128, 103);
            document.querySelector(".md-card-image").src = canvas.toDataURL("image/jpg", 1.0);
        };
    }

    function loadEnding(name, animate = true) {
        let ending = null;
        ending = endingMap[name];

        let loadEndingImpl = function () {
            $scope.current.pageType = "ending";
            $scope.current.event = {
                name: ending.name,
                stage: "结局"
            };
            drawEndingImage(ending.image);
            $scope.current.choices = [];
            loadText([
                '<div style="font-size: smaller; text-align: right;">' +
                '   <i>长按或右键单击保存图片。</i>' +
                '</div>'].concat(ending.text));
            grantAchievement("结局：" + ending.name, false);
        };
        changeCardContent(loadEndingImpl, 0);
    }

    function loadAchievements(animate = true) {
        let loadAchievementsImpl = function () {
            $scope.current.pageType = "achievements";
            $scope.achievements = [];
            let numAchievements = 0;
            let bitStr = localStorage.getItem("_achievements");
            for (let i = 0; i < achievementsList.length; ++i) {
                if (bitStr[i] === "1") {
                    $scope.achievements.push(achievementsList[i]);
                    ++numAchievements;
                } else {
                    $scope.achievements.push({
                        name: "？？？",
                        text: "？？？"
                    });
                }
            }
            $scope.current.event = {
                name: "成就列表",
                stage: "已解锁成就：" + numAchievements + " / " + achievementsList.length
            };
            $scope.current.page = {};
        };
        changeCardContent(loadAchievementsImpl, 0);
    }

    function nextEvent() {
        local.clear();
        let nextIndex = $scope.current.eventIndex + 1;
        while (nextIndex < $scope.events.length) {
            if ($scope.events[nextIndex].condition && valueOf($scope.events[nextIndex].condition) === false) {
                ++nextIndex;
            } else {
                loadEvent(nextIndex);
                return;
            }
        }
        loadEnding("顺利毕业");
    }

    let showToast = function () {
        // Encapsulate variable in a closure
        let toast = [];
        return function (msg) {
            toast.push(msg);
            if (toast.length === 1) {
                let curToast = null;
                let nextToast = function () {
                    if (curToast !== null) {
                        toast = toast.slice(1);
                        // $mdToast.hide(curToast);
                    }
                    if (toast.length > 0) {
                        let msg = toast[0];
                        // console.log("$mdToast:", msg);
                        curToast = $mdToast.show($mdToast.simple().textContent(msg));
                        setTimeout(nextToast, 3000);
                    }
                };
                nextToast();
            }
        };
    }();

    function runActions(actions, nextEventIfNoJump = false) {
        let jumpTarget = null;
        let endingName = null;
        let promises = [];
        let hasExec = false;

        let nextActions = actions.slice();

        while (nextActions.length > 0) {
            let action = nextActions.shift();
            if (action instanceof Exec)
                hasExec = true;
            let val = action.value();
            if (val instanceof Promise) {
                promises.push(val);
            } else if (Array.isArray(val)) {
                nextActions = val.concat(nextActions);
            } else if (val instanceof Jump) {
                jumpTarget = val.label;
            } else if (val instanceof Log) {
                showToast(val.msg);
            } else if (val instanceof Ending) {
                endingName = val.name;
            } else if (val instanceof Achievement) {
                grantAchievement(val.name);
            }
        }

        if (endingName !== null) {
            loadEnding(endingName);
        } else {
            let redirect = function () {
                if (jumpTarget !== null) {
                    loadPage(jumpTarget);
                } else if (!hasExec && nextEventIfNoJump) {
                    // console.log("End event");
                    nextEvent();
                }
            };
            if (promises.length > 0) {
                Promise.all(promises).then(redirect);
            } else {
                redirect();
            }
        }
    }

    $scope.choose = function (index) {
        if (inTransition) return;

        let actions = [];
        if ($scope.current.page.actions)
            actions.push(...$scope.current.page.actions);
        if (index === -1) {
            // console.log("Choose continue");
        } else {
            let choice = $scope.current.page.choices[index];
            // console.log("Choose " + index + ": " + choice.text);
            if (choice.actions)
                actions.push(...choice.actions);
        }

        if ($scope.current.page.input) {
            // console.log("Input " + $scope.current.page.input + ": " + $scope.current.input);
            set($scope.current.page.input, $scope.current.input).value()
        }

        runActions(actions, true);
    };

    function finishDeadline() {
        clearTimeout($scope.deadline.timer);
        if ($scope.current.page.deadline.moving)
            clearInterval($scope.deadline.movingTimer);
        // console.log("QTE: " + $scope.deadline.gradesList[$scope.deadline.grade]);

        let actions = [set("$__QTE__", $scope.deadline.grade)];
        if ($scope.current.page.actions)
            actions.push(...$scope.current.page.actions);

        runActions(actions, true);
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

    $scope.loadLocalScript = function () {
        let f = document.createElement("input");
        f.style.display = "none";
        f.type = "file";
        f.name = "file";
        let eventListener = function () {
            let reader = new FileReader();
            reader.onload = function (ev) {
                loadScript(ev.target.result);
                cheat();
                showToast("已成功载入：" + f.files[0].name + "。");
            };
            reader.readAsText(f.files[0]);
            f.removeEventListener('change', eventListener);
        };
        f.addEventListener('change', eventListener);
        f.click();
    };

    $scope.loadMainMenu = function (animate = true) {
        loadEvent(0, animate);
    };

    $scope.loadMemory = function () {
        if (["_global", "_local", "_eventIndex", "_pageId"].some(x => !localStorage.getItem(x))) {
            showToast("不存在游戏存档");
            return;
        }
        global.values = JSON.parse(localStorage.getItem("_global"));
        local.values = JSON.parse(localStorage.getItem("_local"));
        let eventIndex = parseInt(localStorage.getItem("_eventIndex"));
        let pageId = localStorage.getItem("_pageId");
        loadEvent(eventIndex, true, pageId);
        showToast("载入完成");
    };

    $scope.saveMemory = function () {
        if ($scope.current.pageType === "ending" || $scope.current.pageType === "achievements") {
            showToast("当前页面无法存档");
            return;
        }
        localStorage.setItem("_global", JSON.stringify(global.values));
        localStorage.setItem("_local", JSON.stringify(local.values));
        localStorage.setItem("_eventIndex", $scope.current.eventIndex);
        localStorage.setItem("_pageId", $scope.current.page.id);
        showToast("保存完成");
    };

    if (window.innerWidth >= 960) {
        $mdToast.show($mdToast.simple()
            .textContent("推荐在手机上使用Chrome浏览器进行游戏。" +
                "当然，也可以使用桌面版Chrome浏览器，进入审查元素并选择移动端视图。")
            .position("top left").hideDelay(5000));
    }

    // Load data

    $http.get('/static/scripts/achievements.js').then(function (response) {
        let currentScript = response.data;
        achievementsList = eval(currentScript);

        for (let idx in achievementsList)
            achievementMap[achievementsList[idx].name] = idx;
        if (localStorage.getItem("_achievements") === null)
            localStorage.setItem("_achievements", "0".repeat(achievementsList.length));
    });

    $http.get('/static/scripts/ending.js').then(function (response) {
        let currentScript = response.data;
        endingsList = eval(currentScript);

        for (let ending of endingsList)
            endingMap[ending.name] = ending;
    });

    initialize();
    loadScriptFromUrl('/static/scripts/merged_script.js', function () {
        let mainMenuEvent = {
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
                            actions: [
                                achieve("开始游戏")
                            ]
                        },
                        {
                            text: "载入游戏",
                            actions: [
                                exec($scope.loadMemory)
                            ]
                        },
                        {
                            text: "成就列表",
                            actions: [
                                exec(loadAchievements)
                            ]
                        }
                    ]
                }
            ]
        };
        $scope.events.unshift(mainMenuEvent);
        $scope.loadMainMenu(false);
    });

    function cheat() {
        let initActions = [
            set("#体力", 100),
            set("#魅力", 100),
            set("#成绩", 100),
            set("#社工", 100),
            set("#性别", "男"),
            set("#姓名", "杨天龙")
        ];
        for (let action of initActions)
            valueOf(action);
    }

    function printVariables() {
        console.log("全局变量：");
        console.log(Object.entries(global.values).map(x => x[0] + ": " + x[1]).join("\n"));
        console.log("局部变量：");
        console.log(Object.entries(local.values).map(x => x[0] + ": " + x[1]).join("\n"));
    }

    window.cheat = cheat;
    window.printVariables = printVariables;
}]);
