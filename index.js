import { inquirerMenu, listPlaces, pause, readInput } from "./helpers/inquirer.js";
import Searches from "./models/searches.js";
import 'dotenv/config.js'

const main = async() => {

    const searches = new Searches();
    let option = 1;

    do {

        option = await inquirerMenu();

        switch(option){
            case 1:

                const placeToSearch = await readInput('City: ');
                
                const places = await searches.city(placeToSearch);
                
                const id = await listPlaces(places);
                
                const {name,lat,lng} = places.find(place => place.id === id);

                console.log('\nCity information\n'.green);
                console.log('City:',name);
                console.log('Latitude:',lat);
                console.log('Longitude:',lng);
                console.log('Temperature:');
                console.log('Min. Temp.:');
                console.log('Max. Temp.:');
            break;
        }

        if(option !== 0) await pause();
    } while (option !== 0);
};

main();