(function() {

  //  This gets the current logged in teacher. It's magic. :)
    
  AngularRails.factory('currentTeacherService', ['$http', function($http) {
    return {
      getCurrentTeacher: function(params) {
        return $http.get( '/current_teacher.js').then(function(result) {
          return result.data;
        });
      }
    };
  }]);
})();