var app = angular.module("myApp", ["ngRoute"]);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when("/teams", {
                templateUrl: "views/teamChoice/team.html",
                controller: "teamsCtrl"
            })
            .when("/standings", {
                templateUrl: "views/standings/standings.html",
                controller: "standingsCtrl"
            })
            .when("/match", {
                templateUrl: "views/match/match.html",
                controller: "matchCtrl"
            })
            .when("/schedule", {
                templateUrl: "views/schedule/schedule.html",
                controller: "mainCtrl"
            })
            .otherwise({
                templateUrl: "views/main/main.html",
                controller: "mainCtrl"
            });
    }
]);