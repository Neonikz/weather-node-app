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
                if(id === '0') continue;

                const {name,lat,lng} = places.find(place => place.id === id);

                searches.addHistory(name)

                const {description,temperature,maxTemperature,minTemperature} = await searches.weatherPlace(lat,lng);

                console.clear()
                console.log('\nCity information\n'.green);
                console.log('City:',name.green);
                console.log('Latitude:',lat);
                console.log('Longitude:',lng);
                console.log('Temperature:',temperature);
                console.log('Min. Temp.:',minTemperature);
                console.log('Max. Temp.:',maxTemperature);
                console.log('What the weather looks like:',description.green);
            break;

            case 2:
                console.log('\n')
                searches.capitalizedHistory.forEach((place,i) => {
                    const idx = `${i + 1}.`.green;
                    console.log(`${idx} ${place}`)
                })
            break;
        }

        if(option !== 0) await pause();
    } while (option !== 0);
};

main();