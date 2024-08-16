class Forecast {
    constructor() {
        this.key = '6Kota3BSPz3lgKUUTGBAjUf8WpCebE0K';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }

    async getCity(city) {
        const query = `?apikey=${this.key}&q=${city}`;

        const response = await fetch(this.cityURI + query);
        const data = await response.json();
    
        return data[0];
    }

    async getWeather(cityID) {
        const query = `${cityID}?apikey=${this.key}`;

        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
    
        return data[0];
    }

    async updateCity(city) {
        const cityDetails = await this.getCity(city);
        const weather = await this.getWeather(cityDetails['Key']);
    
        return { cityDetails, weather };
    }
}