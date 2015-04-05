(function() {

    // This is the Navigation Controller for the Material Angular App. It is being used for managing the Navigation for the app.

    newstuffApp.controller('navController', ['$scope', '$http', '$location', '$rootScope', '$sce','Auth','$routeParams','$route', 
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

        $scope.facebookLogin = function() {
            var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");

            ref.authWithOAuthPopup("facebook", function(error, authData) {
              if (error) {
                console.log("Login Failed!", error);
              } else {
                console.log("Authenticated successfully with payload:", authData);
              }
            });
        }

    }]);


})();