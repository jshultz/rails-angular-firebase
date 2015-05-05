angular.module('AngularRails')
    .controller('NavCtrl', ['$scope', '$http', '$location', '$rootScope', '$sce','Auth','$routeParams','$route',
        function($scope, $http, $location, $rootScope, $sce, Auth, $routeParams, $route)  {

        var search = $location.search();
        var initialLoad = true;
        $scope.loaded = false;
        $scope.selected = [];
        $scope.filters = []
        $scope.thepath = $location.path();
        $scope.routename = $route.current.$$route.name;

        $scope.menuClass = function(page) {
            var current = $location.path().substring(1);
            return page === current ? "active" : "";
          };

        $scope.auth = Auth;

        // any time auth status updates, add the user data to scope
        $scope.auth.$onAuth(function(authData) {
          $scope.authData = authData;
        });


    }]);
