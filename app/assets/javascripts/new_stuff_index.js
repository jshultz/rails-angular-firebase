//= require angular/load
//= require_self
//= require_tree ./product_updates

// This loads the New Stuff Angular App.

var AngularRails = angular.module('AngularRails', ['ngRoute', 'route-segment', 'view-segment', 'ngAnimate', 'templates', 'truncate', 'firebase']);

angular.module('AngularRails').filter('htmlToPlaintext', function() {
    return function(text) {
      return String(text).replace(/<[^>]+>/gm, '');
    }
});

// This sets up the routes.

AngularRails.run(["$rootScope", "$location", function($rootScope, $location) {

  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $location.path("/");
    }
  });
  }]);

  AngularRails.config(["$locationProvider", "$routeProvider", function($locationProvider, $routeProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.when("/", {
      // the rest is the same for ui-router and ngRoute...
      name: "home",
      controller: "newstuffController",
      templateUrl: "product_updates/templates/index.html",
      resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above

      }
    }).when("/account", {
      // the rest is the same for ui-router and ngRoute...
      name: "account",
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
    }).when("/about", {
      // the rest is the same for ui-router and ngRoute...
      name: "about",
      controller: "newstuffController",
      templateUrl: "product_updates/templates/about.html",
      resolve: {

      }
    }).when("/contact", {
      // the rest is the same for ui-router and ngRoute...
      name: "contact",
      controller: "newstuffController",
      templateUrl: "product_updates/templates/contact.html",
      resolve: {

      }
    });
  }]);





AngularRails.config([
    "$httpProvider", function($httpProvider) {
        $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    }
]);
