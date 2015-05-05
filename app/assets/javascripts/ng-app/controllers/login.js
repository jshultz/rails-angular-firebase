angular.module('AngularRails')
    .controller('LoginCtrl', ["Auth", "$scope","$location","$timeout","UserData","$q", "$rootScope",
        function(Auth, $scope, $location, $timeout, UserData, $q, $rootScope)  {

    $scope.auth = Auth;

    var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");

    function authDataCallback(authData) {
      if (authData) {
        console.log('authData', authData)
        $rootScope.loggedIn = true;
        $scope.displayName = UserData.getName(authData);
      } else {
        $rootScope.loggedIn = false;
      }
    }

    $scope.logout = function() {
      ref.unauth();
      console.log('logging out?')
      $scope.loggedIn = false;
    }

    ref.onAuth(authDataCallback);

    var isNewUser = true;

    $scope.userLogin = function(service) {

    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {

        UserData.checkIfUserExists(authData).then(function(response){
          if (response == 'created') {
            $timeout(function(){
                 $location.path('/account/step1');
            },1); // timeout
          } else {
            $timeout(function(){
                 $location.path('/');
            },1); // timeout
          }
        }); // checkIfUserExists

        $rootScope.loggedIn = true;
        $scope.displayName = UserData.getName(authData);
        $scope.$apply()

      }
    });
  }; // userLogin



}]);
