(function() {

  //  This gets the current logged in teacher. It's magic. :)

  angular.module('AngularRails').factory('UserData', ['$http','$q', function($http,$q) {

  	var factory = {

	    // find a suitable name based on the meta info given by each provider
	    //

	    getAddress: function(authData) {
            var deferred = $q.defer();
            // Attach an asynchronous callback to read the data at our posts reference
            var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");
            ref.child('address').child(authData.uid).on("value", function(snapshot) {
                if (snapshot) {
                    var address =  snapshot.val();
                    deferred.resolve(snapshot.val());
                } else {
                    deferred.resolve(null)
                }
            });

            return deferred.promise;

	    },
	    getName: function(authData) {
	    	if (authData) {
	    	switch(authData.provider) {
				case 'password':
				  return authData.password.email.replace(/@.*/, '');
				case 'twitter':
				  return authData.twitter.displayName;
				case 'facebook':
				  return authData.facebook.displayName;
				}
	    	}

	    }, // getName

	    getUsers: function(params) {
			return $http.get('https://rails-angular-fireba.firebaseio.com/users.json', {
			  "params" : params
			}).then(function(result) {
			  return result.data;
			});
		}, // getUsers

	    userExistsCallback: function(authData) {
	    	ref = new Firebase("https://rails-angular-fireba.firebaseio.com");
			if (authData) {
			  // save the user's profile into Firebase so we can list users,
			  // use them in Security and Firebase Rules, and show profiles
			  ref.child("users").child(authData.uid).set({
			    provider: authData.provider,
			    full_name: factory.getName(authData),
			  });
			  return true
		    }
		}, // userExistsCallback

	    // Tests to see if /users/<userId> has any data.
	    checkIfUserExists: function(authData) {
	    	var deferred = $q.defer();
			var USERS_LOCATION = 'https://rails-angular-fireba.firebaseio.com/users';
			var usersRef = new Firebase(USERS_LOCATION);
			usersRef.child(authData.uid).once('value', function(snapshot) {
				var exists = (snapshot.val() !== null);

				if (!exists) {
					factory.userExistsCallback(authData);
					deferred.resolve('created')
				} else {
					deferred.resolve('existed')
				}
			});

			return deferred.promise;
	    } // checkIfUserExists



  	}

  	return factory;

  }]);
})();
