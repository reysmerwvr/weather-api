'use strict';

const Env = use('Env');
const _ = use('lodash');
const axios = use('axios');
const City = use('App/Models/City');
const General = use('App/Helpers/General');
const Globals = use('App/Helpers/Globals');
const Temperature = use('App/Models/Temperature');
const Precipitation = use('App/Models/Precipitation');
const TemperatureValidator = use('App/Validators/TemperatureValidator');

const ROOT_URL = 'http://api.openweathermap.org/data/2.5/forecast?';

class TemperatureController { 

    async index({ response }) {
        try {
            const temperatures = await Temperature.query().with('city')
            .whereNull('deleted_at')
            //.groupBy('city_id')
            .fetch();
            return (_.size(temperatures.rows) > 0) ?
            await General.responseSuccessAPI(response, temperatures.toJSON()) :
            await General.responseErrorAPI(
                response, undefined, 
                'Data not found', 204);
        } catch (error) {
            return await General.responseErrorAPI(response, undefined, error.message, error.status);
        }
    }

    async show({ request, response, params }) {
        const data = request.all();
        const cityId = params.city_id || undefined;
        data.city_id = parseInt(cityId, 10);
        const validation = await TemperatureValidator.showValidation({ data });
        if (validation.fails()) {
            const message = validation.messages()[0].message;
            return await General.responseErrorAPI(response, undefined, message);
        }
        try { 
            const temperatures = await Temperature.query().with('city')
            .where('city_id', cityId)
            .whereNull('deleted_at')
            .fetch();
            return (_.size(temperatures.rows) > 0) ?
            await General.responseSuccessAPI(response, temperatures.toJSON()) :
            await General.responseErrorAPI(
                response, undefined, 
                'Data not found', 204);
        } catch (error) {
            return await General.responseErrorAPI(response, undefined, error.message, error.status);
        }
    }

    async loadForecast({ request, response }) {
        const data = request.all();
        const { coordinates } = data;
        if (coordinates) {
            data.coordinates = JSON.stringify(coordinates);
        }
        const validation = await TemperatureValidator.loadForecastValidation({ data });
        if (validation.fails()) {
            const message = validation.messages()[0].message;
            return await General.responseErrorAPI(response, undefined, message);
        }
        try {
            let forecastResponse = {};
            if (data.find_by === 'coordinates' && data.coordinates) {
                forecastResponse = await this.findWeatherByCityCoordinates(data);
            } else {
                forecastResponse = await this.findWeatherByCityCode(data);
                //forecastResponse = await this.findWeatherByCityName(data);
            }
            return (_.size(forecastResponse) > 0) 
            ? await General.responseSuccessAPI(response, forecastResponse, 'Forecast data loaded sucessfully')
            : await General.responseErrorAPI(response, undefined, 'Error loading forecast data');
        } catch (error) {
            return await General.responseErrorAPI(response, undefined, error.message, error.status);
        }
    }

    async findWeatherByCityName(data) {
        const cityName = data.city_name;
        const city = await City.query().where('name', cityName).first(); 
        const url = (city)
        ? `${ROOT_URL}q=${cityName},${city.country}&mode=json&units=metric&appid=${Env.get('OPEN_WEATHER_API_KEY')}` 
        : `${ROOT_URL}q=${cityName}&mode=json&units=metric&appid=${Env.get('OPEN_WEATHER_API_KEY')}`;
        const forecastResponse = await this.getForecastInformation(url);
        if (_.size(forecastResponse) > 0) {
            await this.storeWeatherData(forecastResponse, city, 'name');
        }
        return forecastResponse;
    }

    async findWeatherByCityCode(data) {
        const cityId = data.city_id;
        const city = await City.query().where('code', cityId).first(); 
        const url = (city)
        ? `${ROOT_URL}q=${city.name},${city.country}&mode=json&units=metric&appid=${Env.get('OPEN_WEATHER_API_KEY')}` 
        : `${ROOT_URL}id=${cityId}&mode=json&units=metric&appid=${Env.get('OPEN_WEATHER_API_KEY')}`;
        const forecastResponse = await this.getForecastInformation(url);
        if (_.size(forecastResponse) > 0) {
            await this.storeWeatherData(forecastResponse, city, 'code');
        }
        return forecastResponse;
    }

    async findWeatherByCityCoordinates(data) {
        const cityCoordinates = JSON.parse(data.coordinates); 
        const url = `${ROOT_URL}lat=${cityCoordinates.lat}&lon=${cityCoordinates.lon}&mode=json&units=metric&appid=${Env.get('OPEN_WEATHER_API_KEY')}`;
        const forecastResponse = await this.getForecastInformation(url);
        if (_.size(forecastResponse) > 0) {
            await this.storeWeatherData(forecastResponse, undefined, 'coordinates');
        }
        return forecastResponse;
    }

    async getForecastInformation(url) { 
        return await axios({
            method: 'get',
            url
        }).then((response) => response.data).catch((error) => {
            Globals.handleError(error);
            return {};
        });
    }

    async storeWeatherData(forecastResponse, city, type) {
        if (forecastResponse.cnt > 0) {
            const forecastList = forecastResponse.list,
                forecastCity = forecastResponse.city,
                temperatureData = [],
                precipitationData = [];
            if (forecastCity) {
                if (type === 'coordinates') {
                    city = await City.query().where('name', forecastCity.name)
                    .where('country', forecastCity.country)
                    .where('code', forecastCity.id)
                    .first();
                }
                if (!city) {
                    const cityObject = this.loadCityObject(forecastCity);
                    city = await City.create(cityObject);
                }
            }
            for (const forecastObject of forecastList) {
                const temperatureObject = this.loadTemperatureObject(city, forecastObject);
                const precipitationObject = this.loadPrecipitationObject(city, forecastObject);
                temperatureData.push(temperatureObject);
                precipitationData.push(precipitationObject);
            }
            Temperature.createMany(temperatureData);
            Precipitation.createMany(precipitationData);
        }
    }

    loadCityObject(forecastCity) {
        const country = forecastCity.country;
        return {
            code: forecastCity.id,
            name: forecastCity.name,
            country: (country && country !== 'none') ? country : null,
            coordinates: JSON.stringify({
                latitude: forecastCity.coord.lat,
                longitude: forecastCity.coord.lon
            })
        };
    }

    loadTemperatureObject(city, forecastObject) {
        const mainObject = forecastObject.main;
        return {
            city_id: (city.id) ? city.id : null,
            temp_day: mainObject.temp,
            temp_min: mainObject.temp_min,
            temp_max: mainObject.temp_max,
            temp_night: mainObject.temp,
            temp_eve: mainObject.temp,
            temp_morn: mainObject.temp,
            pressure: mainObject.pressure,
            humidity: mainObject.humidity,
            datetime_of_data: forecastObject.dt_txt,
        };
    }

    loadPrecipitationObject(city, forecastObject) {
        const precipitationObject = forecastObject.rain;
        return {
            city_id: (city.id) ? city.id : null,
            precipitation_value: (_.size(precipitationObject) > 0) ? precipitationObject['3h'] : 0,
            precipitation_type: 'rain',
            weather: JSON.stringify(forecastObject.weather),
            datetime_of_data: forecastObject.dt_txt,
        };
    }
}

module.exports = TemperatureController;
