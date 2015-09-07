angular.module('orderService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Menus', ['$http',function($http) {
		return {
			// get : function() {
			// 	return $http.get('/api/orders');
			// },
			create : function(data) {
				return $http.post('/api/orders', data);
			}
			// delete : function(id) {
			// 	return $http.delete('/api/menus/' + id);
			// }
		}
	}]);