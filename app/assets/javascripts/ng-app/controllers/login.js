angular.module('AngularRails')
    .controller('LoginCtrl', ["Auth", "$scope","$location","$timeout","UserData","$q", "$rootScope",
        function(Auth, $scope, $location, $timeout, UserData, $q, $rootScope)  {

    $scope.auth = Auth;

    var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");

    function authDataCallback(authData) {
      if (authData) {
        $rootScope.loggedIn = true;
        $scope.loggedIn = true;
        $rootScope.displayName = UserData.getName(authData);
        UserData.getProfilePhoto(authData).then(function(response){
          if (response != null) {
            $rootScope.profilePhoto = response.photo;
          } else {
            $scope.phone = '';
          }
        }); // getPhone
        UserData.getAccessLevel(authData).then(function(response) {
          if ( response == 1) {
            $rootScope.admin = true;
          } else {
            $rootScope.admin = false;
          }
        });
      } else {
        $rootScope.loggedIn = false;
        $rootScope.displayName = ''
      }
    } // authDataCallback

    $scope.logout = function() {
      ref.unauth();
      $scope.loggedIn = false;
    } // logout

    ref.onAuth(authDataCallback);

    var isNewUser = true;

    userExistsCheck = function(authData) {
      UserData.checkIfUserExists(authData).then(function(response){
        if (response == 'created') { // new user created
          var onComplete = function(error) {
            if (error) {
              console.log('Synchronization failed' + error);
            } else {
              console.log('Synchronization succeeded');
            }
          }; // after

          $timeout(function(){
            $location.path('/account/step1');
            $rootScope.authData = authData;
          },1); // redirect to step1
        } else { // user already existed

            console.log('in here');
            $rootScope.authData = authData;
            authDataCallback

        } // if user existed or was created
      }); // checkIfUserExists
    }

    $scope.userLogin = function(service) {

    if (service == 'facebook') {
      ref.authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          userExistsCheck(authData);

          $rootScope.loggedIn = true;
          $rootScope.displayName = UserData.getName(authData);
          $scope.$apply()

        }
      }); // authWithOAuthPopup
    }

    if (service == 'twitter') {
      ref.authWithOAuthPopup("twitter", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          userExistsCheck(authData);

          $rootScope.loggedIn = true;
          $rootScope.displayName = UserData.getName(authData);
          $scope.$apply()

        }

      })
    }


  }; // userLogin



}]);
