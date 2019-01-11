'use strict';

const Globals = use('App/Helpers/Globals');

class General {

    static responseSuccessAPI(response, data = {}, message = 'OK', code = 200, status = 'success',
     title = '') {
        const responseObject = { ...Globals.responseObject, data, message, status, title, code };
        return response.status(code).json(responseObject);
    }

    static responseErrorAPI(response, data = {}, message = 'ERROR', code = 400, status = 'error',
     title = '') {
        const responseObject = { ...Globals.responseObject, data, message, status, title, code };
        return response.status(code).json(responseObject);
    }

}

module.exports = General;
