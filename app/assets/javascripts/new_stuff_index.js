//= require angular/load
//= require_self
//= require_tree ./product_updates

// This loads the New Stuff Angular App.

var newstuffApp = angular.module('newstuffApp', ['ngRoute', 'route-segment', 'view-segment', 'ngAnimate', 'templates', 'truncate', 'firebase']);

angular.module('newstuffApp').filter('htmlToPlaintext', function() {
    return function(text) {
      return String(text).replace(/<[^>]+>/gm, '');
    }
});

// This sets up the routes.

newstuffApp.run(["$rootScope", "$location", "$locationProvider", function($rootScope, $location, $locationProvider) {

$locationProvider.html5Mode(true).hashPrefix('!');

$rootScope.$on("$routeChangeError", function(event, next, previous, error) {
  // We can catch the error thrown when the $requireAuth promise is rejected
  // and redirect the user back to the home page
  if (error === "AUTH_REQUIRED") {
    $location.path("/home");
  }
});
}]);

newstuffApp.config(["$routeProvider", function($routeProvider) {
$routeProvider.when("/", {
  // the rest is the same for ui-router and ngRoute...
  controller: "newstuffController",
  templateUrl: "product_updates/templates/index.html",
  resolve: {
    // controller will not be loaded until $waitForAuth resolves
    // Auth refers to our $firebaseAuth wrapper in the example above

  }
}).when("/account", {
  // the rest is the same for ui-router and ngRoute...
  controller: "accountController",
  templateUrl: "product_updates/templates/account.html",
  resolve: {
    // controller will not be loaded until $requireAuth resolves
    // Auth refers to our $firebaseAuth wrapper in the example above
    "currentAuth": ["Auth", function(Auth) {
      // $requireAuth returns a promise so the resolve waits for it to complete
      // If the promise is rejected, it will throw a $stateChangeError (see above)
      return Auth.$requireAuth();
    }]
  }
});
}]);





newstuffApp.config([
    "$httpProvider", function($httpProvider) {
        $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    }
]);
