const DrawUtils = require('../utils/utils_entry').DrawUtils;
const Item = require('./item');

class Boll extends Item{
    constructor(ctor){
        super(ctor);
        this.radius = ctor.radius;
        //todo 电荷
    }


    display(){
        DrawUtils.drawCircle(this.x,this.y,this.radius,this.color);
    }


}

module.exports = Boll;