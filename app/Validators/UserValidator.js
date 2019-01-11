'use strict';

const { validate } = use('Validator');
const {
    signInRules,
} = require('../Rules/UserRules');

class UserValidator {
    static async signInValidation({ data }) {
        const validation = await validate(data, { 
            ...signInRules, 
        });
        return validation;
    }

}

module.exports = UserValidator;
