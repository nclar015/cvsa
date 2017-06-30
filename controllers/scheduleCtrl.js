app.controller('scheduleCtrl', function($scope, $http) {
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