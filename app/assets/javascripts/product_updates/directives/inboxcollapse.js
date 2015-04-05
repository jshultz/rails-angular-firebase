AngularRails.directive('inboxCollapse', [function() {
	

	return {

		scope: {

		},

		link: function($scope, element, attrs) {

		    angular.element('.inbox-collapse').click(function(){
		      angular.element(this).parents('.update_item').removeClass('expanded');
		      angular.element(this).parents('.update_item').find('.content_area > .update_body > .bodytext').addClass('hidden');
		      angular.element(this).parents('.update_item').find('.content_area > .update_body > .synopsis').removeClass('hidden');
		    });

		}
	}
}])