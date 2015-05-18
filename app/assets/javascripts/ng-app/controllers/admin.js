angular.module('AngularRails')
    .controller('AdminCtrl', ["currentAuth", "Auth", "$scope","$location","$timeout","UserData","$routeParams","AdminFactory","$rootScope",
        function(currentAuth, Auth, $scope, $location, $timeout, UserData, $routeParams, AdminFactory, $rootScope)  {

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
      $rootScope.authData = authData;

      var path = $location.path();

      UserData.getAccessLevel(authData).then(function(response) {

        console.log('$location', $location.path())

        var user_level = response;

        if (user_level !== 1) { // are you an admin?

          $timeout(function(){
               $location.path('/');
          },1); // timeout

        }

        if (user_level == 1 && path == '/admin/users') { // is this the users page?
          AdminFactory.getUserList(authData).then(function(response) {
            $scope.userList = response;
          })
        }

      }) // getAccessLevel

    } // if authData



}]);
