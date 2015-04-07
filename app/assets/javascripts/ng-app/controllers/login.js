angular.module('AngularRails')
    .controller('LoginCtrl', ["Auth", "$scope","$location","$timeout", 
        function(Auth, $scope, $location, $timeout)  {

    $scope.auth = Auth;

    var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");

    var USERS_LOCATION = 'https://rails-angular-fireba.firebaseio.com/users';

    // we would probably save a profile when we register new users on our site
    // we could also read the profile to see if it's null
    // here we will just simulate this with an isNewUser boolean
    var isNewUser = true;

    // find a suitable name based on the meta info given by each provider
    function getName(authData) {
      switch(authData.provider) {
         case 'password':
           return authData.password.email.replace(/@.*/, '');
         case 'twitter':
           return authData.twitter.displayName;
         case 'facebook':
           return authData.facebook.displayName;
      }
    } // getName

    userExistsCallback = function (authData) {

      ref.onAuth(function(authData) {
        if (authData) {
          // save the user's profile into Firebase so we can list users,
          // use them in Security and Firebase Rules, and show profiles
          ref.child("users").child(authData.uid).set({
            provider: authData.provider,
            full_name: getName(authData),
          });
        }
      });
    } // userExistsCallback

    // Tests to see if /users/<userId> has any data. 
    function checkIfUserExists(authData) {
      var usersRef = new Firebase(USERS_LOCATION);
      usersRef.child(authData.uid).once('value', function(snapshot) {
        var exists = (snapshot.val() !== null);

        if (!exists) {
          userExistsCallback(authData);
        }
        
      });
    } // checkIfUserExists


    // any time auth status updates, add the user data to scope
      $scope.auth.$onAuth(function(authData) {
        $scope.authData = authData;
        console.log('authData', authData);

        if (authData) {
          checkIfUserExists(authData);
            $timeout(function(){ 
               $location.path('/');
          },1);
        }

      });


    // any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
    });

  	$scope.facebookLogin = function() {

        ref.authWithOAuthPopup("facebook", function(error, authData) {
          console.log('here')
          if (error) {
            console.log("Login Failed!", error);
          } else {
            checkIfUserExists(authData);
            $timeout(function(){ 
               $location.path('/');
            },1);
          }
        });
    } // facebookLogin

    $scope.googleLogin = function() {

      ref.authWithOAuthPopup("google", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          // storeData(authData);
          checkIfUserExists(authData);
          $timeout(function(){ 
               $location.path('/');
            },1);
        }
      });
    } // googleLogin

    $scope.twitterLogin = function() {

      ref.authWithOAuthPopup("twitter", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          // storeData(authData);
          checkIfUserExists(authData);
          $timeout(function(){ 
               $location.path('/');
            },1);
        }
      });
    } // twitterLogin


}]);