const robot = require('robotjs');

const locationRandomise = (value) => (Math.floor(Math.random() * 4)) + value;

const moveMouse = ({x, y}) => robot.moveMouse(locationRandomise(x), locationRandomise(y)); 

const timeoutMilli = (value) => 600 * value; 

module.exports = (end) => {

    const BANK_LOCATION = { x: 1294, y: 765 };
    const INVENTTORY_LOCATION = { x: 1541, y: 852 };
    const MOLTEN_GLASS_IN_BANK_LOCATION = { x: 1108, y: 784 };
    const BANK_CLOSE_LOCATION = { x: 1365, y: 566 };
    const BLOWPIPE_LOCATION = { x: 1458, y: 779 };
    const DURATION = 55 * 1000; 

    let timer = 0;
    let completed = 0;

    const interval =  setInterval(() => {
        timer+= 1000;   
        
        if(timer > DURATION) timer = 0;

        if(timer === DURATION) {
            setTimeout(() => moveMouse(BANK_LOCATION), timeoutMilli(0));
            setTimeout(() => robot.mouseClick(), timeoutMilli(1));
            setTimeout(() => moveMouse(INVENTTORY_LOCATION), timeoutMilli(2));
            setTimeout(() => robot.mouseClick(), timeoutMilli(3));
            setTimeout(() => moveMouse(MOLTEN_GLASS_IN_BANK_LOCATION), timeoutMilli(4));
            setTimeout(() => robot.mouseClick(), timeoutMilli(5)); 
            setTimeout(() => moveMouse(BANK_CLOSE_LOCATION), timeoutMilli(6));
            setTimeout(() => robot.mouseClick(), timeoutMilli(7));
            setTimeout(() => moveMouse(BLOWPIPE_LOCATION), timeoutMilli(8));
            setTimeout(() => robot.mouseClick(), timeoutMilli(9));
            setTimeout(() => moveMouse(INVENTTORY_LOCATION), timeoutMilli(10));
            setTimeout(() => robot.mouseClick(), timeoutMilli(11));
            setTimeout(() => robot.keyTap("space"), timeoutMilli(12));
            completed++;
            console.log(`Completed: ${completed}`)
        }

        if(completed === end) clearInterval(interval)

    }, 1000);


}