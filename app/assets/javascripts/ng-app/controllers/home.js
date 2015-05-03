angular.module('AngularRails')
    .controller('HomeCtrl', ['$scope', '$http', '$location', '$rootScope', '$timeout', '$window', '$q', '$sce', '$sce','Auth', '$routeParams', '$route','UserData',
        function($scope, $http, $location, $rootScope, $timeout, $window, $q, $sce, $sce, Auth, $routeParams, $route, UserData)  {

        var search = $location.search();
        var initialLoad = true;
        $scope.thepath = $location.path();
        $scope.auth = Auth;
        $scope.routename = $route.current.$$route.name;


    }]);
