(function() {

  //  This gets the current logged in teacher. It's magic. :)

  angular.module('AngularRails').factory('AdminFactory', ['$http','$q', function($http,$q) {

  	var factory = {

	    // find a suitable name based on the meta info given by each provider
	    //

      getAccessLevel: function(authData) {
        var deferred = $q.defer();
        // Attach an asynchronous callback to read the data at our posts reference
        var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");
        ref.child('users').child(authData.uid).on("value", function(snapshot) {
            if (snapshot) {
                deferred.resolve(snapshot.val().user_level);
            } else {
                deferred.resolve(null)
            }
        });

        return deferred.promise;

      }, // getAccessLevel

      getUserList: function(params) {
        var deferred = $q.defer();
        // Attach an asynchronous callback to read the data at our posts reference
        var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");
        ref.child('users').on("value", function(snapshot) {
            if (snapshot) {
                deferred.resolve(snapshot.val());
            } else {
                deferred.resolve(null)
            }
        });

        return deferred.promise;
  		}, // getUserList

  	}

  	return factory;

  }]);
})();
