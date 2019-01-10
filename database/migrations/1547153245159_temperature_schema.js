'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TemperatureSchema extends Schema {
  up() {
    this.create('temperatures', (table) => {
      table.increments();
      table.integer('city_id').unsigned().comment('Temperature city id');
      table.string('city_name', 254).comment('Temperature city name');
      table.json('city_coord').comment('Temperature city coord');
      table.float('temp_day').comment('Day temperature');
      table.float('temp_min').comment('Min daily temperature');
      table.float('temp_max').comment('Max daily temperature');
      table.float('temp_night').comment('Night temperature');
      table.float('temp_eve').comment('Evening temperature');
      table.float('temp_morn').comment('Morning temperature');
      table.float('pressure').comment('Temperature pressure');
      table.float('humidity').comment('Temperature humidity');
      table.dateTime('datetime_of_data').comment('Temperature date time of data forecasted');
      table.timestamps();
      table.dateTime('deleted_at');

      //foreign keys
      table.foreign('city_id').references('id').on('cities');
    });
  }

  down() {
    this.drop('temperatures');
  }
}

module.exports = TemperatureSchema;
