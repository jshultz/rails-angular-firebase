angular.module('AngularRails')
    .controller('AcctCtrl', ["currentAuth", "Auth", "$scope","$location","$timeout", 
        function(currentAuth, Auth, $scope, $location, $timeout)  {

    $scope.auth = Auth;

    var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");

}]);