(function () {
    newstuffApp.factory('newstuffService', ['$http', '$location','$routeSegment', function($http, $location, $routeSegment) {


        // This is the Factory for the Angular App. Default params come from filters_factory.js

    var messages = [];

    var factory = {

        // This gets all Messages.

        getMessages: function (params, timeout) {
            return $http.get('/product_updates/angular_get.json', {
                "params" : params
            }).then(function(result) {

                return result.data;
            })
        },

        // Set Bookmark Status
        setBookmark: function (obj) {

            return $http.put('/product_updates/bookmark/' + obj.message_id, {
                    "params" : obj
                }).then(function(result) {
                    return result.data;
                })
        },

        // Set Read Status
        setRead: function (obj) {

            return $http.put('/product_updates/read/' + obj.message_id, {
                    "params" : obj
                }).then(function(result) {
                    return result.data;
                })
        },

        // This fires whenever you change the filters.

        requestMessages: function (params, timeout) {
            return $http.get('/materials/angular_get.json', {
                "params" : params
            }).then(function(result) {
                return result.data;
            })
        },

        setMessages: function (newMessages) {
            messages = newMessages;
            return messages;
        }

    }

    return factory;
    }]);
})();