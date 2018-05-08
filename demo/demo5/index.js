let speed = - 0.3;

const discQueue = [];

const randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}

const initDisc = (num) => {
    for (let i = 0; i < num; i ++) {
        let randomX;
        let randomY;
        let disc;

        if (i > 0) {
            lastY = discQueue[i - 1].y;
            randomY = lastY + randomNumber(50, 80);
            randomX = randomNumber(20, 180);
            disc = new Disc(randomX, randomY);
        } else {
            randomX = 100;
            randomY = 20;
            disc = new Disc(randomX, randomY, false);
        }
        discQueue.push(disc);
        console.log(randomX, randomY);
    }
};

initDisc(10);

const displayDisc = () => {
    for (let i = 0; i < discQueue.length; i ++) {
        let disc = discQueue[i];
        disc.display();
    }
}

const player = new Player(100, 20);

const display = () => {
    clear();
    displayDisc();
    player.display();
}

displayDisc();

const update = () => {
    console.log("update");
    for (let i = 0; i < discQueue.length; i ++) {
        let disc = discQueue[i];
        disc.move(speed);
    }
    player.update(speed);
}

const __main__ = () => {
    mainLoop();
};

window.addEventListener('keydown', event => {
    if (event.key == "j") {
        player.jump();
    }
    if (event.key == "h") {
        player.hit();
    }
});

__main__();
