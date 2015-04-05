AngularRails.directive('messageItem', [function() {

    // This is a directive, it is used to populate the li Message in the index of the Product Updates Angular App.

    return {
        scope: {
            message: "=message",
            current_teacher: "=currentteacher",
            bookmark: "&",
            read: "&",
            index: '@',
        },

        controller: ['$scope','$routeSegment', function ($scope, $routeSegment) {

          $scope.bookmarkThis = function (bookmark, message) {
            $scope.bookmark()(bookmark, message);
          }, // end bookmarkThis

          $scope.readThis = function (read, message) {
            $scope.read()(read, message);
            count = parseInt(angular.element('#subnav').find('.subnav_view_product_update_count').text());
            console.log('count', count)

            if (message.read == 1 && read != 1) { // message is already read and person is marking it unread.
              count++;
            }

            if (message.read == 0 && read == 1 ) { // message is not read and it is being marked read.
              count--;
            }

            angular.element('.subnav_view_product_update_count').text(count);
            angular.element('.session_view_product_update_count').text(count);


          }, // end readThis

          $scope.deliberatelyTrustDangerousSnippet = function() {
             return $sce.trustAsHtml(message.body);
          }
          
          // $scope.deleteThis = function (index, material) {

          //   $scope.delete()(index, material);
          // } // end deleteThis

        }],

        templateUrl : 'product_updates/templates/_message.html'
    }
}]);