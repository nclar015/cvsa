angular.module('myApp').controller('matchCtrl', function($scope) {
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