const loadForecastRules = {
    city_name: 'required_when:find_by,city_name|string|max:254',
    city_id: 'required_when:find_by,city_id|integer',
    coordinates: 'required_when:find_by,coordinates|json',
    zip_code: 'required_when:find_by,zip_code|integer',
    find_by: 'required|string|in:coordinates,city_name,city_id,zip_code'
};

const showRules = {
    city_id: 'required|integer'
};

module.exports = {
    loadForecastRules,
    showRules
};
