angular.module("AngularRails").directive('userItem', [function() {

    // This is a directive, it is used to populate the li Material in the index of the Material Angular App.

    return {
        scope: {
            user: "=user",
            current_teacher: "=currentteacher",
            delete: '&delete',
            update: '&update',
            groupList: '=groups',
            index: '@'
        },

        controller: ['$scope', function ($scope) {

          $scope.deleteGroupFromUser = function (user, group) {
            $scope.delete()(user, group);
          } // end deleteThis

          $scope.updateUser = function (user) {
            $scope.update()(user);
          } // end deleteThis

        }],

        templateUrl : 'directives/_user.html'
    }
}]);
