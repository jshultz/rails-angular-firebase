(function() {

    // This is the Materials Controller for the Material Angular App. It is being used for getting ALL Materials on the Material Index.

    newstuffApp.controller('newstuffController', ['$scope', '$http', '$location', '$rootScope', '$routeSegment', '$timeout', '$window', '$q', '$sce', '$sce','Auth', 
        function($scope, $http, $location, $rootScope, $routeSegment, $timeout, $window, $q, $sce, $sce, Auth)  {
        
        var search = $location.search();
        var initialLoad = true;
        $scope.loaded = false;
        $scope.updatingList = false;
        $scope.selected = [];
        $scope.doSelectAll = false;
        $scope.totalItems = 0;
        $scope.currentTeacher = null;
        $scope.currentIndex = 0;
        $scope.showingIcons = false;
        $rootScope.loading = true;
        $scope.page = 1;
        $scope.searchQuery = $location.absUrl();
        $scope.filters = []
        $scope.sorted_by = $routeSegment.name;


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