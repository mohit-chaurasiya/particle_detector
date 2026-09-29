
function isOverlap(scannerStart, scannerEnd, particleStart, particleEnd) {
    return (scannerStart < particleEnd && particleStart < scannerEnd)
}


function getNewVelocity(posX, upperBound, lowerBound, width, velocity) {
    let isScannerOut = isScannerOutOfBound(posX, upperBound, lowerBound, width);
    return isScannerOut ? -velocity : velocity;
}

function calcNextPosition(start, velocity) {
    return start + velocity;
}

function isScannerOutOfBound(posX, upperBound, lowerBound) {
    return posX > upperBound || posX < lowerBound;

}
function hasOverlaped(scannerStart, scannerEnd, particle1Start, particle1End, particle2Start, particle2End) {
    console.log(isOverlap(scannerStart, scannerEnd, particle1Start, particle1End))
    return (isOverlap(scannerStart, scannerEnd, particle1Start, particle1End)
        || isOverlap(scannerStart, scannerEnd, particle2Start, particle2End))
}



module.exports = {

    isOverlap,
    calcNextPosition,
    getNewVelocity,
    hasOverlaped,

}