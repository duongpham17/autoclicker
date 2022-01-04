const robot = require("robotjs");

module.exports = (drinkInSeconds) => {

    const seconds = 1;
    const milliseconds = seconds * 1000;

    const rapid_heal_coord  = [593, 150];
    const special_attack_coord = [628, 205 ]
    const inventory_x_coord = [581, 622, 664, 707];
    const inventory_y_coord = [321, 355, 396, 424, 464, 504];

    let current_y_index = 0;
    let current_x_index = 0;
    let absportionPotions = 24;
    let clicks = 0;
    let drinking = false;

    const clicksAccumulator = () => {
        if(!drinking) clicks++;
    }

    const logToTerminal = () => {
        if( (clicks % 5) === 0 ) console.log(`Clicks ${clicks}`);
    }

    const rapidHeal = () => {
        if( (clicks & 20) === 0 && !drinking) {
            robot.mouseClick();
            setTimeout(() => robot.mouseClick(), 300);
        }
    }

    const specialAttack = () => {
        if( (clicks % 151) === 0 && !drinking) {
            robot.moveMouse(special_attack_coord[0], special_attack_coord[1]);
            setTimeout(() => robot.mouseClick(), 500);
            setTimeout(() => robot.moveMouse(rapid_heal_coord[0], rapid_heal_coord[1]), 1500);
        }
    }

    const drinkPotion = () => {
        if( (clicks % drinkInSeconds) === 0 && !drinking) {
            drinking = true;

            let drank = 0;

            if(drank === 0){
                robot.mouseClick();
                setTimeout(() => robot.mouseClick(), 300);
            }

            let interval = setInterval(() => {
                drank++;
                
                robot.moveMouse(inventory_x_coord[current_x_index], inventory_y_coord[current_y_index]);

                if(drank === 0) robot.moveMouse(inventory_x_coord[current_x_index], inventory_y_coord[current_y_index])
                
                robot.mouseClick();
                
                if(drank >= 5) {
                    if(current_y_index === inventory_y_coord.length){
                        current_y_index = 0;
                        current_x_index++
                    };
        
                    if(current_y_index !== inventory_y_coord.length){
                        current_y_index++;
                    };

                    clearInterval(interval);

                    drinking = false;

                    setTimeout(() => robot.moveMouse(rapid_heal_coord[0], rapid_heal_coord[1]), (1000));
                };
            }, 1500);
        }
    }

    let interval = setInterval(() => {
        
        clicksAccumulator();

        logToTerminal();

        rapidHeal();

        specialAttack();

        drinkPotion();

        if(absportionPotions === 0) clearInterval(interval);

    }, milliseconds);


}


