let flag = 1;

function checkCollide(pos, max, min) {
    return flag = (pos <= max && flag === 1) || pos === min ? 1 : 0;
}

function checkOverlap(range1, scanX, range2, partX) {
    return (range1 > partX && range2 > scanX) ? 1 : 0;
}


module.exports = {
    checkCollide,
    checkOverlap,

}