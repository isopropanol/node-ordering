// var Order = require('./models/order');

// function getOrders(res){
// 	Order.find(function(err, orders) {

// 			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
// 			if (err)
// 				res.send(err)

// 			res.json(orders); // return all menus in JSON format
// 		});
// };

module.exports = function(app) {

	// api ---------------------------------------------------------------------

	app.get('/api/menus', function(req, res) {
		var menuQuery = new Parse.Query("Menu");
		menuQuery.find().then(function(menus){
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