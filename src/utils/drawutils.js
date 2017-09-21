/**
 * Created by spacetime on 6/3/17.
 */
class DrawUtils{
    static drawCircle(x,y,r){
        var drawX = DrawUtils.transformRect(x,y).x;
        var drawY = DrawUtils.transformRect(x,y).y;
        DrawUtils.context.beginPath();
        DrawUtils.context.arc(drawX,drawY,r,
                            0,Math.PI*2,true);
        DrawUtils.context.stroke();
    }

    static transformRect(x,y) {
        return {
            x:x,
            y:DrawUtils.height - y
        }
    }

    static setCanvas(canvas){
        DrawUtils.context = canvas.getContext("2d");
        DrawUtils.canvas = canvas;
        DrawUtils.width = canvas.width;
        DrawUtils.height = canvas.height;
    }
}

module.exports = DrawUtils;