angular.module('AngularRails')
    .controller('LoginCtrl', ["Auth", "$scope","$location","$timeout","UserData", 
        function(Auth, $scope, $location, $timeout, UserData)  {

    $scope.auth = Auth;

    var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");

    // we would probably save a profile when we register new users on our site
    // we could also read the profile to see if it's null
    // here we will just simulate this with an isNewUser boolean
    var isNewUser = true;

    // any time auth status updates, add the user data to scope
      $scope.auth.$onAuth(function(authData) {
        $scope.authData = authData;
        if (authData) {
          UserData.checkIfUserExists(authData);
            $timeout(function(){ 
               $location.path('/');
          },1);
        }

      });

    // any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
    });


}]);