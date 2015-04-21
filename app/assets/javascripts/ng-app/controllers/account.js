angular.module('AngularRails')
    .controller('AcctCtrl', ["currentAuth", "Auth", "$scope","$location","$timeout","UserData",
        function(currentAuth, Auth, $scope, $location, $timeout, UserData)  {

    $scope.auth = Auth;
    $scope.email = '';

    var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");

    // any time auth status updates, add the user data to scope
      $scope.auth.$onAuth(function(authData) {
        $scope.authData = authData;
        if (authData) {
        	$scope.displayName = UserData.getName(authData)
        }

      });

      $scope.update = function(user) {
        $scope.master = angular.copy(user);
      };

      $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
      };

      $scope.step1 = function() {

        if ($scope.email) {

          var onComplete = function(error) {
            if (error) {
              console.log('Synchronization failed');
              $location.path('/account/step1');
            } else {
              console.log('Synchronization succeeded');
              $location.path('/');
            }
          };

          ref.child('users').child(currentAuth.uid).update({ email: this.email }, onComplete);

          $scope.email = '';
        }
      }


}]);
