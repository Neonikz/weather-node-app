import axios from 'axios';

class Searches {
    history = [];

    constructor() {

    }

    get paramsMapbox(){
        return{
            'access_token': process.env.MAPBOX_KEY,
            'language':'en',
            'limit':'5',
        }
    }

    async city(place = '') {

        try {

            const weatherApi = axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params:this.paramsMapbox  
            })

            const resp = await weatherApi.get();
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
};

export default Searches;