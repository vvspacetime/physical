const Environment = require('./environment');
const CommonUtils = require('../utils/utils_entry').CommonUtils;
const DrawUtils = require('../utils/utils_entry').DrawUtils;

const G = 10;
// const G = 6.67259*Math.pow(10,-11);
class Gravitation extends Environment{
    constructor(x,y,m){
        super();
        this.x = x;
        this.y = y;
        this.m = m;
    }

    getF(item){
        let distance = CommonUtils.calculateDistance(
            item.x,item.y,this.x,this.y);

        let fsum = G*this.m*item.m/(distance*distance);

        let fx = fsum * (this.x-item.x)/distance;
        let fy = fsum * (this.y-item.y)/distance;

        return {
            x:fx,
            y:fy
        }
    }

    checkItemInHere(item){
        return true;
    }


    display(){
        DrawUtils.drawCircle(this.x,this.y,10);
    }
}

module.exports = Gravitation;