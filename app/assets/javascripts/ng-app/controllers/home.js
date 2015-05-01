angular.module('AngularRails')
    .controller('HomeCtrl', ['$scope', '$http', '$location', '$rootScope', '$timeout', '$window', '$q', '$sce', '$sce','Auth', '$routeParams', '$route','UserData',
        function($scope, $http, $location, $rootScope, $timeout, $window, $q, $sce, $sce, Auth, $routeParams, $route, UserData)  {

        var search = $location.search();
        var initialLoad = true;
        $scope.thepath = $location.path();
        $scope.auth = Auth;
        $scope.routename = $route.current.$$route.name;

        // any time auth status updates, add the user data to scope
        $scope.auth.$onAuth(function(authData) {
          $scope.authData = authData;
          $scope.displayName = UserData.getName(authData);
        });

        $scope.facebookLogin = function() {
             Auth.userFacebookLogin()
               .then(function(response) {
                console.log('made it here');
               }
             );
          }; // facebookLogin


    }]);
