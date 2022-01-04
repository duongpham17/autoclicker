const robot = require('robotjs');

module.exports = () => {
    const seconds = 1;
    const milliseconds = seconds * 1000;

    setInterval(() => console.log(robot.getMousePos()), milliseconds);
}