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
     *          "is_active": 1,
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

    /**
     * TemperatureController
     * loadForecast()
     * @apiDescription Load Forecast
     * @api {post} /forecasts Load Forecast
     * @apiVersion 1.0.0
     * @apiName Load Forecast
     * @apiGroup Forecast
     *
     * @apiUse HeadersProtected
     *
     * @apiParam {String} city_name              
     * City Name. <code>Test</code>
     * <label class="label label-warning">required if city_id, coordinates and zip_code are not present</label>
     * @apiParam {Integer} city_id              
     * City Id. <code>334455</code>
     * <label class="label label-warning">required if city_name, coordinates and zip_code are not present</label>
     * @apiParam {Object} coordinates              
     * Coordinates. <code>coordinates: {"lat" : "10.48801", "lon" : "-66.879189"}</code>
     * <label class="label label-warning">required if city_name, city_id and zip_code are not present</label>
     * @apiParam {Integer} zip_code              
     * Zip Code. <code>332211</code>
     * <label class="label label-warning">required if city_name, city_id and coordinates are not present</label>
     *
     * @apiSuccessExample Json-Example:
     *  Content-Type: application/json
     *  {
     *    "city_name": "Caracas",
     *    "city_id": 3646738,
     *    "coordinates" : {
     *    	"lat": "40.741895",
     *  	"lon": "24.52815",
     *    },
     *    "zip_code": 223344,
     *  }
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     * {
     *      "program": "weather-api",
     *      "version": "v1.0.0",
     *      "release": "1",
     *      "status": "success",
     *      "code": 200,
     *      "message": "Forecast data loaded sucessfully",
     *      "title": "",
     *      "data": {
     *          "cod": "200",
     *          "message": 0.0097,
     *          "cnt": 40,
     *          "list": [
     *              {
     *                  "dt": 1547337600,
     *                  "main": {
     *                      "temp": 20.36,
     *                      "temp_min": 20.36,
     *                      "temp_max": 22.95,
     *                      "pressure": 971.96,
     *                      "sea_level": 1027.62,
     *                      "grnd_level": 971.96,
     *                      "humidity": 75,
     *                      "temp_kf": -2.59
     *                  },
     *                  "weather": [
     *                      {
     *                          "id": 500,
     *                          "main": "Rain",
     *                          "description": "light rain",
     *                          "icon": "10n"
     *                      }
     *                  ],
     *                  "clouds": {
     *                      "all": 32
     *                  },
     *                  "wind": {
     *                      "speed": 1.48,
     *                      "deg": 54.0023
     *                  },
     *                  "rain": {
     *                      "3h": 0.045
     *                  },
     *                  "sys": {
     *                      "pod": "n"
     *                  },
     *                  "dt_txt": "2019-01-13 00:00:00"
     *             },
     *             ...
     *          ],
     *         "city": {
     *              "id": 3646738,
     *              "name": "Caracas",
     *              "coord": {
     *                  "lat": 10.488,
     *                  "lon": -66.8792
     *              },
     *              "country": "VE",
     *              "population": 3000000
     *         }
     *     }
     * }
     *
     * @apiSuccessExample Error-Response:
     *  HTTP/1.1 400 Bad Request
     * {
     *      "program": "weather-api",
     *      "version": "v1.0.0",
     *      "release": "1",
     *      "status": "error",
     *      "code": 400,
     *      "message": "Error loading forecast data",
     *      "title": "",
     *      "data": {}
     * }
     *
     * @apiUse responseOauth
     *
    */

    /**
     * CityController
     * getCitiesByType()
     * @apiDescription Get Cities By Type
     * @api {get} /cities Get Cities By Type
     * @apiVersion 1.0.0
     * @apiName Get Cities By Type
     * @apiGroup Cities
     *
     * @apiUse HeadersProtected
     *
     * @apiParam {String} type              
     * Type of relationship. <code>temperatures/precipitations</code>
     * <label class="label label-warning">required</label>
     *
     * @apiSuccessExample Url-Example:
     * {{url}}/cities?type=temperatures
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     * {
     *  "program": "weather-api",
     *  "version": "v1.0.0",
     *  "release": "1",
     *  "status": "success",
     *  "code": 200,
     *  "message": "OK",
     *  "title": "",
     *  "data": [
     *      {
     *          "id": 12782,
     *          "code": 3646738,
     *          "name": "Caracas",
     *          "country": "VE",
     *          "coordinates": "{\"latitude\": 10.48801, \"longitude\": -66.879189}",
     *          "created_at": "2019-01-13 15:49:30",
     *          "updated_at": "2019-01-13 15:49:30",
     *          "deleted_at": null
     *      },
     *      ...
     *   ]
     * }
     *
     * @apiSuccessExample Error-Response:
     *  HTTP/1.1 400 Bad Request
     *  {
     *      "program": "weather-api",
     *      "version": "v1.0.0",
     *      "release": "1",
     *      "status": "error",
     *      "code": 400,
     *      "message": "in validation failed on type",
     *      "title": "",
     *      "data": {}
     *  }
     *
     * @apiUse responseOauth
     *
    */

    /**
     * TemperatureController
     * index()
     * @apiDescription Get Temperatures
     * @api {get} /temperatures Get Temperatures
     * @apiVersion 1.0.0
     * @apiName Get Temperatures
     * @apiGroup Temperatures
     *
     * @apiUse HeadersProtected
     * 
     * @apiSuccessExample Url-Example:
     * {{url}}/temperatures
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     * {
     *  "program": "weather-api",
     *  "version": "v1.0.0",
     *  "release": "1",
     *  "status": "success",
     *  "code": 200,
     *  "message": "OK",
     *  "title": "",
     *  "data": [
    *       {
    *           "id": 1,
    *           "city_id": 12782,
    *           "temp_day": 19.69,
    *           "temp_min": 19.69,
    *           "temp_max": 22.56,
    *           "temp_night": 19.69,
    *           "temp_eve": 19.69,
    *           "temp_morn": 19.69,
    *           "pressure": 972.34,
    *           "humidity": 68,
    *           "datetime_of_data": "2019-01-14T05:00:00.000Z",
    *           "created_at": "2019-01-13 16:37:21",
    *           "updated_at": "2019-01-13 16:37:21",
    *           "deleted_at": null,
    *           "city": {
    *               "id": 12782,
    *               "code": 3646738,
    *               "name": "Caracas",
    *               "country": "VE",
    *               "coordinates": "{\"latitude\": 10.48801, \"longitude\": -66.879189}",
    *               "created_at": "2019-01-13 15:49:30",
    *               "updated_at": "2019-01-13 15:49:30",
    *               "deleted_at": null
    *           }
    *       },
     *      ...
     *   ]
     * }
     *
     * @apiSuccessExample Error-Response:
     *  HTTP/1.1 204 Data Not Found
     *
     * @apiUse responseOauth
     *
    */

    /**
     * TemperatureController
     * show()
     * @apiDescription Get Temperatures By City Id
     * @api {get} /temperatures/:id Get Temperatures By City Id
     * @apiVersion 1.0.0
     * @apiName Get Temperatures By City Id
     * @apiGroup Temperatures
     *
     * @apiUse HeadersProtected
     * 
     * @apiSuccessExample Url-Example:
     * {{url}}/temperatures/:id
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     * {
     *  "program": "weather-api",
     *  "version": "v1.0.0",
     *  "release": "1",
     *  "status": "success",
     *  "code": 200,
     *  "message": "OK",
     *  "title": "",
     *  "data": [
    *       {
    *           "id": 1,
    *           "city_id": 12782,
    *           "temp_day": 19.69,
    *           "temp_min": 19.69,
    *           "temp_max": 22.56,
    *           "temp_night": 19.69,
    *           "temp_eve": 19.69,
    *           "temp_morn": 19.69,
    *           "pressure": 972.34,
    *           "humidity": 68,
    *           "datetime_of_data": "2019-01-14T05:00:00.000Z",
    *           "created_at": "2019-01-13 16:37:21",
    *           "updated_at": "2019-01-13 16:37:21",
    *           "deleted_at": null,
    *           "city": {
    *               "id": 12782,
    *               "code": 3646738,
    *               "name": "Caracas",
    *               "country": "VE",
    *               "coordinates": "{\"latitude\": 10.48801, \"longitude\": -66.879189}",
    *               "created_at": "2019-01-13 15:49:30",
    *               "updated_at": "2019-01-13 15:49:30",
    *               "deleted_at": null
    *           }
    *       },
     *      ...
     *   ]
     * }
     *
     * @apiSuccessExample Error-Response:
     *  HTTP/1.1 204 Data Not Found
     *
     * @apiUse responseOauth
     *
    */

    /**
     * PrecipitationController
     * index()
     * @apiDescription Get Precipitations
     * @api {get} /Precipitations Get Precipitations
     * @apiVersion 1.0.0
     * @apiName Get Precipitations
     * @apiGroup Precipitations
     *
     * @apiUse HeadersProtected
     * 
     * @apiSuccessExample Url-Example:
     * {{url}}/precipitations
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     * {
     *  "program": "weather-api",
     *  "version": "v1.0.0",
     *  "release": "1",
     *  "status": "success",
     *  "code": 200,
     *  "message": "OK",
     *  "title": "",
     *  "data": [
    *       {
    *           "id": 1,
    *           "city_id": 12782,
    *           "precipitation_value": 0,
    *           "precipitation_type": "rain",
    *           "weather": "[{\"id\": 801, \"icon\": \"02n\", \"main\": \"Clouds\", \"description\": \"few clouds\"}]",
    *           "datetime_of_data": "2019-01-14T05:00:00.000Z",
    *           "created_at": "2019-01-13 16:37:21",
    *           "updated_at": "2019-01-13 16:37:21",
    *           "deleted_at": null,
    *           "city": {
    *               "id": 12782,
    *               "code": 3646738,
    *               "name": "Caracas",
    *               "country": "VE",
    *               "coordinates": "{\"latitude\": 10.48801, \"longitude\": -66.879189}",
    *               "created_at": "2019-01-13 15:49:30",
    *               "updated_at": "2019-01-13 15:49:30",
    *               "deleted_at": null
    *           }
    *       },
     *      ...
     *   ]
     * }
     *
     * @apiSuccessExample Error-Response:
     *  HTTP/1.1 204 Data Not Found
     *
     * @apiUse responseOauth
     *
    */

    /**
     * PrecipitationController
     * show()
     * @apiDescription Get Precipitations By City Id
     * @api {get} /Precipitations/:id Get Precipitations By City Id
     * @apiVersion 1.0.0
     * @apiName Get Precipitations By City Id
     * @apiGroup Precipitations
     *
     * @apiUse HeadersProtected
     * 
     * @apiSuccessExample Url-Example:
     * {{url}}/precipitations/:id
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     * {
     *  "program": "weather-api",
     *  "version": "v1.0.0",
     *  "release": "1",
     *  "status": "success",
     *  "code": 200,
     *  "message": "OK",
     *  "title": "",
     *  "data": [
    *       {
    *           "id": 1,
    *           "city_id": 12782,
    *           "precipitation_value": 0,
    *           "precipitation_type": "rain",
    *           "weather": "[{\"id\": 801, \"icon\": \"02n\", \"main\": \"Clouds\", \"description\": \"few clouds\"}]",
    *           "datetime_of_data": "2019-01-14T05:00:00.000Z",
    *           "created_at": "2019-01-13 16:37:21",
    *           "updated_at": "2019-01-13 16:37:21",
    *           "deleted_at": null,
    *           "city": {
    *               "id": 12782,
    *               "code": 3646738,
    *               "name": "Caracas",
    *               "country": "VE",
    *               "coordinates": "{\"latitude\": 10.48801, \"longitude\": -66.879189}",
    *               "created_at": "2019-01-13 15:49:30",
    *               "updated_at": "2019-01-13 15:49:30",
    *               "deleted_at": null
    *           }
    *       },
     *      ...
     *   ]
     * }
     *
     * @apiSuccessExample Error-Response:
     *  HTTP/1.1 204 Data Not Found
     *
     * @apiUse responseOauth
     *
    */
