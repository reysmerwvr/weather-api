'use strict';

const Env = use('Env');
const moment = use('moment');

const globalRules = {
    grant_type: 'required|string|in:client_credentials,password,refresh_token,authorization_code',
    client_id: 'required|string',
    client_secret: 'required|string'
};

const responseObject = {
    program: Env.get('API_SUBTYPE'),
    version: Env.get('API_VERSION'),
    release: Env.get('API_RELEASE'),
    datetime: () => moment().format('YYYY-MM-DD HH:mm:ss'),
    timestamp: () => moment().format('YYYY-MM-DD HH:mm:ss'),
    status: '',
    code: '',
    message: '',
    title: '',
    data: ''
};

module.exports = {
    globalRules,
    responseObject
};
