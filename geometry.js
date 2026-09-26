let flagRight = 1;
let flagLeft = 1;
let flagVertical = 1

function checkCollision(pos, max, min, check) {
    if (check === 1) {
        return flagLeft = (pos <= max && flagLeft === 1) || pos === min ? 1 : 0;
    }
    if (check === 2) {
        return flagRight = (pos <= max && flagRight === 1) || pos === min ? 1 : 0;
    }
    if (check === 3) {
        return flagVertical = (pos <= max && flagVertical === 1) || pos === min ? 1 : 0;
    }
}

// function checkCollideForLeft(pos, max, min,) {
//     return flagLeft = (pos <= max && flagLeft === 1) || pos === min ? 1 : 0;
// }

// function checkCollideForRight(pos, max, min,) {
//     return flagRight = (pos <= max && flagRight === 1) || pos === min ? 1 : 0;
// }

// function checkCollideForVertical(pos, max, min,) {
//     return flagVertical = (pos <= max && flagVertical === 1) || pos === min ? 1 : 0;
// }
function checkOverlap(range1, scanX, range2, partX) {
    return (range1 > partX && range2 > scanX) ? 1 : 0;
}

module.exports = {
    // checkCollideForRight,
    checkOverlap,
    // checkCollideForLeft,
    // checkCollideForVertical,
    checkCollision

}