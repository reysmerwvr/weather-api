'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */

const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments();
      table.string('name', 80).notNullable().comment('User name.');
      table.string('username', 80).notNullable().unique().comment('User nickname.');
      table.string('email', 254).notNullable().unique().comment('User email.');
      table.string('password', 60).notNullable().comment('User password.');
      table.boolean('is_active').comment('User is active.');
      table.timestamps();
      table.dateTime('deleted_at');
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
