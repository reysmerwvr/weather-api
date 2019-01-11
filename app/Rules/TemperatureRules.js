const getWeatherInformationRules = {
    city_name: 'required_without_all:city_id,coordinates,zip_code|string|max:254',
    city_id: 'required_without_all:city_name,coordinates,zip_code|integer',
    coordinates: 'required_without_all:city_name,city_id,zip_code|json',
    zip_code: 'required_without_all:city_name,city_id,coordinates|integer',
};

module.exports = {
    getWeatherInformationRules
};
