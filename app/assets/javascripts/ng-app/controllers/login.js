angular.module('AngularRails')
    .controller('LoginCtrl', ["Auth", "$scope","$location","$timeout","UserData","$q", "$rootScope",
        function(Auth, $scope, $location, $timeout, UserData, $q, $rootScope)  {

    $scope.auth = Auth;

    var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");

    function authDataCallback(authData) {
      if (authData) {
        $rootScope.loggedIn = true;
        $rootScope.displayName = UserData.getName(authData);
      } else {
        $rootScope.loggedIn = false;
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
        if (response == 'created') {

          var onComplete = function(error) {
            if (error) {
              console.log('Synchronization failed' + error);
            } else {
              console.log('Synchronization succeeded');
            }
          };

          if (authData.provider == 'facebook') {
            ref.child('users').child(authData.uid).update({ photo: 'http://graph.facebook.com/' + authData.facebook.id + '/picture?type=large' }, onComplete);
          }
          $timeout(function(){
            $location.path('/account/step1');
            $rootScope.authData = authData;
          },1); // timeout
        } else {
          $timeout(function(){
            $rootScope.authData = authData;
            $location.path('/');
          },1); // timeout
        }
      }); // checkIfUserExists
    }

    $scope.userLogin = function(service) {

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


  }; // userLogin



}]);
