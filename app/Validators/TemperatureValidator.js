'use strict';

const { validate } = use('Validator');
const {
    getWeatherInformationRules,
} = require('../Rules/TemperatureRules');

class TemperatureValidator {
    static async loadWeatherInformationValidation({ data }) {
        const validation = await validate(data, { 
            ...getWeatherInformationRules, 
        });
        return validation;
    }
}

module.exports = TemperatureValidator;
