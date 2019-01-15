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
    Route.post('forecasts', 'TemperatureController.loadForecast');

    Route.get('cities', 'CityController.getCitiesByType');

    Route.get('temperatures', 'TemperatureController.index');
    Route.get('temperatures/:city_id', 'TemperatureController.show');

    Route.get('precipitations', 'PrecipitationController.index');
    Route.get('precipitations/:city_id', 'PrecipitationController.show');

    Route.get('auth-user', 'UserController.retrieveAuthUser');
  })
  .prefix('api')
  .middleware(['auth:jwt', 'userAuth']);
