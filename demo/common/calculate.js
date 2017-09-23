const calculateGravitation = (boll1, boll2) => {
    const G = 10;

    let distance = Utils.CommonUtils.calculateDistance(
        boll1.x,boll1.y,boll2.x,boll2.y);

    let fsum = G * boll1.m * boll2.m/ Math.pow(distance, 2);

    let fx = fsum * (boll2.x - boll1.x)/distance;
    let fy = fsum * (boll2.y - boll1.y)/distance;

    return {
        x:fx,
        y:fy
    };
};