angular
    .module('AngularRails',[
      'ngRoute',
      'templates',
      'firebase',])
    .config(function ($routeProvider, $locationProvider) {

        $routeProvider.when("/", {
          // the rest is the same for ui-router and ngRoute...
          name: "home",
          controller: "HomeCtrl",
          templateUrl: "static/index.html",
          resolve: {
          }
        }).when("/about", {
          // the rest is the same for ui-router and ngRoute...
          name: "about",
          controller: "HomeCtrl",
          templateUrl: "static/about.html",
          resolve: {

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
              return Auth.$waitForAuth();
            }]
          }
        }).when("/account/profile", {
          // the rest is the same for ui-router and ngRoute...
          name: "profile",
          controller: "AcctCtrl",
          templateUrl: "accounts/profile.html",
          resolve: {
            // controller will not be loaded until $requireAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above
            "currentAuth": ["Auth", function(Auth) {
              // $requireAuth returns a promise so the resolve waits for it to complete
              // If the promise is rejected, it will throw a $stateChangeError (see above)
              return Auth.$waitForAuth();
            }]
          }
        }).when("/account/step1", {
          // the rest is the same for ui-router and ngRoute...
          name: "account",
          controller: "AcctCtrl",
          templateUrl: "accounts/create/step1.html",
          resolve: {
            // controller will not be loaded until $requireAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above
            "currentAuth": ["Auth", function(Auth) {
              // $requireAuth returns a promise so the resolve waits for it to complete
              // If the promise is rejected, it will throw a $stateChangeError (see above)
              return Auth.$waitForAuth();
            }]
          }
        }).when("/admin", {
          // the rest is the same for ui-router and ngRoute...
          name: "admin",
          controller: "AdminCtrl",
          templateUrl: "admin/home.html",
          resolve: {
            // controller will not be loaded until $requireAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above
            "currentAuth": ["Auth", function(Auth) {
              // $requireAuth returns a promise so the resolve waits for it to complete
              // If the promise is rejected, it will throw a $stateChangeError (see above)
              return Auth.$waitForAuth();
            }]
          }
        }).when("/admin/groups", {
          // the rest is the same for ui-router and ngRoute...
          name: "admin_groups",
          controller: "AdminCtrl",
          templateUrl: "admin/groups.html",
          resolve: {
            // controller will not be loaded until $requireAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above
            "currentAuth": ["Auth", function(Auth) {
              // $requireAuth returns a promise so the resolve waits for it to complete
              // If the promise is rejected, it will throw a $stateChangeError (see above)
              return Auth.$waitForAuth();
            }]
          }
        }).when("/admin/users", {
          // the rest is the same for ui-router and ngRoute...
          name: "admin_users",
          controller: "AdminCtrl",
          templateUrl: "admin/users.html",
          resolve: {
            // controller will not be loaded until $requireAuth resolves
            // Auth refers to our $firebaseAuth wrapper in the example above
            "currentAuth": ["Auth", function(Auth) {
              // $requireAuth returns a promise so the resolve waits for it to complete
              // If the promise is rejected, it will throw a $stateChangeError (see above)
              return Auth.$waitForAuth();
            }]
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
          controller: "LoginCtrl",
          templateUrl: "accounts/login.html",
          resolve: {
          }
        });


        $locationProvider.html5Mode(true);
    });
