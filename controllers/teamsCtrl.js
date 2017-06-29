angular.module('myApp').controller('teamsCtrl', function($scope, $window, $http) {
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