angular
    .module('AngularRails',[
      'ngRoute', 
      'templates', 
      'firebase'])
    .config(function ($routeProvider, $locationProvider) {

        $routeProvider.when("/", {
          // the rest is the same for ui-router and ngRoute...
          name: "home",
          controller: "HomeCtrl",
          templateUrl: "static/index.html",
          resolve: {
            // controller will not be loaded until $waitForAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above

          }
        }).when("/account", {
          // the rest is the same for ui-router and ngRoute...
          name: "account",
          controller: "AcctCtrl",
          templateUrl: "accounts/accounts.html",
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
          controller: "HomeCtrl",
          templateUrl: "static/about.html",
          resolve: {

          }
        }).when("/contact", {
          // the rest is the same for ui-router and ngRoute...
          name: "contact",
          controller: "HomeCtrl",
          templateUrl: "static/contact.html",
          resolve: {

          }
        }).when("/login", {
          // the rest is the same for ui-router and ngRoute...
          name: "login",
          controller: "AcctCtrl",
          templateUrl: "accounts/login.html",
          resolve: {
            // controller will not be loaded until $requireAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above
            "currentAuth": ["Auth", function() {
              // $requireAuth returns a promise so the resolve waits for it to complete
              // If the promise is rejected, it will throw a $stateChangeError (see above)
              return false;
            }]
          }
        });


        $locationProvider.html5Mode(true);
    });