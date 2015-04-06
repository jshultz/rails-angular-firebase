angular.module('AngularRails')
    .controller('AcctCtrl', ["currentAuth", "Auth", "$scope", 
        function(currentAuth, Auth, $scope)  {

    $scope.auth = Auth;
    
    console.log('authdata', currentAuth);
    
    var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");

    // any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
    });

	$scope.facebookLogin = function() {

      ref.authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
        }
      });
  } // facebookLogin

  $scope.googleLogin = function() {

    ref.authWithOAuthPopup("google", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });

  } // googleLogin

  $scope.twitterLogin = function() {

    ref.authWithOAuthPopup("twitter", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });

  } // twitterLogin


}]);