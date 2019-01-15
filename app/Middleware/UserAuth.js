'use strict';
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const General = use('App/Helpers/General');

class UserAuth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ response, auth }, next) {
    const user = await auth.getUser();
    if (!user) {
      return await General.responseErrorAPI(
        response, undefined,
        'Error denny access',
        401
      );
    }
    await next(user);
  }
}

module.exports = UserAuth;
