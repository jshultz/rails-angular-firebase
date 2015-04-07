(function() {

  //  This gets the current logged in teacher. It's magic. :)
    
  angular.module('AngularRails').factory('UserData', ['$http', function($http) {
    return {

	    // find a suitable name based on the meta info given by each provider
	    getName: function(authData) {
	      switch(authData.provider) {
	         case 'password':
	           return authData.password.email.replace(/@.*/, '');
	         case 'twitter':
	           return authData.twitter.displayName;
	         case 'facebook':
	           return authData.facebook.displayName;
	      }
	    }, // getName

	    // Tests to see if /users/<userId> has any data. 
	    checkIfUserExists: function(authData) {
	      var usersRef = new Firebase(USERS_LOCATION);
	      usersRef.child(authData.uid).once('value', function(snapshot) {
	        var exists = (snapshot.val() !== null);

	        if (!exists) {
	          userExistsCallback(authData);
	        }
	        
	      });
	    } // checkIfUserExists

    };
  }]);
})();
