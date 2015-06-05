angular.module('AngularRails')
  .controller('AdminCtrl', ["currentAuth", "Auth", "$scope", "$location", "$timeout", "UserData", "$routeParams", "AdminFactory", "$rootScope",
    function(currentAuth, Auth, $scope, $location, $timeout, UserData, $routeParams, AdminFactory, $rootScope) {

      $scope.auth = Auth;
      $scope.email = '';

      var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");
      var authData = ref.getAuth();

      // any time auth status updates, add the user data to scope
      $scope.auth.$onAuth(function(authData) {});

      UserData.getGroupList().then(function(response) {
        $scope.groupList = response;
      });

      $scope.deleteGroupFromUser = function(user, group) {
        UserData.getUserIDByEmail(user).then(function(response) {
          groupRef = new Firebase("https://rails-angular-fireba.firebaseio.com/users/" + response + '/group/')
          var onComplete = function(error) {
            if (error) {
              console.log('Synchronization failed' + error);
            } else {
              $timeout(function() {
                delete user.group[group.id]
              }, 1); // timeout
              console.log('user', user)
              console.log('Synchronization succeeded');
            }
          }; // onComplete
          groupRef.child(group.id).remove(onComplete);
        })
      }; // removeGroupFromUser

      $scope.updateGroup = function(group) {
        if (group) {
          var onComplete = function(error) {
            if (error) {
              console.log('Synchronization failed' + error);
            } else {
              console.log('Synchronization succeeded');
            }
          }; // onComplete

          var guid = UserData.createGUID();
          if (group.id) {
            UserData.createGroup(group).then(function(response) {
              $timeout(function() {
                console.log('response', response)
                $scope.groupList = response;
              }, 1); // timeout
            })
          } else {
            UserData.createGroup(group.name).then(function(response) {
              $timeout(function() {
                console.log('response', response)
                $scope.groupList = response;
              }, 1); // timeout

            });
          }
        } // if group
      } // updateGroup

      $scope.updateUser = function(user) {
        group_id = user.group_id
        if (user) {
          var onComplete = function(error) {
            if (error) {
              console.log('Synchronization failed' + error);
            } else {
              console.log('Synchronization succeeded');
            }
          }; // onComplete

          if (user.group_id) {
            UserData.addUserToGroup(user, group_id).then(function(response) {
              console.log('response', response)
              $timeout(function() {
                user = angular.extend(user.group, response);
              }, 1); // timeout

            })
          }




        } // if user
      } // updateGroup

      if (authData) {
        $scope.authData = authData;
        $scope.displayName = UserData.getName(authData);
        $rootScope.authData = authData;
        var path = $location.path();

        UserData.getAccessLevel(authData).then(function(response) {
            var user_level = response;
            if (user_level !== 1) { // are you an admin?
              $timeout(function() {
                $location.path('/');
              }, 1); // timeout
            }
            if (user_level == 1 && path == '/admin/users') { // is this the users page?
              AdminFactory.getUserList(authData).then(function(response) {
                $scope.userList = response;
              })
            }
          }) // getAccessLevel
      } else {
        $timeout(function() {
          $location.path('/');
        }, 1); // timeout
      } // if authData

    }
  ]);
