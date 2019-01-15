'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class City extends Model {

  /**
   * A relationship on temperatures
   *
   * @method temperatures
   *
   * @return {Object}
   */
  temperatures() {
    return this.hasMany('App/Models/Temperature');
  }

  /**
   * A relationship on precipitations
   *
   * @method precipitations
   *
   * @return {Object}
   */
  precipitations() {
    return this.hasMany('App/Models/Precipitation');
  }
}

module.exports = City;
