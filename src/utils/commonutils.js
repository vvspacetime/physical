/**
 * Created by spacetime on 6/3/17.
 */
class CommonUtils{

    //计算点和点之间的距离
    static calculateDistance(x1,y1,x2,y2){
        return Math.sqrt(
            (x2-x1)*(x2-x1) +
            (y2-y1)*(y2-y1)
        );
    }


    static calculateDistancePointAndPoint(pa, pb){
        return this.calculateDistance(pa.x, pa.y, pb.x, pb.y);
    }

    //计算点和直线之间的距离
    static calculateDistancePointAndLine(p, pa, pb) {
        // let pa= this.calculateDistancePointAndPoint(p, pa);
        // let pb= this.calculateDistancePointAndPoint(p, pb);
        // let ab= this.calculateDistancePointAndPoint(pa, pb);
        // if (pa * pa >= pb * pb + ab * ab) return pb;
        // if (pb * pb >= pa * pa + ab * ab) return b;
        // let p = (pa + pb + ab) / 2;
        // let s = Math.sqrt(p * (p - pa) * (p - pb) * (p - ab));  //海伦公式求面积
        // return 2 * s / ab;
    }
}

module.exports = CommonUtils;