class Item{
    constructor(ctor){
        this.m          = ctor.m||1;
        this.x          = ctor.x;
        this.y          = ctor.y;
        this.vx         = ctor.vx;
        this.vy         = ctor.vy;
        this.color      = ctor.color || "black";
    }

    move(fx,fy,ms){
        let s = ms/1000;
        let ax = fx/this.m;
        let ay = fy/this.m;

        this.x = this.vx*s + 0.5*ax*s*s + this.x;
        this.y = this.vy*s + 0.5*ay*s*s + this.y;

        this.vx = this.vx + ax*s;
        this.vy = this.vy + ay*s;


        return{
            x:this.x,
            y:this.y
        }
    }

    addProcess(){
        //todo process.update(受力) //位置速度？
    }

    addEnvironment(){
        //todo env.update(受力)
    }

    display(){ //
        //todo
    }
}


module.exports = Item;