const robot = require("robotjs");

const start = (seconds, amount) => {

    //Information on how long the autoclicker will run for HOUR:MINUTES:SECONDS
    const duration = new Date(amount * 1000).toISOString().substr(11, 8);
    console.log(`Duration (HOUR:MINUTE:SECOND) : ${duration}`)

    const milliseconds = seconds * 1000;

    let clicked = 0;

    let interval = setInterval(() => {
        clicked += 1;
        
        if( (clicked % 1) === 0 ) robot.mouseClick();

        if( (clicked % 5) === 0 ) console.log(`Clicked ${clicked} / ${amount}`);

        if( (clicked % 1000) === 0) robot.setMouseDelay(2000)

        if(clicked >= amount) clearInterval(interval);

    }, milliseconds);

}

start(0.6, 22000);


