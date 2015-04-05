angular.module('AngularRails')
    .controller('AcctCtrl', ["currentAuth", "Auth", "$scope", 
        function(currentAuth, Auth, $scope)  {
        
        console.log( 'currentAuth', currentAuth)

    $scope.auth = Auth;

    // any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
    });

    }]);