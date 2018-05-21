'use strict';

// Declare app level module which depends on views, and components
let App = angular.module('myApp', [
    'ngRoute',
    'ngMaterial',
    'ngMessages'
]).config(['$locationProvider', '$routeProvider', '$mdThemingProvider',
    function ($locationProvider, $routeProvider, $mdThemingProvider) {
        $locationProvider.hashPrefix('!');
        $mdThemingProvider.theme('default').primaryPalette('purple');
        $mdThemingProvider.enableBrowserColor();
    }
]).filter('character', function () {
    return function (input) {
        return String.fromCharCode(64 + parseInt(input, 10));
    };
});

App.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.current = {
        event: null,
        page: null,
        choices: [],
        progress: 0,
        text: null,
        input: "",
        event_idx: -1,
    };
    $scope.events = [];

    let pageMap = {};

    function initialize() {
        global.clear();
        local.clear();
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

    function loadPage(label) {
        $scope.current.page = pageMap[label];

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

    function loadEvent(idx) {
        $scope.current.event_idx = idx;
        $scope.current.progress = 100 * idx / $scope.events.length;
        $scope.current.event = $scope.events[idx];
        console.log($scope.current.event.name);
        pageMap = {};
        for (let page of $scope.current.event.pages)
            pageMap[page.id] = page;
        loadPage('start');
    }

    function nextEvent() {
        local.clear();
        let nextIdx = $scope.current.event_idx + 1;
        if (nextIdx > $scope.events.length) {
            loadEvent(0);
        } else if (nextIdx === $scope.events.length) {
            initialize();
            ++$scope.current.event_idx;
            $scope.current.progress = 100;
            $scope.current.page = {
                // actions: [jump("start")]
            };
            $scope.current.text = [
                "事件结束。",
                "本来这里应该跳转到下一个事件。",
                "但是现在还没有跳转逻辑。",
                "也没有下一个事件。",
                "所以点继续会回到最开始，不妨尝试一下所有可能吧。"
            ];
        } else {
            loadEvent(nextIdx);
        }
    }

    $http.get('/static/scripts/stage1.js').then(function (response) {
        let currentScript = response.data;
        $scope.events = eval(currentScript);
        initialize();
        loadEvent(0);
    });

    $scope.choose = function (index) {
        let actions = [];
        if ($scope.current.page.hasOwnProperty('actions'))
            actions.push(...$scope.current.page.actions);
        if (index === -1) {
            console.log("Choose continue");
        } else {
            let choice = $scope.current.page.choices[index];
            console.log("Choose " + index + ": " + choice.text);
            if (choice.hasOwnProperty('actions'))
                actions.push(...choice.actions);
        }

        if ($scope.current.page.hasOwnProperty('input')) {
            console.log("Input " + $scope.current.page.input + ": " + $scope.current.input);
            set($scope.current.page.input, $scope.current.input).value()
        }

        let jumpTarget = null;
        for (let action of actions) {
            let val = action.value();
            console.log(action.constructor.name, '=>', val);
            if (val instanceof Jump) {
                jumpTarget = val.label;
            }
        }

        if (jumpTarget === null) {
            console.log("End event");
            nextEvent();
        } else {
            loadPage(jumpTarget);
        }
    };
}]);
