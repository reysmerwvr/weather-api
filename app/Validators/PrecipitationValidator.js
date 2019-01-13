'use strict';

const { validate } = use('Validator');
const {
    showRules
} = require('../Rules/PrecipitationRules');

class PrecipitationValidator {
    static async showValidation({ data }) {
        const validation = await validate(data, { 
            ...showRules
        });
        return validation;
    }
}

module.exports = PrecipitationValidator;
