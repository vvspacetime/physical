var canvas  = document.getElementById("board");
var context = canvas.getContext("2d");
Utils.DrawUtils.setCanvas(canvas);
var pause = true;
const log = console.log.bind(console);

const clear = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
};

const mainLoop = () => {
    let fps = 30;
    let timeInterval = 1/fps; //单位 s
    const updateCount = 1; //一次运行30次

    log("main loop");
    setInterval(() => {
        if (!pause) {
            for (let i = 0; i < updateCount; i ++){
                update(timeInterval);
            }
        }
        display();
    }, timeInterval*1000);
};


window.addEventListener('keydown', event => {
    if (event.key == "p") {
        pause = !pause;
    }
});