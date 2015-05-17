(function() {

  //  This gets the current logged in teacher. It's magic. :)

  angular.module('AngularRails').factory('UserData', ['$http','$q', function($http,$q) {

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

	    }, // getAddress
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

      getPhone: function(authData) {
          var deferred = $q.defer();
          // Attach an asynchronous callback to read the data at our posts reference
          var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");
          ref.child('phone').child(authData.uid).on("value", function(snapshot) {
              if (snapshot) {
                  var phone =  snapshot.val();
                  deferred.resolve(snapshot.val());
              } else {
                  deferred.resolve(null)
              }
          });

          return deferred.promise;

      }, // getPhone
      getProfilePhoto: function(authData) {
          var deferred = $q.defer();
          // Attach an asynchronous callback to read the data at our posts reference
          var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");
          ref.child('users').child(authData.uid).on("value", function(snapshot) {
              if (snapshot) {
                  var phone =  snapshot.val();
                  deferred.resolve(snapshot.val());
              } else {
                  deferred.resolve(null)
              }
          });

          return deferred.promise;

      }, // getProfilePhoto

	    getUsers: function(params) {
  			return $http.get('https://rails-angular-fireba.firebaseio.com/users.json', {
  			  "params" : params
  			}).then(function(result) {
  			  return result.data;
  			});
  		}, // getUsers
	    userCreateCallback: function(authData) {
	    	ref = new Firebase("https://rails-angular-fireba.firebaseio.com");
  			if (authData) {

                  ref.child('users').once('value', function(snapshot) {

                      var child = snapshot.hasChildren()

                      if (child == false) {
                          var user_level = 1
                          console.log('no users')
                      } else {
                          var user_level = 10;
                          console.log('there are users')
                      }

                      if (authData.provider == 'facebook') {
                        var profile_photo = 'http://graph.facebook.com/' + authData.facebook.id + '/picture?type=large';
                      } // get Facebook profile photo

                      if (authData.provider == 'twitter') {
                        var profile_photo = 'https://pbs.twimg.com/profile_images/3708700436/e1c3eb29a6a370605e4b8ed31d85d07b_normal.jpeg';
                      } // get Twitter profile photo

                          ref.child("users").child(authData.uid).set({
                              provider: authData.provider,
                              full_name: factory.getName(authData),
                              user_level: user_level,
                              photo: profile_photo
                          });

                  });
  			  // save the user's profile into Firebase so we can list users,
  			  // use them in Security and Firebase Rules, and show profiles

  			  return true
  		    }
  		}, // userCreateCallback

	    // Tests to see if /users/<userId> has any data.
	    checkIfUserExists: function(authData) {
	    	var deferred = $q.defer();
  			var USERS_LOCATION = 'https://rails-angular-fireba.firebaseio.com/users';
  			var usersRef = new Firebase(USERS_LOCATION);
  			usersRef.child(authData.uid).once('value', function(snapshot) {
  				var exists = (snapshot.val() !== null);

  				if (!exists) {
                      console.log('created')
  					factory.userCreateCallback(authData);
  					deferred.resolve('created')
  				} else {
                      console.log('existed')
  					deferred.resolve('existed')
  				}
  			});

  			return deferred.promise;
      } // checkIfUserExists

  	}

  	return factory;

  }]);
})();
