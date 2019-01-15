'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Precipitation extends Model {
  
  /**
   * A relationship on city
   *
   * @method city
   *
   * @return {Object}
   */
  city() {
    return this.belongsTo('App/Models/City');
  }
}

module.exports = Precipitation;
