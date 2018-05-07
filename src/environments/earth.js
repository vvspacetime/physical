const CommonUtils = require('../utils/commonutils');
class Earth extends Environment{
    //摩擦系数，重力系数，场景构成数组
    constructor (ctor) {
        this.path = ctor.path;
        this.fri = ctor.fri;
        this.grav = ctor.grav;
    }

    //重力 & 支撑力
    getF (item, f) {
        let fg = this.grav * item.m;

        //判断是否在路径上
        let path = this.path;
        let center = {x: item.x, y: item.y};
        let line;
        for (let i = 0; i < path.length - 2; i ++){
            let a = path[i];
            let b = path[i + 1];
            let dis = CommonUtils.calculateDistancePointAndLine(center, a, b);
            if (dis <= item.radius) {
                line = {a, b};
                break;
            }
        }

        if (!line) {
            return {x : 0, y : 0};
        }

        //压力 计算路径垂直方向合力为0，导出压力
        let fn;
        
        
        
        let ff = this.fri * fn;

        let fs;

        return fs;
    }

    checkItemInHere(item){
        return true;
    }

    display(){

    }
}