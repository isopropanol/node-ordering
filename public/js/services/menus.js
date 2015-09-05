angular.module('menuService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Menus', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/menus');
			},
			create : function(menuData) {
				return $http.post('/api/menus', menuData);
			}
			// delete : function(id) {
			// 	return $http.delete('/api/menus/' + id);
			// }
		}
	}]);