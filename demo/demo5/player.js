class Player {
    constructor(x, y) {
        this.player = new Item.Boll({
            m: 1,
            x: x,
            y: y,
            vx: 0,
            vy: 0,
            radius: 3,
            color:"red"
        });

        this.status = "sitting";
        this.x;
        this.y;
        this.nowDiscIndex = 0;
        this.nextDiscIndex;
        this.speedX = 0;
        this.speedY = 0;
        this.actionCount = 0;
    }

    display() {
        this.player.display();   
    }

    update(speed) {
        if (this.status == "sitting") {
            this.player.y += speed;
        } else if (this.status == "jumping" ||
                   this.status == "hitting") {
            //todo 优化跳跃
            this.nextDiscIndex = this.nowDiscIndex + 1;
            let nextDisc = discQueue[this.nextDiscIndex];
            let distanceX = nextDisc.x - this.player.x;
            let distanceY = nextDisc.y - this.player.y;


            this.speedX = distanceX / this.actionCount; 
            this.speedY = distanceY / this.actionCount;

            this.player.x += this.speedX;
            this.player.y += this.speedY;
            this.actionCount --;
            
            let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            if (this.actionCount == 1) {
                if (this.status == "jumping") {
                    if (nextDisc.enemy) {
                        this.status = "dying";
                        this.speedX = 0;
                        this.speedY = -5;
                        
                        // pause = true;
                    } else {
                        //加分
                    }
                } else if (this.status == "hitting") {
                    if (nextDisc.enemy) {
                        nextDisc.enemy = null;
                        //加分
                    } else {
                        this.status = "dying";
                        this.speedX *= 3;
                        this.speedY *= 3;
                        // pause = true;
                    }
                }
            }
            
            if (this.actionCount <= 0) {
                    this.nowDiscIndex ++;
                    this.status = "sitting";
            }
        } else if (this.status == "dying") {
            this.player.x += this.speedX;
            this.player.y += this.speedY;
            // this.actionCount --;
            // if (this.actionCount <= 0) {
            //     this.status = "sitting";
            // }
        }
    }

    jump() {
        if (this.status == "sitting") {
            this.status = "jumping";  
            this.actionCount = 30;             
        }
    }

    hit() {
        if (this.status == "sitting") {
            this.status = "hitting";
            this.actionCount = 30;
        }
    }


}