'use strict';

const { validate } = use('Validator');
const {
    getCitiesByTypeRules
} = require('../Rules/CityRules');

class CityValidator {
    static async getCitiesByTypeValidation({ data }) {
        const validation = await validate(data, { 
            ...getCitiesByTypeRules
        });
        return validation;
    }
}

module.exports = CityValidator;
