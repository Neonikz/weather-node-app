import axios from 'axios';
import fs from 'fs';
import { cachedDataVersionTag } from 'v8';

class Searches {
    history = [];
    dbPath = './db/database.json';

    constructor() {
        this.readDB()
    }

    get capitalizedHistory(){
        return this.history.map(place => {

            let words = place.split(' ');
            words = words.map(word => word[0].toUpperCase() + word.substring(1));
            
            return words.join(' ');
        });
    }

    get paramsMapbox(){
        return{
            'access_token': process.env.MAPBOX_KEY,
            'language':'en',
            'limit':'5',
        }
    }

    get paramsOpenWeather(){
        return{
            'appid':process.env.OPENWEATHER_KEY,
            'units':'metric'
        }
    }

    async city(place = '') {

        try {

            const mapboxApi = axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params:this.paramsMapbox  
            })

            const resp = await mapboxApi.get();
            return resp.data.features.map(place => ({
                id:place.id,
                name:place.place_name,
                lng:place.center[0],
                lat:place.center[1],
            }));

        } catch (error) {
            console.log(error)
            return [];
        }
    }

    async weatherPlace(lat,lon){
        try {
            const weatherApi = axios.create({
                baseURL:`https://api.openweathermap.org/data/2.5/weather`,
                params:{...this.paramsOpenWeather,lat,lon} 
            })
            const resp = await weatherApi.get();
            const {weather,main} = resp.data;
            return{
                description:weather[0].description,
                temperature:main.temp,
                maxTemperature:main.temp_max,
                minTemperature:main.temp_min,
            }
        } catch (error) {
            console.log(error);
        }

    }

    addHistory(place = ''){
        if(this.history.includes(place.toLowerCase()))return;

        this.history = this.history.splice(0,5);

        this.history.unshift(place.toLowerCase());

        this.saveDB();
    }

    saveDB(){
        const payload = {
            history:this.history,
        }
        fs.writeFileSync(this.dbPath,JSON.stringify(payload))    
    }

    readDB(){
        if(!fs.existsSync(this.dbPath)) return;
        const info = fs.readFileSync(this.dbPath,{encoding: 'utf-8'});
        const data = JSON.parse(info);
        this.history = data.history;
    }
};

export default Searches;