angular.module('menuController', ['ngRoute'])
	.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
		$routeProvider
			.when('/admin', {
			templateUrl: 'views/admin.html',
			controller: 'adminController'
			})
			.when('/', {
			templateUrl: 'views/index.html',
			controller: 'mainController'
			})
			.otherwise({
				redirectTo:"/"
			})
			 $locationProvider.html5Mode(true);
	}])

	// inject the Menu service factory into our controller
	.controller('mainController', ['$scope','$http','Menus','Orders',"ModalService", function($scope, $http, Menus, Orders, ModalService) {
		$scope.formData = {};
		$scope.loading = true;
		$scope.orders = [];

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
				controller: "createOrderModalController",
				inputs: {
					menuItem: menuItem
				}
			}).then(function(modal) {
			//it's a bootstrap element, use 'modal' to show it
				modal.element.modal();
				modal.close.then(function(result) {
					Orders.create(result)
						.success(function(data){
							var dateIso = Date.parse(data.pickupAt.iso);
							data.pickupAtString = dateIso;
							$scope.orders.push(data);
						});
					
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


	}])
	.controller("createOrderModalController",['$scope','$http','menuItem','close','$element', function($scope, $http, menuItem ,close,$element) {
		var coeff = 1000 * 60 * 5;
		var date = new Date();  //or use any other date
		var rounded = new Date(Math.round(date.getTime() / coeff) * coeff)
		$scope.order = {
			firstname:"",
			lastname:"",
			phone:"",
			time: rounded,
			menuItemId:menuItem.objectId,
		}
		$scope.menuItem = menuItem;

		$scope.close = function() {
			console.log("SUBMITTED")
			$element.modal('hide')
			close($scope.order, 500); // close, but give 500ms for bootstrap to animate
		};
	}])
	.controller("adminController",['$scope','$http','Orders','ModalService', function($scope, $http, Orders, ModalService) {
		$scope.loading = true;
		$scope.orders = [];


		Orders.get()
			.success(function(data) {
				var now = new Date();
				data.forEach(function(datum,index){
					var dateIso = Date.parse(datum.pickupAt.iso);
					if(dateIso < now){
						datum.status = 'LATE'
					}
					datum.pickupAtString = dateIso;
					data[index] = datum;
				})
				$scope.orders = data;
				$scope.loading = false;
			});

		//launch update status modal
		$scope.updateStatus = function(order,index){
			ModalService.showModal({
				templateUrl: "views/orderStatusModal.html",
				controller: "orderStatusModalController",
				inputs: {
					order: order
				}
			}).then(function(modal) {
			//it's a bootstrap element, use 'modal' to show it
				modal.element.modal();
				modal.close.then(function(result) {
					Orders.update(result)
						.success(function(data){
							$scope.orders[index] = result;
						});
					
				});
			});
		}
	}])
	.controller("orderStatusModalController",['$scope','$http','order','close','$element', function($scope, $http, order ,close,$element) {
		var coeff = 1000 * 60 * 5;
		var date = new Date();  //or use any other date
		var rounded = new Date(Math.round(date.getTime() / coeff) * coeff)
		$scope.order = order
		$scope.order.orderId = order.objectId;

		$scope.setStatus = function(status) {
			$element.modal('hide')
			$scope.order.status = status;
			close($scope.order, 500); // close, but give 500ms for bootstrap to animate
		};
	}])
