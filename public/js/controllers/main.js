angular.module('menuController', [])

	// inject the Menu service factory into our controller
	.controller('mainController', ['$scope','$http','Menus',"ModalService", function($scope, $http, Menus, ModalService) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all menus and show them
		// use the service to get all the menus
		console.log(ModalService)

		Menus.get()
			.success(function(data) {
				$scope.menus = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createOrder = function(menuItem) {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			ModalService.showModal({
				templateUrl: "views/orderModal.html",
				controller: "modalController"
			}).then(function(modal) {
				console.log(modal)
			//it's a bootstrap element, use 'modal' to show it
				modal.element.modal();
				modal.close.then(function(result) {
					console.log(result);
				});
			});
			// if ($scope.formData.text != undefined) {
			// 	$scope.loading = true;

			// 	// call the create function from our service (returns a promise object)
			// 	Menus.create($scope.formData)

			// 		// if successful creation, call our get function to get all the new menus
			// 		.success(function(data) {
			// 			$scope.loading = false;
			// 			$scope.formData = {}; // clear the form so our user is ready to enter another
			// 			$scope.menus = data; // assign our new list of menus
			// 		});
			// }
		};

		// DELETE ==================================================================
		// delete a menu after checking it
		// $scope.deleteMenu = function(id) {
		// 	$scope.loading = true;

		// 	Menus.delete(id)
		// 		// if successful creation, call our get function to get all the new menus
		// 		.success(function(data) {
		// 			$scope.loading = false;
		// 			$scope.menus = data; // assign our new list of menus
		// 		});
		// };
	}])
	.controller("modalController",['$scope','$http','close', function($scope, $http,close) {
		$scope.close = function(result) {
			close(result, 500); // close, but give 500ms for bootstrap to animate
		};
	}])