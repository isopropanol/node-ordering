// var Order = require('./models/order');

// function getOrders(res){
// 	Order.find(function(err, orders) {

// 			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
// 			if (err)
// 				res.send(err)

// 			res.json(orders); // return all menus in JSON format
// 		});
// };

var _ = require('underscore');

module.exports = function(app) {

	// api ---------------------------------------------------------------------

	app.get('/api/menus', function(req, res) {
		var menus;
		var menuQuery = new Parse.Query("Menu");
		menuQuery.find().then(function(data){
			menus = data;
			var promises = [];
			menus.forEach(function(menu){
				var menuItemQuery = new Parse.Query("MenuItem");
				menuItemQuery.equalTo("menu",menu);
				promises.push(menuItemQuery.find())
			})
			return Parse.Promise.when(promises);
		}).then(function(){
			var args = _.toArray(arguments);
			args.forEach(function(menuItems,index){
				console.log("we got "+menuItems.length);
				menu = menus[index];
				console.log("for: "+menu.get('name'));
				menu.set('menuItems',JSON.parse(JSON.stringify(menuItems)));
				console.log(menu)
				menus[index] = menu;
			})
			console.log("we have "+menus.length+" menus");

			res.json(menus)
		})
		
	});

	// create menu and send back all menus after creation
	app.post('/api/menus', function(req, res) {

		// create a menu, information comes from AJAX request from Angular
		

	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};