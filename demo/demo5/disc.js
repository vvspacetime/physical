class Disc {
    constructor(x, y, hasEnemy=true) {
        this.x = x;
        this.y = y;
        this.disc = new Item.Boll({
            m: 1,
            x: x,
            y: y,
            vx: 0,
            vy: 0,
            radius: 20,
        })

        if (Math.random() < 0.5 && hasEnemy) {
            this.enemy = new Item.Boll({
                m: 1,
                x: x,
                y: y,
                vx: 0,
                vy: 0,
                radius: 2,
            });
        } 
    }

    move(speed) {
        if (this.disc) {
            this.disc.y += speed;
            this.y = this.disc.y;
        } 

        if (this.enemy) {
            this.enemy.y += speed;
        }
    }

    display() {
        this.displayBoll(this.disc);
        this.displayBoll(this.enemy);
    }

    displayBoll(boll) {
        if (boll &&
            boll.y > -1 &&
            boll.y < 450) {
            boll.display();
        }
    }
}