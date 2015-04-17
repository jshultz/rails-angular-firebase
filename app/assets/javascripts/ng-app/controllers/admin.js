angular.module('AngularRails')
    .controller('AdminCtrl', ["currentAuth", "Auth", "$scope","$location","$timeout","UserData",
        function(currentAuth, Auth, $scope, $location, $timeout, UserData)  {

    $scope.auth = Auth;
    $scope.email = '';

    var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");

    console.log('$scope.users', $scope.users)

    // any time auth status updates, add the user data to scope
      $scope.auth.$onAuth(function(authData) {
        $scope.authData = authData;
        if (authData) {
        	$scope.displayName = UserData.getName(authData);

          UserData.getUsers().then(function(data) {
            $scope.users = data;
          });

        }

      });



}]);
