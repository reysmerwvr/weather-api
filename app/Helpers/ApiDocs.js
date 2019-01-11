'use strict';

    /**
     * @apiDefine HeadersBasic
     * @apiHeader   (Headers)   {String}    Content-Type <code>application/json</code>
     * @apiHeader   (Headers)   {String}    Accept-Language <code>en</code>
     */

    /**
     * @apiDefine HeadersBasicAccept
     * @apiHeader   (Headers)   {String}    Content-Type <code>application/json</code>
     * @apiHeader   (Headers)   {String}    Accept-Language <code>en</code>
     * @apiHeader   (Headers)   {String}    Accept <code>application/json</code>
     */

    /**
     * @apiDefine HeadersBasicAcceptForm
     * @apiHeader   (Headers)   {String}    Authorization <code>Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY</code>
     * @apiHeader   (Headers)   {String}    Accept-Language <code>en</code>
     * @apiHeader   (Headers)   {String}    Accept <code>multipart/form-data</code>
     */

    /**
     * @apiDefine HeadersProtected
     * @apiHeader   (Headers)   {String}    Authorization <code>Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY</code>
     * @apiHeader   (Headers)   {String}    Content-Type <code>application/json</code>
     * @apiHeader   (Headers)   {String}    Accept-Language <code>en</code>
     * @apiHeader   (Headers)   {String}    Accept <code>application/json</code>
     */

    /**
     * @apiDefine responseOauth
     * @apiSuccessExample OAuth Response:
     *  HTTP/1.1 401 Unauthorized
     * {
     *      "program": "weather-api",
     *      "version": "v1.0.0",
     *      "release": "1",
     *      "datetime": "2017-07-26 17:27:06",
     *      "timestamp": "17:27:06",
     *      "status": "error",
     *      "code": 401,
     *      "message": "Invalid OAuth Client Credentials.",
     *      "title": "InvalidOauthClientCredentials",
     *      "data": []
     * }
    */

    /**
     * UserController
     * signIn()
     * @apiDescription Login
     * @api {post} /sign-in Login
     * @apiVersion 1.0.0
     * @apiName User Login
     * @apiGroup User
     *
     * @apiUse HeadersBasicAccept
     *
     * @apiParam {String} email          
     * User Email. <label class="label label-warning">required</label>
     * @apiParam {String} password          
     * User password. <label class="label label-warning">required</label>
     *
     * @apiSuccessExample Json-Example:
     *  Content-Type: application/json
     *  {
     *    "email" : "test@test.com",
     *    "password" : "secret",
     *  }
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     * {
     *      "program": "weather-api",
     *      "version": "v1.0.0",
     *      "release": "1",
     *      "datetime": "2017-07-26 17:20:34",
     *      "timestamp": "17:20:34",
     *      "status": "success",
     *      "code": 200,
     *      "message": "OK",
     *      "title": "",
     *      "data": {
     *          "id": 1,
     *          "name": "Test",
     *          "username": null,
     *          "email": "test@test.com",
     *          "is_active": null,
     *          "created_at": "2018-05-02 12:22:33",
     *          "updated_at": "2018-05-02 12:22:33",
     *          "deleted_at": null,
     *          "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
     *          eyJ1aWQiOjExLCJpYXQiOjE1MjUyODI1NTF9.FunjQTMBJjLfjggAvV7984_SXTd35FFxhPN5KcxBmzs",
     *      }
     * }
     *
     * @apiSuccessExample Error-Response:
     *  HTTP/1.1 400 Bad Request
     * {
     *      "program": "weather-api",
     *      "version": "v1.0.0",
     *      "release": "1",
     *      "status": "error",
     *      "code": "",
     *      "message": "exists validation failed on email",
     *      "title": "",
     *      "data": {}
     * }
     *
     * @apiUse responseOauth
     *
    */
