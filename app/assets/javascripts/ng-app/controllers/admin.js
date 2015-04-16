angular.module('AngularRails')
    .controller('AdminCtrl', ["currentAuth", "Auth", "$scope","$location","$timeout","UserData", 
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

      $scope.users = function() {

        console.log('here2')

        // Attach an asynchronous callback to read the data at our users reference
        ref.child('users').on("child_added", function(snapshot) {
          console.log('here')
          console.log(snapshot.val());
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });

      }


}]);