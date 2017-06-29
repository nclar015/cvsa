var app = angular.module("myApp", ["ngRoute"]);

app.config(function($routeProvider) {
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
});

app.controller('mainCtrl', function($scope, $http) {
    $http.get("http://cvsa.azzida.com/games.php")
        .then(function(gameresponse) {
            $("#grey-cover").fadeOut(800);
            $scope.games = gameresponse.data.data;
            $scope.chooseTeam = false;
            $scope.myMatches = [];
            $scope.allMyMatches = [];
            $scope.pastMatches = [];
            $scope.hasTeam = JSON.parse(localStorage.yourTeams);

            if ($scope.hasTeam.length > 0) {
                $scope.chooseTeam = true;
            } else {
                $scope.chooseTeam = false;
            }

            $scope.gamer = $.map($scope.games, function(value, index) {
                return [value];
            });

            for (i = 0; i < $scope.gamer.length; i++) {
                if ($scope.gamer[i].Field == "BYE") {
                    $scope.gamer[i].Time = "";
                } else {
                    var s = $scope.gamer[i].Date + "T" + $scope.gamer[i].Time;
                    var a = s.split(/[^0-9]/);
                    //for (i=0;i<a.length;i++) { alert(a[i]); }
                    $scope.gamer[i].Time = new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
                }
            }

            var i;
            var j;

            for (i = 0; i < $scope.gamer.length; i++) {
                for (j = 0; j < $scope.hasTeam.length; j++) {
                    if ($scope.hasTeam[j] === $scope.gamer[i].Home_Team || $scope.hasTeam[j] === $scope.gamer[i].Away_Team) {
                        $scope.allMyMatches.push($scope.gamer[i]);
                        var d = new Date();
                        d.setMonth(d.getMonth() - 3);
                        var matchDate = new Date($scope.gamer[i].Date);
                        if (matchDate >= d) {
                            $scope.myMatches.push($scope.gamer[i]);
                        } else {
                            $scope.pastMatches.push($scope.gamer[i])
                        }
                    }
                }
            }

        });

    $scope.findSeason = function() {
        var d = new Date();
        var thisMonth = d.getMonth();
        if (thisMonth) {
            thisSeason = "Spring"
        }
        var thisYear = d.getFullYear();
        var thisSeason = thisSeason + " " + thisYear;
        return thisSeason;
    }

    var showFull = false;
    var showUpcoming = true;

    $scope.fullBackground = function() {

        $("#fullSchedule").css({ "background": "#69c55f", "color": "white" });
        $("#upcomingSchedule").css({ "background": "white", "color": "#333" });

    };

    $scope.upcomingBackground = function() {

        $("#fullSchedule").css({ "background": "white", "color": "#333" });
        $("#upcomingSchedule").css({ "background": "#69c55f", "color": "white" });

    };

    $scope.matchDay = function(matchDate, matchHome, matchAway, matchTime, matchField) {
        localStorage.matchHome = matchHome;
        localStorage.matchAway = matchAway;
        localStorage.matchTime = matchTime;
        localStorage.matchField = matchField;
        localStorage.matchDate = matchDate;
        window.location = "/#/match";
    };


    $scope.pickField = function(field) {
        switch (field) {
            case 'Bryan Park ""A""':
            case 'Bryan Park ""B""':
            case 'Bryan Park ""C""':
            case 'Bryan Park ""D""':
            case 'Bryan Park ""E""':
            case 'Bryan Park ""F""':
            case 'Bryan Park "A"':
            case 'Bryan Park "B"':
            case 'Bryan Park "C"':
            case 'Bryan Park "D"':
            case 'Bryan Park "E"':
            case 'Bryan Park "F"':
                return "Bryan Park";
            case "BYE":
                return "Richmond";
            case "Dorey Park #1":
            case "Dorey Park #2":
            case "Dorey Park #3":
            case "Dorey Park #4":
            case "Dorey Park #5":
            case "Dorey Park #6":
                return "Dorey Park";
            case "City Stadium":
                return "City Stadium";
            default:
                return field;
        }
    };

    $scope.pickBack = function(field) {
        switch (field) {
            case 'Bryan Park "A"':
            case 'Bryan Park "B"':
            case 'Bryan Park "C"':
            case 'Bryan Park "D"':
            case 'Bryan Park "E"':
            case 'Bryan Park "F"':
                return "Images/bryanpark.png";
            case "BYE":
                return "Images/bye.png";
            case "Dorey Park #1":
            case "Dorey Park #2":
            case "Dorey Park #3":
            case "Dorey Park #4":
            case "Dorey Park #5":
            case "Dorey Park #6":
                return "Images/doreypark.png";
            default:
                return "Images/doreypark.png";
        }
    };
});

app.controller('teamsCtrl', function($scope, $window, $http) {
    $http.get("http://cvsa.azzida.com/service.php")
        .then(function(response) {
            $scope.teams = response.data.data;
        });

    $(".topdone").fadeIn();
    $scope.ourTeam = [];

    //localStorage.yourTeams = "";
    if (localStorage.yourTeams.length > 0) {
        $scope.localTeams = JSON.parse(localStorage.yourTeams);
        var i;
        for (i = 0; i < $scope.localTeams.length; i++) {
            $scope.ourTeam.push($scope.localTeams[i]);
        }
    }

    $scope.ownTeam = function(team) {
        document.getElementById(team).style.display = "none";
        $scope.ourTeam.push(team);
        $scope.ourTeam = $scope.ourTeam.filter(function(item, index, inputArray) {
            return inputArray.indexOf(item) === index;
        });
        localStorage.yourTeams = JSON.stringify($scope.ourTeam);
        document.getElementById('choose-team').scrollTop = 0;

    };

    $scope.ridTeam = function(team) {
        document.getElementById(team).style.display = "block";
        var findTeam = $scope.ourTeam.indexOf(team);
        $scope.ourTeam.splice(findTeam);
        localStorage.yourTeams = JSON.stringify($scope.ourTeam);
    };


});

app.controller('standingsCtrl', function($scope, $window, $http) {

    $http.get("http://cvsa.azzida.com/standing-service.php")
        .then(function(response) {
            $scope.standings = response.data.data;

            $scope.d1 = [];
            $scope.d2 = [];
            $scope.d3 = [];
            $scope.d4 = [];
            $scope.d5 = [];
            $scope.d6 = [];
            $scope.d7 = [];
            $scope.d8 = [];
            $scope.d9 = [];
            $scope.d10 = [];

            var i;

            for (i = 0; i < $scope.standings.length; i++) {
                if ($scope.standings[i].Division == "1") {
                    $scope.d1.push($scope.standings[i]);
                } else if ($scope.standings[i].Division == "2") {
                    $scope.d2.push($scope.standings[i]);
                } else if ($scope.standings[i].Division == "3") {
                    $scope.d3.push($scope.standings[i]);
                } else if ($scope.standings[i].Division == "4") {
                    $scope.d4.push($scope.standings[i]);
                } else if ($scope.standings[i].Division == "5") {
                    $scope.d5.push($scope.standings[i]);
                } else if ($scope.standings[i].Division == "6") {
                    $scope.d6.push($scope.standings[i]);
                } else if ($scope.standings[i].Division == "7") {
                    $scope.d7.push($scope.standings[i]);
                } else if ($scope.standings[i].Division == "8") {
                    $scope.d8.push($scope.standings[i]);
                } else if ($scope.standings[i].Division == "9") {
                    $scope.d9.push($scope.standings[i]);
                } else if ($scope.standings[i].Division == "10") {
                    $scope.d10.push($scope.standings[i]);
                } else {
                    console.log("no division");
                }
            }
        });


});

app.controller('matchCtrl', function($scope) {
    $(".topdone").fadeIn();
    $scope.homeTeam = localStorage.matchHome;
    $scope.awayTeam = localStorage.matchAway;
    $scope.date = new Date(localStorage.matchDate);
    $scope.time = new Date(localStorage.matchTime);
    $scope.field = localStorage.matchField;

    $scope.pickField = function(field) {
        switch (field) {
            case 'Bryan Park ""A""':
            case 'Bryan Park ""B""':
            case 'Bryan Park ""C""':
            case 'Bryan Park ""D""':
            case 'Bryan Park ""E""':
            case 'Bryan Park ""F""':
            case 'Bryan Park "A"':
            case 'Bryan Park "B"':
            case 'Bryan Park "C"':
            case 'Bryan Park "D"':
            case 'Bryan Park "E"':
            case 'Bryan Park "F"':
                return "Bryan Park";
            case "BYE":
                return "Richmond";
            case "Dorey Park #1":
            case "Dorey Park #2":
            case "Dorey Park #3":
            case "Dorey Park #4":
            case "Dorey Park #5":
            case "Dorey Park #6":
                return "Dorey Park";
            case "City Stadium":
                return "City Stadium"
            default:
                return field;
        }
    };
    $scope.fieldImage = function(field) {
        switch (field) {
            case 'Bryan Park ""A""':
            case 'Bryan Park ""B""':
            case 'Bryan Park ""C""':
            case 'Bryan Park ""D""':
            case 'Bryan Park ""E""':
            case 'Bryan Park ""F""':
            case 'Bryan Park "A"':
            case 'Bryan Park "B"':
            case 'Bryan Park "C"':
            case 'Bryan Park "D"':
            case 'Bryan Park "E"':
            case 'Bryan Park "F"':
                return "Images/bryanParkMap.png";
            case "BYE":
                return "Richmond";
            case "Dorey Park #1":
            case "Dorey Park #2":
            case "Dorey Park #3":
            case "Dorey Park #4":
            case "Dorey Park #5":
            case "Dorey Park #6":
                return "Images/doreyParkMap.png";
            case "City Stadium":
                return "Images/bryanParkMap.png"
            default:
                return "Images/bryanParkMap.png";
        }
    };
    $scope.findField = function(field) {
        switch (field) {
            case 'Bryan Park ""A""':
                return "A";
            case 'Bryan Park ""B""':
                return "B";
            case 'Bryan Park ""C""':
                return "C";
            case 'Bryan Park ""D""':
                return "D";
            case 'Bryan Park ""E""':
                return "E";
            case 'Bryan Park ""F""':
                return "F";
            case 'Bryan Park "A"':
                return "A";
            case 'Bryan Park "B"':
                return "B";
            case 'Bryan Park "C"':
                return "C";
            case 'Bryan Park "D"':
                return "D";
            case 'Bryan Park "E"':
                return "E";
            case 'Bryan Park "F"':
                return "F";
            case "BYE":
                return "BYE";
            case "Dorey Park #1":
                return "1";
            case "Dorey Park #2":
                return "2";
            case "Dorey Park #3":
                return "3";
            case "Dorey Park #4":
                return "4";
            case "Dorey Park #5":
                return "5";
            case "Dorey Park #6":
                return "6";
            case "City Stadium":
                return "Main";
            default:
                return field;
        }
    };

});