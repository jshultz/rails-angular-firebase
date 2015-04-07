angular.module('AngularRails').factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://rails-angular-fireba.firebaseio.com", "users");
    return $firebaseAuth(ref);
  }
]);