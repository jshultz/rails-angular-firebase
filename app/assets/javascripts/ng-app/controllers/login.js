angular.module('AngularRails')
    .controller('LoginCtrl', ["Auth", "$scope","$location","$timeout","UserData","$q",
        function(Auth, $scope, $location, $timeout, UserData, $q)  {

    $scope.auth = Auth;

    var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");

    function authDataCallback(authData) {
      if (authData) {
        console.log('authData', authData)
        $scope.loggedIn = true;
        $scope.displayName = UserData.getName(authData);
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
        console.log('loggedIn', $scope.loggedIn);
        $scope.$apply()
      } else {
        $scope.loggedIn = false;
        console.log("User is logged out");
        console.log('loggedIn', $scope.loggedIn);
      }
    }

    $scope.logout = function() {
      ref.unauth();
      console.log('logging out?')
      $scope.loggedIn = false;
    }

    ref.onAuth(authDataCallback);

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
