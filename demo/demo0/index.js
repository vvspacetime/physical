//ctor.m||1;
//ctor.x;
//ctor.y;
//ctor.vx;
//ctor.vy;

var bollConstrains = {
    m       :10,
    x       :100,
    y       :100,
    vx      :-8,
    vy      :8,
    radius  :3
};

var boll = new Item.Boll(bollConstrains);
var gEnv = new Environment.Gravitation(150,150,1000);
var track = [];

const displayTrack = () => {
    context.beginPath();
    for(let point of track){
        let r = Utils.DrawUtils.transformRect(point.x,point.y);
        context.lineTo(r.x,r.y);
    }
    context.stroke();
};

const displayBoll = () => {
    log(boll.x, boll.y);
    boll.display();
};

const displayEnvironment = () => {
    gEnv.display();
};

const display = () => {
    clear();
    displayTrack();
    displayBoll();
    displayEnvironment();
};

const update = (timeInterval) => {
    //update track
    track.push({
        x:boll.x,
        y:boll.y
    });

    //计算小球位置和速度
    //分割，计算，分割数量决定计算精度
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
        //todo 其他的受力情况

        boll.move(fx, fy, splitTime*1000);
    }
};

const __main = () => {
    mainLoop();
};

__main();


/**
 * 在不考虑量子物理的情况下，物理世界是事件空间连续的，
 * 我这边模拟的是离散的。如果力的作用够大，
 * 则会在短时间内产生足够大的冲量。
 */
//动态计算
// function calculateMove() {
//     let T = 1;
//     setInterval(function () {
//         let fx,fy;
//         if(gEnv.checkItemInHere(boll)){
//             let fs = gEnv.getF(boll);
//             // console.log(fs);
//             fx = fs.x;
//             fy = fs.y;
//         }
//
//         boll.move(fx,fy,T);
//     },T);
// }