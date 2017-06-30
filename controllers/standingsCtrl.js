angular.module('myApp').controller('standingsCtrl', function($scope, $window, $http) {
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