angular.module('menuController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Menus', function($scope, $http, Menus) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Menus.get()
			.success(function(data) {
				$scope.menus = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createMenu = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Menus.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.menus = data; // assign our new list of todos
					});
			}
		};

		// DELETE ==================================================================
		// delete a menu after checking it
		// $scope.deleteMenu = function(id) {
		// 	$scope.loading = true;

		// 	Menus.delete(id)
		// 		// if successful creation, call our get function to get all the new todos
		// 		.success(function(data) {
		// 			$scope.loading = false;
		// 			$scope.todos = data; // assign our new list of todos
		// 		});
		// };
	}]);