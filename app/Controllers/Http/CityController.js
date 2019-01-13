'use strict';

const _ = use('lodash');
const City = use('App/Models/City');
const General = use('App/Helpers/General');
const CityValidator = use('App/Validators/CityValidator');

class CityController {
    
    async getCitiesByType({ request, response }) {
        const data = request.all();
        const validation = await CityValidator.getCitiesByTypeValidation({ data });
        if (validation.fails()) {
            const message = validation.messages()[0].message;
            return await General.responseErrorAPI(response, undefined, message);
        }
        try {
            const cities = await City.query()
            .has(data.type)
            .whereNull('deleted_at')
            .fetch();
            return (_.size(cities.rows) > 0) ?
            await General.responseSuccessAPI(response, cities.toJSON()) :
            await General.responseErrorAPI(
                response, undefined, 
                'Data not found', 204);
        } catch (error) {
            return await General.responseErrorAPI(response, undefined, error.message, error.status);
        }
    }
}

module.exports = CityController;
