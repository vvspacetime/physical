var canvasTop  = document.getElementById("layer2");
var canvasBottom  = document.getElementById("layer1");
var contextTop = canvasTop.getContext("2d");
var contextBottom = canvasBottom.getContext("2d");

var pause = true;
const log = console.log.bind(console);

const clearTop = () => {
    contextTop.clearRect(0, 0, canvasTop.width, canvasTop.height);
};

const clearBottom = () => {
    contextBottom.clearRect(0, 0, canvasBottom.width, canvas.canvasBottom.height);
};

const mainLoop = () => {
    let fps = 30;
    let timeInterval = 1/fps; //单位 s
    const updateCount = 30; //一次运行30次
    Utils.DrawUtils.setCanvas(canvasTop);

    log("main loop");
    setInterval(() => {
        if (!pause) {
            for (let i = 0; i < updateCount; i ++){
                update(timeInterval);
            }
        }
        display();
    },timeInterval*1000);
};


window.addEventListener('keydown', event => {
    if (event.key == "p") {
        pause = !pause;
    }
});