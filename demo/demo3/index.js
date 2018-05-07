const displayBoll = () => {

};

const display = () => {
    // clear();
    displayBoll();
    displayTrack();
};

const update = (timeInterval) => {
    const splitCount = 100;
    const splitTime = timeInterval/splitCount;

    for (let i = 0; i < splitCount; i ++){
        for (let boll of bolls) {
            let fx = 0;
            let fy = 0;
            boll.track.push({x:boll.x, y:boll.y});
            for (let b of bolls) {
                if (b != boll) {
                    //boll 受到 b 的引力大小,每个球都算了两遍，暂时不优化了
                    let f = calculateGravitation(boll, b);
                    fx += f.x;
                    fy += f.y;
                }
            }
            boll.move(fx, fy, splitTime*1000);
        }
    }
};

const initBolls = () => {
    const count = 3;

    const g3 = Math.sqrt(3);
    const R = 100;
    const v = 8.4;
    const center = {x:500,y:500};
    let configs = [
        {x: center.x - R / 2 * g3, y: center.y - R / 2, vx: - v / 2, vy: v / 2 * g3, color:"red", m:1000},
        {x: center.x             , y: center.y + R / 2, vx: v, vy: 0, color:"green", m:1000},
        {x: center.x + R / 2 * g3, y: center.y - R / 2, vx: - v / 2, vy: -v / 2 * g3, color:"blue", m:1000},
    ];

    for (let i = 0; i < count; i ++) {
        var bollConstrains = {
            m       :configs[i].m,
            x       :configs[i].x,
            y       :configs[i].y,
            vx      :configs[i].vx,
            vy      :configs[i].vy,
            color   :configs[i].color,
            radius  :2,
        };

        var boll = new Item.Boll(bollConstrains);
        boll.track = [];

        bolls.push(boll);
    }

};


const bindEvents = () => {
    let target = null;
    canvas.addEventListener("mousedown", event => {
        let p = getPoint(event);
        for (let b of bolls) {
            if (Utils.CommonUtils.calculateDistance(p.x, p.y, b.x, b.y) <= b.radius) {
                target = b;
            }
        }

    });

    canvas.addEventListener("mousemove", event => {
        if (target) {
            // log("move",event);
            let p = getPoint(event);
            target.x = p.x;
            target.y = p.y;
        }
    });

    canvas.addEventListener("mouseup", event => {
        target = null;
    });

    const getPoint = event => {
        return Utils.DrawUtils.transformRect(event.offsetX, event.offsetY) ;
    };
};

const __main = () => {
    bindEvents();
    initBolls();
    mainLoop();
};

__main();