angular.module('AngularRails', []).directive('userItem', [function() {

    // This is a directive, it is used to populate the li Material in the index of the Material Angular App.

    return {
        scope: {
            user: "=user",
            current_teacher: "=currentteacher",
            delete: '&',
            update: '&',
            index: '@'
        },

        controller: ['$scope', function ($scope) {

          $scope.deleteThis = function (index, material) {
            $scope.delete()(index, material);
          } // end deleteThis

          $scope.updateThis = function (index, material) {
            $scope.update()(index, material);
          } // end deleteThis

        }],

        templateUrl : '../templates/directives/_user.html'
    }
}]);
