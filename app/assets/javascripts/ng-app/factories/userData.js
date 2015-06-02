(function() {

  //  This gets the current logged in teacher. It's magic. :)

  angular.module('AngularRails').factory('UserData', ['$http','$q', function($http,$q) {
    var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");

  	var factory = {

      addUserToGroup: function(user) {

        var deferred = $q.defer();
        var groupName = factory.getGroupName(user.group_id)
        var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");
        ref.child('users').orderByChild('email').equalTo(user.email).on('child_added', function(snapshot) {
          theuser = snapshot.key()
          ref.child('users').child(theuser).child('group').push({
              id: user.group_id,
              name: groupName
            })
          }
        )

        deferred.resolve(null)

        return deferred.promise;

      }, // addUserToGroup

	    createGroup: function(group) {
        var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");
        if (group == 'first') {
          var guid = factory.createGUID();
          ref.child('groups').child(guid).set({
            id: guid,
            name: 'admin'
          })
          var anotherguid = factory.createGUID();
          ref.child('groups').child(anotherguid).set({
            id: anotherguid,
            name: 'users'
          })

          return guid;

        } else {
          if (group.id) {
            ref.child('groups').child(group.id).set({
              id: group.id,
              name: group.name
            })
          } else {
            var guid = factory.createGUID();
            ref.child('groups').child(guid).set({
              id: guid,
              name: group
            })
          }
          return factory.getGroupList();
        }
      }, // createGroup

      createGUID: function() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
      }, // createa a pseudo createGUID

      deleteGroupFromUser: function(user, group) {

        var deferred = $q.defer();
        console.log('user', user);

        factory.getUserGroupID(group.id)

      }, // deleteGroupFromUser

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

      getGroupIDByName: function(group_name) {
        var deferred = $q.defer();
        ref.child('groups').orderByChild('name').equalTo(group_name).on('child_added', function(snapshot) {
          if (snapshot) {
              deferred.resolve(snapshot.val());
          } else {
              deferred.resolve(null)
          }
        })
        return deferred.promise;
      }, // getGroupByName

      getGroupList: function() {
        var deferred = $q.defer();
        // Attach an asynchronous callback to read the data at our posts reference
        var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");
        ref.child('groups').on("value", function(snapshot) {
            if (snapshot) {
                deferred.resolve(snapshot.val());
            } else {
                deferred.resolve(null)
            }
        });
        return deferred.promise;
      }, // getGroupList

      getGroupName: function(group_id) {
        var ref= new Firebase("https://rails-angular-fireba.firebaseio.com");
        ref.child('groups').child(group_id).on("value", function(snapshot) {
          group = snapshot.val();
        })
        return group.name
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

      getUserGroupID: function(params) {
        var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");
        debugger;
        ref.child('users').child('group').orderByChild('id').equalto(params).on('child_added', function(snapshot) {
          debugger;
        })
      },

      getUsersGroups: function(params) {

      }, // getUsersGroups

	    userCreateCallback: function(authData) {
	    	ref = new Firebase("https://rails-angular-fireba.firebaseio.com");
  			if (authData) {
                  ref.child('users').once('value', function(snapshot) {
                      var child = snapshot.hasChildren()
                      if (child == false) {
                          var group_id = factory.createGroup('first')
                          var user_level = 1
                          console.log('no users')
                      } else {
                          var group_id = null;
                          var user_level = 10;
                          console.log('there are users')
                      }
                      if (authData.provider == 'facebook') {
                        var profile_photo = authData.facebook.cachedUserProfile.picture.data.url;
                      } // get Facebook profile photo

                      if (authData.provider == 'twitter') {
                        var profile_photo = authData.twitter.cachedUserProfile.profile_image_url_https;
                      } // get Twitter profile photo

                      ref.child("users").child(authData.uid).set({
                          provider: authData.provider,
                          full_name: factory.getName(authData),
                          user_level: user_level,
                          photo: profile_photo
                      });

                      if (child == false) {
                        groupName = factory.getGroupName(group_id)
                        ref.child('users').child(authData.uid).child('group').push({
                            id: group_id,
                            name: groupName
                          })
                      }

                      if (child != false) {
                        factory.getGroupIDByName('users').then(function(response) {
                          console.log('response', response);
                          ref.child('users').child(authData.uid).child('group').push({
                            id: response.id,
                            name: 'users'
                          })
                        });

                      }


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
