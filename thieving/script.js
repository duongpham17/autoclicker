const robot = require('robotjs');

const locationRandomise = (value) => (Math.floor(Math.random() * 4)) + value;

const moveMouse = ({x, y}) => robot.moveMouse(locationRandomise(x), locationRandomise(y)); 

const timeoutMilli = (value) => 600 * value; 

module.exports = () => {

    const COIN_LOCATION = { x: 1458, y: 772 };
    const PICKPOCKET_LOCATION = { x: 1359, y: 776 };

    let open_coin = false;
    let success = 0;

    
    setInterval(() => {

        success+= 1;

        if(success === 25) open_coin = true;

        if(open_coin === false) {
            setTimeout(() => robot.mouseClick(), 800);
        }

        if(open_coin === true){
            setTimeout(() => moveMouse(COIN_LOCATION), timeoutMilli(0));
            setTimeout(() => robot.mouseClick(), timeoutMilli(1));
            setTimeout(() => moveMouse(PICKPOCKET_LOCATION), timeoutMilli(2));
            setTimeout(() => {
                success = 0;
                open_coin = false;
            }, timeoutMilli(3));
        }

    }, 800);

}