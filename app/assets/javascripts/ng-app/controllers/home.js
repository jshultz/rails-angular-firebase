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
            if (authData) {
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

              $scope.displayName = UserData.getName(authData);

            }; // if authData
          }); // $scope.oauth.$onAuth


    }]);
