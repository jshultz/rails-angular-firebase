angular.module('AngularRails')
    .controller('HomeCtrl', ['$scope', '$http', '$location', '$rootScope', '$timeout', '$window', '$q', '$sce', '$sce','Auth', '$route','UserData',
        function($scope, $http, $location, $rootScope, $timeout, $window, $q, $sce, $sce, Auth, $route, UserData)  {

        var search = $location.search();
        var initialLoad = true;
        $scope.thepath = $location.path();
        $scope.auth = Auth;
        $scope.routename = $route.current.$$route.name;

        var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");
        var authData = ref.getAuth();

        if (authData) {
          console.log("Authenticated user with uid:", authData.uid);
        }

    }]);
