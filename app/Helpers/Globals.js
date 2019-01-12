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

const handleError = (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
};

module.exports = {
    globalRules,
    responseObject,
    handleError
};
