AngularRails.directive('navSetActive', [function() {
	

	return {

		scope: {

		},

		link: function($scope, element, attrs) {

			$('li').click( function(event) {

				$('nav').find('li').each( function() { $(this).removeClass('active') } )

				$(this).addClass('active');

			})


			

		}
	}
}])