angular.module('AngularRails')
    .controller('LoginCtrl', ["Auth", "$scope","$location","$timeout","UserData", 
        function(Auth, $scope, $location, $timeout, UserData)  {

    $scope.auth = Auth;

    var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");

    var USERS_LOCATION = 'https://rails-angular-fireba.firebaseio.com/users';

    // we would probably save a profile when we register new users on our site
    // we could also read the profile to see if it's null
    // here we will just simulate this with an isNewUser boolean
    var isNewUser = true;

    userExistsCallback = function (authData) {

      ref.onAuth(function(authData) {
        if (authData) {
          // save the user's profile into Firebase so we can list users,
          // use them in Security and Firebase Rules, and show profiles
          ref.child("users").child(authData.uid).set({
            provider: authData.provider,
            full_name: UserData.getName(authData),
          });
        }
      });
    } // userExistsCallback


    // any time auth status updates, add the user data to scope
      $scope.auth.$onAuth(function(authData) {
        $scope.authData = authData;
        console.log('authData', authData);

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