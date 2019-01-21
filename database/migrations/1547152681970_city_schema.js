'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CitySchema extends Schema {
  up() {
    this.create('cities', (table) => {
      table.increments();
      table.bigInteger('code').notNullable().comment('City code');
      table.string('name', 254).notNullable().comment('City name');
      table.string('country', 2).comment('City country.' 
      + ' two-letter ISO code representing the country.');
      table.text('coordinates').comment('City coordinates');
      table.timestamps();
      table.dateTime('deleted_at');
    });
  }

  down() {
    this.drop('cities');
  }
}

module.exports = CitySchema;
