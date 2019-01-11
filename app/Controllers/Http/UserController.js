'use strict';

const User = use('App/Models/User');
const General = use('App/Helpers/General');
const UserValidator = use('App/Validators/UserValidator');

class UserController {
    async signIn({ request, response, auth }) {
        const data = request.all();
        const validation = await UserValidator.signInValidation({ data });
        if (validation.fails()) {
            const message = validation.messages()[0].message;
            return await General.responseErrorAPI(response, undefined, message);
        }
        try {
            const { token } = await auth.attempt(data.email, data.password);
            if (!token) {
                return await General.responseErrorAPI(
                    response, undefined,
                    'The information for the login is invalid',
                    401
                );
            }
            const user = await User.query().with('roles').where('email', data.email).first();
            user.token = `Bearer ${token}`;
            return await General.responseSuccessAPI(response, user.toJSON());
        } catch (error) {
            return await General.responseErrorAPI(response, undefined, error.message, error.status);
        }
    }
}

module.exports = UserController;
