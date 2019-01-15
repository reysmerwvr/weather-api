'use strict';


/*
|--------------------------------------------------------------------------
| CitySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const _ = use('lodash');
const Database = use('Database');
const City = use('App/Models/City');
const data = require('../../city.list.json');

class CitySeeder {
  async run() {
    const cities = await Database.table('cities');
    const citiesSize = _.size(cities);
    if (citiesSize <= 0) {
      for (const city of data) {
        city.coordinates = JSON.stringify(city.coordinates);
        await City.create(city);
      }
    }
  }
}

module.exports = CitySeeder;
