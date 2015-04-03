newstuffApp.directive('inboxMenu', [function() {
	

	return {

		scope: {

		},

		link: function($scope, element, attrs) {

			angular.element('.inbox-menu').click(function(){
		      angular.element('.update_item').removeClass('expanded');
		      angular.element(this).parents('.update_item').addClass('expanded');
		      // angular.element(this).parents('.update_item').find('.item_actions > .markread').click();
		      angular.element(this).parents('.update_item').find('.content_area > .update_body > .bodytext').removeClass('hidden');
		      angular.element(this).parents('.update_item').find('.content_area > .update_body > .synopsis').addClass('hidden');
		    });

		}
	}
}])