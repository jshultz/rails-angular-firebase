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

newstuffApp.config(['$routeProvider', '$routeSegmentProvider', '$locationProvider', function($routeProvider, $routeSegmentProvider, $locationProvider) {
    var appConfig = {
        templateUrl: 'product_updates/templates/index.html',
        controller: 'newstuffController'
    };

    $routeSegmentProvider.
        when('/', 'newstuff').
        when('/bookmarked', 'newstuff-bookmarked').
        when('/unread', 'newstuff-unread').
        segment('newstuff', appConfig).
        segment('newstuff-bookmarked', appConfig).
        segment('newstuff-unread', appConfig);

    $routeProvider.otherwise({
        redirectTo: '/'
    });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
}]);

newstuffApp.config([
    "$httpProvider", function($httpProvider) {
        $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    }
]);

