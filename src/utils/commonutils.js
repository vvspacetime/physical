/**
 * Created by spacetime on 6/3/17.
 */
class CommonUtils{

    static calculateDistance(x1,y1,x2,y2){
        return Math.sqrt(
            (x2-x1)*(x2-x1) +
            (y2-y1)*(y2-y1)
        );
    }
}

module.exports = CommonUtils;