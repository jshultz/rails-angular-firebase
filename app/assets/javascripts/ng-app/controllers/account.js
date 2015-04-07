angular.module('AngularRails')
    .controller('AcctCtrl', ["currentAuth", "Auth", "$scope","$location","$timeout","UserData", 
        function(currentAuth, Auth, $scope, $location, $timeout, UserData)  {

    $scope.auth = Auth;

    var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");

    // any time auth status updates, add the user data to scope
      $scope.auth.$onAuth(function(authData) {
        $scope.authData = authData;
        if (authData) {
        	$scope.displayName = UserData.getName(authData)
        }

      });


}]);