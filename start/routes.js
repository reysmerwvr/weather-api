'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.on('/').render('welcome');

Route
  .group(() => {
    Route.post('sign-in', 'UserController.signIn');
  })
  .prefix('api');

Route
  .group(() => {
    Route.post('get-weather-information', 'TemperatureController.getWeatherInformation');
  })
  .prefix('api')
  .middleware(['auth:jwt', 'userAuth']);
