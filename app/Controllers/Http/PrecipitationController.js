'use strict';

const _ = use('lodash');
const General = use('App/Helpers/General');
const Precipitation = use('App/Models/Precipitation');
const PrecipitationValidator = use('App/Validators/PrecipitationValidator');

class PrecipitationController {
    
    async index({ response }) {
        try {
            const precipitations = await Precipitation.query().with('city')
            .whereNull('deleted_at')
            //.groupBy('city_id')
            .fetch();
            return (_.size(precipitations.rows) > 0) ?
            await General.responseSuccessAPI(response, precipitations.toJSON()) :
            await General.responseErrorAPI(
                response, undefined, 
                'Data not found', 204);
        } catch (error) {
            return await General.responseErrorAPI(response, undefined, error.message, error.status);
        }
    }

    async show({ request, response, params }) {
        const data = request.all();
        const cityId = params.city_id || undefined;
        data.city_id = parseInt(cityId, 10);
        const validation = await PrecipitationValidator.showValidation({ data });
        if (validation.fails()) {
            const message = validation.messages()[0].message;
            return await General.responseErrorAPI(response, undefined, message);
        }
        try { 
            const precipitations = await Precipitation.query().with('city')
            .where('city_id', cityId)
            .whereNull('deleted_at')
            .fetch();
            return (_.size(precipitations.rows) > 0) ?
            await General.responseSuccessAPI(response, precipitations.toJSON()) :
            await General.responseErrorAPI(
                response, undefined, 
                'Data not found', 204);
        } catch (error) {
            return await General.responseErrorAPI(response, undefined, error.message, error.status);
        }
    }
}

module.exports = PrecipitationController;
