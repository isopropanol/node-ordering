# Node Menu App

A [quick application](https://ridecell.parseapp.com) which displays a menu of items and allows one to schedule an order in a queue for pick up.  The admin can view orders [here](https://ridecell.parseapp.com/admin)

A Node app built with Parse and Angular.

Node provides the RESTful API. Angular provides the frontend and accesses the API. Parse stores datas.

![Fist full of Datas](http://1.bp.blogspot.com/-f9Fcx2DH3j0/UfhSdDJgRXI/AAAAAAAAA_I/KaYjmr-RHuY/s1600/ST+TNG+A+Fistful+of+Datas+5.jpg)

## Elements

- [Node](http://nodejs.org)
- [Angular](https://angularjs.org/)
- [Parse](http://www.parse.com)

## Installation

1. Clone the repository: `https://github.com/isopropanol/node-ordering.git`
2. Start a Parse Repo at Parse.com and install parse command line
3. Transfer masterkey and app id to sample-global.json and rename to global.json
4. parse deploy

## Basic Schema
#### Menu
	- name (string)
	- description (string)

#### MenuItem
	- name (string)
	- description (string)
	- menu (--> Menu)

#### Order
	- clientFirstname (string)
	- clientLastname (string)
	- phone (string)
	- menuItem (--> MenuItem)
	- pickupAt (date)

## TODO
 - limit on operating hours of restaurant
 - Multiple menu item orders (convert order menuItem pointer to relation and store item counts)
 - user authentication for orders list
 - Menu customization from admin
 - editing menu items + contents of menus
	- custom pricing
	- custom images
 - Twilio integration - sms when order’s ready


###From
Basic Structure thanks to [Node todo app](http://scotch.io/series/node-and-angular-to-do-app)