var app = angular.module("myApp", ["ngRoute"]);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when("/teams", {
                templateUrl: "views/team.html",
                controller: "teamsCtrl"
            })
            .when("/standings", {
                templateUrl: "views/standings.html",
                controller: "standingsCtrl"
            })
            .when("/match", {
                templateUrl: "views/match.html",
                controller: "matchCtrl"
            })
            .when("/schedule", {
                templateUrl: "views/schedule.html",
                controller: "scheduleCtrl"
            })
            .otherwise({
                templateUrl: "views/main.html",
                controller: "mainCtrl"
            });
    }
]);