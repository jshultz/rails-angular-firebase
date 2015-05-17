angular.module('AngularRails')
    .controller('AdminCtrl', ["currentAuth", "Auth", "$scope","$location","$timeout","UserData",
        function(currentAuth, Auth, $scope, $location, $timeout, UserData)  {

    $scope.auth = Auth;
    $scope.email = '';

    var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");

    var authData = ref.getAuth();

    // any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
    });

    if (authData) {
      $scope.authData = authData;
      $scope.displayName = UserData.getName(authData);

      UserData.getAccessLevel(authData).then(function(response) {

        var user_level = response;

        if (user_level !== 1) {

          $timeout(function(){
               $location.path('/');
          },1); // timeout

        }

      }) // getAccessLevel

    } // if authData



}]);
