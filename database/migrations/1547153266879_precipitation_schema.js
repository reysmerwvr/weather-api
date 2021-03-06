'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PrecipitationSchema extends Schema {
  up() {
    this.create('precipitations', (table) => {
      table.increments();
      table.integer('city_id').unsigned().comment('Precipitation city id');
      table.float('precipitation_value').comment('Precipitation value');
      table.string('precipitation_type').comment('Precipitation type');
      table.text('weather').comment('Precipitation weather object');
      table.dateTime('datetime_of_data').comment('Precipitation date time of data forecasted');
      table.timestamps();
      table.dateTime('deleted_at');

      //foreign keys
      table.foreign('city_id').references('id').on('cities');
    });
  }

  down() {
    this.drop('precipitations');
  }
}

module.exports = PrecipitationSchema;
