'use strict';

const { validate } = use('Validator');
const {
    loadForecastRules,
    showRules
} = require('../Rules/TemperatureRules');

class TemperatureValidator {
    static async loadForecastValidation({ data }) {
        const validation = await validate(data, { 
            ...loadForecastRules, 
        });
        return validation;
    }

    static async showValidation({ data }) {
        const validation = await validate(data, { 
            ...showRules
        });
        return validation;
    }
}

module.exports = TemperatureValidator;
