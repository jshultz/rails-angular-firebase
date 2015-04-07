(function() {

  //  This gets the current logged in teacher. It's magic. :)
    
  angular.module('AngularRails').factory('UserData', ['$http', function($http) {

  	var factory = {

	    // find a suitable name based on the meta info given by each provider
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

	    userExistsCallback: function(authData) {
	    	ref = new Firebase("https://rails-angular-fireba.firebaseio.com");
			if (authData) {
			  // save the user's profile into Firebase so we can list users,
			  // use them in Security and Firebase Rules, and show profiles
			  ref.child("users").child(authData.uid).set({
			    provider: authData.provider,
			    full_name: factory.getName(authData),
			  });
		    }
		}, // userExistsCallback

	    // Tests to see if /users/<userId> has any data. 
	    checkIfUserExists: function(authData) {
			var USERS_LOCATION = 'https://rails-angular-fireba.firebaseio.com/users';
			var usersRef = new Firebase(USERS_LOCATION);
			usersRef.child(authData.uid).once('value', function(snapshot) {
			var exists = (snapshot.val() !== null);

			if (!exists) {
				factory.userExistsCallback(authData);
			}

			});
	    } // checkIfUserExists



  	}

  	return factory;

  }]);
})();
