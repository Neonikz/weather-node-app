import { inquirerMenu, pause, readInput } from "./helpers/inquirer.js";
import Searches from "./models/searches.js";

const main = async() => {

    const searches = new Searches();
    let option = 1;

    do {

        option = await inquirerMenu();

        switch(option){
            case 1:

                const place = await readInput('City: ');
                console.log(place);

                console.log('\nCity information\n'.green);
                console.log('City:');
                console.log('Latitude:');
                console.log('Longitude:');
                console.log('Temperature:');
                console.log('Min. Temp.:');
                console.log('Max. Temp.:');
            break;
        }

        if(option !== 0) await pause();
    } while (option !== 0);
};

main();