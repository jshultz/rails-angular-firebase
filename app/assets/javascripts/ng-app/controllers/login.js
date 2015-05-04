angular.module('AngularRails')
    .controller('LoginCtrl', ["Auth", "$scope","$location","$timeout","UserData","$q",
        function(Auth, $scope, $location, $timeout, UserData, $q)  {

    $scope.auth = Auth;

    var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");

    function authDataCallback(authData) {
      if (authData) {
        $scope.loggedIn = true;
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
      } else {
        $scope.loggedIn = false;
        console.log("User is logged out");
      }
    }

    $scope.logout = function() {
      ref.unauth();
      console.log('logging out?')
      $scope.loggedIn = false;
    }

    ref.onAuth(authDataCallback);

    // ref.onAuth(function(authData) {
    //   if (authData) {
    //     $scope.authData = authData;
    //     // save the user's profile into Firebase so we can list users,
    //     // use them in Security and Firebase Rules, and show profiles
    //     $scope.displayName = UserData.getName(authData);
    //   }
    // });

    // we would probably save a profile when we register new users on our site
    // we could also read the profile to see if it's null
    // here we will just simulate this with an isNewUser boolean
    var isNewUser = true;

    $scope.userLogin = function(service) {

    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);

      }
    });
  }; // userLogin

    // any time auth status updates, add the user data to scope
    // $scope.auth.$onAuth(function(authData) {
    //   $scope.authData = authData;
    //   if (authData) {

    //     $scope.displayName = UserData.getName(authData);

    //     // UserData.checkIfUserExists(authData).then(function(response){
    //     //   if (response == 'created') {
    //     //     $timeout(function(){
    //     //          $location.path('/account/step1');
    //     //     },1); // timeout
    //     //   } else {
    //     //     $timeout(function(){
    //     //          $location.path('/');
    //     //     },1); // timeout
    //     //   }
    //     // }); // checkIfUserExists

    //   }; // if authData
    // }); // $scope.oauth.$onAuth


}]);
