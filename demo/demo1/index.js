const boll1Constrains = {
    m       :10,
    x       :100,
    y       :100,
    vx      :8,
    vy      :0,
    radius  :3
};
const boll2Constrains = {
    m       :10,
    x       :200,
    y       :100,
    vx      :-8,
    vy      :0,
    radius  :3
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

    for (let i = 0; i < splitCount; i ++){
        let fx = 0;
        let fy = 0;

        //碰撞检测
        if (checkBollPong(boll1, boll2)){

        }


        boll1.move(fx, fy, splitTime*1000);
        boll2.move(fx, fy, splitTime*1000);
    }
};

const checkBollPong = (boll1, boll2) => {
    let d = CommonUtils.calculateDistance(boll1.x, boll1.y, boll2.x, boll2.y);
    return (d <= boll1.radius + boll2.radius);
};


const balance = (boll1, boll2) => {
    //非对心碰撞 首先坐标变换到对心坐标系


    //运算，对心方向能量动量守恒，垂直方向速度不变


    //再回到正常坐标系


};

//连接坐标系两点1->2为x轴为正方向，逆时针旋转90度为y轴正方向。
const CoordinateSystem =  (x1, y1, x2, y2) => {
    let c;

    //原坐标系矢量转换为当前坐标系矢量
    c.translate = (v) => {

    };
    //坐标系变换

    //反变换

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

const __main = () => {
    mainLoop();
};

__main();