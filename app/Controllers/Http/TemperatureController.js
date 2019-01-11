'use strict';

const Env = use('Env');
const axios = use('axios');
const City = use('App/Models/City');
const General = use('App/Helpers/General');
const TemperatureValidator = use('App/Validators/TemperatureValidator');

const ROOT_URL = 'api.openweathermap.org/data/2.5/forecast?';

class TemperatureController {
    async getWeatherInformation({ request, response }) {
        const data = request.all();
        const validation = await TemperatureValidator.getWeatherInformationValidation({ data });
        if (validation.fails()) {
            const message = validation.messages()[0].message;
            return await General.responseErrorAPI(response, undefined, message);
        }
        try {

        } catch (error) {
            return await General.responseErrorAPI(response, undefined, error.message, error.status);
        }
    }

    async findWeatherByCityName(data) {
        const cityName = data.city_name;
        let city = await City.query().where('name', cityName).first(); 
        const url = (city)
        ? `${ROOT_URL}q=${cityName},${city.country}&appid=${Env.get('OPEN_WEATHER_API_KEY')}` 
        : `${ROOT_URL}q=${cityName}&appid=${Env.get('OPEN_WEATHER_API_KEY')}`;
        await axios.get(url)
            .then((response) => {
                const forecastResponse = response.data;
                if (forecastResponse.cnt > 0) {
                    const forecastList = forecastResponse.list,
                        forecastCity = forecastResponse.city,
                        temperatureData = [],
                        precipitationData = [];
                    if (!city && forecastCity) {
                        const cityObject = this.getCityObject(forecastCity);
                        city = City.create(cityObject);
                    }
                    for (const forecastObject of forecastList) {
                        const temperatureObject = this.getTemperatureObject(city, forecastObject);
                        const precipitationObject = this.getPrecipitationObject(city, forecastObject);
                        temperatureData.push(temperatureObject);
                        precipitationData.push(precipitationObject);
                    }
                }
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    }

    getTemperatureObject(city, forecastObject) {
        const mainObject = forecastObject.main;
        return {
            city_id: (city) ? city.id : null,
            city_name: (city) ? city.name : null,
            city_coord: (city) ? city.coordinates : null,
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

    getPrecipitationObject(city, forecastObject) {
        const mainObject = forecastObject.main;
        return {
            city_id: (city) ? city.id : null,
            city_name: (city) ? city.name : null,
            city_coord: (city) ? city.coordinates : null,
            precipitation_value: mainObject.temp_kf,
            precipitation_type: null,
            weather: JSON.stringify(forecastObject.weather),
            datetime_of_data: forecastObject.dt_txt,
        };
    }

    getCityObject(forecastCity) {
        const country = forecastCity.country;
        return {
            code: forecastCity.id,
            name: forecastCity.name,
            country: (country && country !== 'none') ? country : null,
            coordinates: JSON.stringify(forecastCity.coord),
        };
    }
}

module.exports = TemperatureController;
