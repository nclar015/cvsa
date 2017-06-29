app.controller('teamsCtrl', function($scope, $http) {
    $http.get("service.php")
    .then(function (response) {$scope.teams = response.data.records;});
});