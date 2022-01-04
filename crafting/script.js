const robot = require('robotjs');

const closeBankTabLocation = [483,72];
const bankLocation = [508,341];
const withdrawMoltenGlassLocation = [416,148];
const depositMoltenGlassLocation = [622,279];
const glassBlowingPipeLocation = [579, 284];
const moltenGlassInventoryLocation = [622, 278];

const startCrafting = () => {

    setTimeout(() => {
        robot.moveMouse(glassBlowingPipeLocation[0], glassBlowingPipeLocation[1]);
    }, 1000);
    setTimeout(() => {
        robot.mouseClick();
    }, 1500);

    setTimeout(() => {
        robot.moveMouse(moltenGlassInventoryLocation[0], moltenGlassInventoryLocation[1]);
    }, 2000);
    setTimeout(() => {
        robot.mouseClick();
    }, 2500);

    setTimeout(() => {
        robot.keyTap("space");
    }, 3500)

}

const startBanking = () => {
    setTimeout(() => {
        robot.moveMouse(bankLocation[0], bankLocation[1]);
    }, 1000);
    setTimeout(() => {
        robot.mouseClick();
    }, 1500);

    setTimeout(() => {
        robot.moveMouse(depositMoltenGlassLocation[0], depositMoltenGlassLocation[1]);
    }, 2000);
    setTimeout(() => {
        robot.mouseClick();
    }, 2500);

    setTimeout(() => {
        robot.moveMouse(withdrawMoltenGlassLocation[0], withdrawMoltenGlassLocation[1]);
    }, 3500);
    setTimeout(() => {
        robot.mouseClick();
    }, 4500);

    setTimeout(() => {
        robot.moveMouse(closeBankTabLocation[0], closeBankTabLocation[1]);
    }, 5500);
    setTimeout(() => {
        robot.mouseClick();
    }, 6000);

}

module.exports = () => {

    let clicks = 0;
    let crafting = false;
    let banking = false;

    setInterval(() => {
        clicks++;

        if( (clicks % 1) === 0 && !crafting) {
            crafting = true
            startCrafting();
        }

        if( (clicks % 30) === 0 && !banking) {

        }

        console.log(`clicks ${clicks}`)

    }, 1000);

}