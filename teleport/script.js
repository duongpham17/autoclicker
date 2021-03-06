const robot = require('robotjs');

module.exports = (clicksPerSeconds, amountOfClicks, hopWorld=false, hopWorldBasedOnClicks) => {
    const duration = new Date(amountOfClicks * 1000).toISOString().substr(11, 8);
    console.log(`Duration (HOUR:MINUTE:SECOND) : ${duration}`);

    const milliseconds = clicksPerSeconds * 1000;
    const world_switcher_coord = [660, 435];
    const first_world_coord = [603, 343];
    const second_world_coord = [602, 353];
    const teleport_spell_coord = [695, 342];

    let clicks = 0;
    let changeWorld = false;
    let switchedWorld = false;

    let interval = setInterval(() => {
        clicks++;

        if( (clicks % 1) === 0 && !changeWorld) robot.mouseClick();

        if( (clicks % 30) === 0 && !changeWorld) {
            const randomise_teleport_x_coord = [689, 690, 691, 692, 693, 694, 695, 696];
            const randomise_teleport_y_coord = [338, 340, 341, 342, 343, 344];

            const generateRandomNumber = (int) => Math.floor(Math.random() * int);

            robot.moveMouse(
                randomise_teleport_x_coord[generateRandomNumber(8)],
                randomise_teleport_y_coord[generateRandomNumber(6)]
            );
        }

        if( (clicks % 10) === 0 ) console.log(`Clicks ${clicks} / ${amountOfClicks}`);

        if(hopWorld && !changeWorld){
            if (clicks % hopWorldBasedOnClicks === 0) {
                changeWorld = true;

                robot.keyTap('f7');

                setTimeout(() => {
                    robot.moveMouse(world_switcher_coord[0], world_switcher_coord[1]);
                }, 1000);

                setTimeout(() => {
                    robot.mouseClick();
                },3000);

                if(switchedWorld){
                    setTimeout(() => {
                        robot.moveMouse(first_world_coord[0], first_world_coord[1]);
                    },5000);

                    setTimeout(() => {
                        robot.mouseClick();
                    },7000);

                    switchedWorld = false
                } else {
                    setTimeout(() => {
                        robot.moveMouse(second_world_coord[0], second_world_coord[1]);
                    }, 5000);

                    setTimeout(() => {
                        robot.mouseClick();
                    }, 7000);

                    switchedWorld = true
                }

                // change back to spell book
                setTimeout(() => {
                    robot.keyTap('f2');
                }, 25000);

                setTimeout(() => {
                    robot.moveMouse(teleport_spell_coord[0], teleport_spell_coord[1]);
                    changeWorld = false;
                }, 27000)
            }
        }

        if(clicks >= amountOfClicks) clearInterval(interval);
    }, milliseconds)
}