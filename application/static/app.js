'use strict';

// Declare app level module which depends on views, and components
let App = angular.module('myApp', [
    'ngRoute',
    // 'myApp.view1',
    // 'myApp.view2',
    'ngMaterial',
    'ngMessages'
]).config(['$locationProvider', '$routeProvider', '$mdThemingProvider',
    function ($locationProvider, $routeProvider, $mdThemingProvider) {
        $locationProvider.hashPrefix('!');
        $routeProvider.otherwise({redirectTo: '/view1'});
        $mdThemingProvider.theme('default').primaryPalette('purple');
        $mdThemingProvider.enableBrowserColor();
    }
]).filter('character', function () {
    return function (input) {
        return String.fromCharCode(64 + parseInt(input, 10));
    };
});

App.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.currentEvent = null;
    $scope.currentPage = null;

    $scope.currentText = null;

    let pageMap = {};

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
        $scope.currentPage = pageMap[label];
        let currentText = [];
        recursiveAddText(currentText, $scope.currentPage.text);
        $scope.currentText = currentText;
        console.log($scope.currentPage);
    }

    $http.get('/static/scripts/新生舞会.js').then(function (response) {
        let currentScript = response.data;
        $scope.currentEvent = eval(currentScript);
        console.log($scope.currentEvent);
        pageMap = {};
        for (let page of $scope.currentEvent.pages)
            pageMap[page.id] = page;
        loadPage('start');
    });

    $scope.choose = function (index) {
        let jumpTarget = null;
        let actions = [];
        if ($scope.currentPage.hasOwnProperty('actions'))
            actions.push(...$scope.currentPage.actions);
        if (index === -1) {
            console.log("Choose continue");
        } else {
            let choice = $scope.currentPage.choices[index];
            console.log("Choose " + index + ": " + choice.text);
            if (choice.hasOwnProperty('actions'))
                actions.push(...choice.actions);
        }
        for (let action of actions) {
            let val = action.value();
            console.log(val);
            if (val instanceof Jump) {
                if (jumpTarget === null)
                    jumpTarget = val.label;
            }
        }
        if (jumpTarget === null) {
            console.log("End event");
        } else {
            loadPage(jumpTarget);
        }
    };
}]);
