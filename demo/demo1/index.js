const boll1Constrains = {
    m       :10,
    x       :80,
    y       :90,
    vx      :10,
    vy      :0,
    radius  :10
};
const boll2Constrains = {
    m       :10,
    x       :120,
    y       :105,
    vx      :-10,
    vy      :0,
    radius  :10
};

var boll1 = new Item.Boll(boll1Constrains);
var boll2 = new Item.Boll(boll2Constrains);
var CommonUtils = Utils.CommonUtils;

const displayBoll = () => {
    boll1.display();
    boll2.display();
};

const displayEnvironment = () => {
    // gEnv.display();
};

const display = () => {
    clear();
    displayBoll();
    displayEnvironment();
};

const update = (timeInterval) => {
    //计算小球位置和速度
    //分割，计算，分割数量决定计算精度
    const splitCount = 100;
    const splitTime = timeInterval/splitCount;

    let lastX1 = boll1.x,
        lastY1 = boll1.y,
        lastX2 = boll2.x,
        lastY2 = boll2.y;
    
    for (let i = 0; i < splitCount;){
        let fx = 0;
        let fy = 0;

        //碰撞检测
        if (checkBollPong(boll1, boll2)){
            balance(boll1, boll2);

            boll1.x = lastX1;
            boll1.y = lastY1;
            boll2.x = lastX2;
            boll2.y = lastY2;
            log("速度1", boll1.vx, boll1.vy);
            log("速度2", boll2.vx, boll2.vy);
        }else {
            lastX1 = boll1.x;
            lastY1 = boll1.y;
            lastX2 = boll2.x;
            lastY2 = boll2.y;
        }
        boll1.move(fx, fy, splitTime*1000);
        boll2.move(fx, fy, splitTime*1000);
        i += 1;
    }
};

const checkBollPong = (boll1, boll2) => {
    let d = CommonUtils.calculateDistance(boll1.x, boll1.y, boll2.x, boll2.y);
    return (d <= boll1.radius + boll2.radius);
};


const balance = (boll1, boll2) => {
    //非对心碰撞 首先坐标变换到对心坐标系
    let cs = CoordinateSystem(boll1.x, boll1.y, boll2.x, boll2.y);

    let v1 = Vector(boll1.vx, boll1.vy);
    let v2 = Vector(boll2.vx, boll2.vy);
    let _v1 = cs.translate(v1);
    let _v2 = cs.translate(v2);

    //运算，对心方向能量动量守恒，垂直方向速度不变
    let result = calculatePerfectPong(boll1.m, boll2.m, _v1.x, _v2.x);
    let __v1 = Vector(result[0], _v1.y);
    let __v2 = Vector(result[1], _v2.y);

    //再回到正常坐标系
    let v1n = cs.reverseTranslate(__v1);
    let v2n = cs.reverseTranslate(__v2);
    boll1.vx = v1n.x;
    boll1.vy = v1n.y;

    boll2.vx = v2n.x;
    boll2.vy = v2n.y;
};

//连接坐标系两点1->2为x轴为正方向，逆时针旋转90度为y轴正方向。
const CoordinateSystem =  (x1, y1, x2, y2) => {
    let c = {};
    let pi = Math.PI;
    let v = Vector((x2-x1),(y2-y1));
    let angle = Math.atan(Math.abs(v.x / v.y)); //与y负轴夹脚
    //todo bug 与x轴夹脚很小的时候
    if (v.x > 0 && v.y > 0) {
        angle = pi - angle;
    }else if(v.x < 0 && v.y > 0) {
        angle = angle + pi;
    }else if(v.x < 0 && v.y < 0) {
        angle = angle + 3 * pi / 2;
    }else if(v.x > 0 && v.y < 0) {
        angle = angle;
    }
    c.angle = angle;
    let ap =  angle / 2 / pi * 360;
    log("碰撞角度", ap);
    let sinA = Math.sin(angle);
    let cosA = Math.cos(angle);

    //原坐标系矢量转换为当前坐标系矢量
    c.translate = (v) => {
        let x = v.x * sinA - v.y * cosA;
        let y = v.x * cosA + v.y * sinA;
        return Vector(x, y);
    };

    //反变换
    c.reverseTranslate = (v) => {
        let x = v.x * sinA + v.y * cosA;
        let y = -v.x * cosA + v.y * sinA;
        return Vector(x, y);
    };

    return c;
};

const Vector = (x,y) => {
    let v = {
        x:x,
        y:y,
    };
    return v;
};

const Coordinate = (x,y) => {
    let c = {
        x:x,
        y:y,
    };
    return c;
};

const calculatePerfectPong = (m1,m2,v1,v2) => {
    let _v1 = ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2);
    let _v2 = ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2);
    return [_v1,_v2];
};


const bindEvents = () => {
    let target = null;
    canvas.addEventListener("mousedown", event => {
        let p = getPoint(event);
        if (Utils.CommonUtils.calculateDistance(p.x, p.y, boll1.x, boll1.y) <= boll1.radius){
            target = boll1;
            log("g");
        }else {

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
    mainLoop();
};

__main();