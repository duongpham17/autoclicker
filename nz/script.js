const robot = require("robotjs");

module.exports = () => {

    const seconds = 1;
    const milliseconds = seconds * 1000;

    const rapid_heal_coord  = [718, 320];
    const inventory_y_coord = [321, 355, 396, 424, 464, 504];
    const inventory_x_coord = [581, 622, 664, 707];

    const drinkAbsorptionPotionTimerInSeconds = 300;
    let absportionPotions = 24;

    let y_index = 0;
    let x_index = 0;
    let clicks = 0;
    let drinking = false;

    let interval = setInterval(() => {
        clicks++;
        
        // if( (clicks % 1) === 0 ) robot.mouseClick();

        // Switch back to 
        if( (clicks & 15) === 0 && !drinking) {
            robot.mouseClick();
            setTimeout(() => robot.mouseClick(), 400);
        }

        // Switch to inventory to drink absportion potion
        if( (clicks % drinkAbsorptionPotionTimerInSeconds) === 0){
            drinking = true

            robot.keyTap('f4');
            
            robot.moveMouse(inventory_x_coord[x_index], inventory_y_coord[y_index]);

            let drink = 0;

            let mouseClick = setInterval(() => {
                robot.mouseClick();

                drink++;

                //finish 4 dose of absorption potion
                if(drink >= 6) {
                    clearInterval(mouseClick);
                    absportionPotions--;
                    
                    if(y_index === 5){
                        y_index = 0;
                        x_index++;
                    } else {
                        y_index++
                    }

                    drinking = false;

                    robot.keyTap('f1');

                    robot.moveMouse(rapid_heal_coord[0], rapid_heal_coord[1]);
                }
            }, 1200);
        }

        if( (clicks % 5) === 0 ) console.log(`Clicks ${clicks}`);

        if(absportionPotions === 0) clearInterval(interval);

    }, milliseconds);


}


