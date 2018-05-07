var bollConstrains = {
    m       :10,
    x       :150,
    y       :150,
    vx      :0,
    vy      :0,
    radius  :3
};
const lineDistance = 70;
let highLineY = 150 + lineDistance/2;
let lowLineY = 150 - lineDistance/2;
let dir = true; //向上

var boll = new Item.Boll(bollConstrains);
var gEnv = new Environment.Gravitation(150, -1000, 100000);


const displayBoll = () => {
    log(boll.x, boll.y);
    boll.display();
};

const displayEnvironment = () => {
    gEnv.display();
};

const displayLine = () => {
    context.beginPath();
    context.lineTo(0, 300 - highLineY);
    context.lineTo(300, 300 - highLineY);
    context.stroke();

    context.beginPath();
    context.lineTo(0, 300 - lowLineY);
    context.lineTo(300, 300 - lowLineY);
    context.stroke();

    if (!pause) {
        if (dir) {
            highLineY ++;
            lowLineY ++;
            if (highLineY >= 300) {
                dir = false;
            }
        } else {
            highLineY --;
            lowLineY --;
            if (lowLineY <= 0) {
                dir = true;
            }
        }
    }
}

const display = () => {
    clear();
    displayBoll();
    displayEnvironment();
    displayLine();
};

// let detF = 20;
// let detTimes = 0;
const update = (timeInterval) => {
    const splitCount = 100;
    const splitTime = timeInterval/splitCount;

    for (let i = 0; i < splitCount; i ++){
        let fx = 0;
        let fy = 0;
        if (gEnv.checkItemInHere(boll)){
            let fs = gEnv.getF(boll);
            fx += fs.x;
            fy += fs.y;
        }

        // if (detTimes > 0) {
        //     fy += detF;
        //     detTimes --;
        //     // console.log(fy, detTimes);
        // } else {
            
        // }
        // console.log("fy", fy);        

        //todo 其他的受力情况

        boll.move(fx, fy, splitTime*1000);

        if (boll.y > highLineY || boll.y < lowLineY) {
            pause = true;
        }
    }
    
}




window.addEventListener('keydown', event => {
    if (event.key == "b") {
        // detTimes = 3000;
        pause = false;
        boll.vy = 5;
    }
});

const __main = () => {
    mainLoop();
};

__main();