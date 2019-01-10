'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Token extends Model {
  
  /**
   * A relationship on user
   *
   * @method user
   *
   * @return {Object}
   */
  user() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = Token;
