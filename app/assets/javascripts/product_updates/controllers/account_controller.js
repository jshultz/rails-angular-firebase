newstuffApp.controller("accountController", ["currentAuth", "Auth", "$scope", function(currentAuth, Auth, $scope) {
  // currentAuth (provided by resolve) will contain the
  // authenticated user or null if not logged in

  	console.log( 'currentAuth', currentAuth)

  	$scope.auth = Auth;

	// any time auth status updates, add the user data to scope
	$scope.auth.$onAuth(function(authData) {
	  $scope.authData = authData;
	});
  
}]);