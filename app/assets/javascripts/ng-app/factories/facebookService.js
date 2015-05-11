(function() {

  //  This gets the current logged in teacher. It's magic. :)

  angular.module('AngularRails').factory('facebookService', ['$http','$q', function($http,$q) {

    var factory = {

        // find a suitable name based on the meta info given by each provider
        //

        getMyLastName: function() {
            var deferred = $q.defer();
            FB.api('/me', {
                fields: 'last_name'
            }, function(response) {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        },

        getProfilePhoto: function(authData) {
            FB.api(
                "/{user-id}/picture",
                function (response) {
                  if (response && !response.error) {
                    /* handle the result */
                  }
                }
            );
        }



    }

    return factory;

  }]);
})();
