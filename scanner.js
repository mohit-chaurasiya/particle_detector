const r = require('raylib')

function isOverlap(scannerStart, scannerEnd, particleStart, particleEnd) {
    return (scannerStart < particleEnd && particleStart < scannerEnd)
}

function getNewVelocity(posX, width, lower, upper, velocity) {
    let isScannerOut = isScannerOutOfBound(posX, lower, upper, width);
    return isScannerOut ? -velocity : velocity;
}

function updatePosition(start, velocity) {
    return start + velocity;
}

function isScannerOutOfBound(posX, lower, upper) {
    return posX > upper || posX < lower;
}

function hasOverlaped(scannerStart, scannerEnd, particle1Start, particle1End, particle2Start, particle2End) {
    const leftRange = isOverlap(scannerStart, scannerEnd, particle1Start, particle1End)
    const rightRange = isOverlap(scannerStart, scannerEnd, particle2Start, particle2End)
    return leftRange || rightRange;
}

function colorSelector(scannerStart, scannerEnd, particle1Start, particle1End, particle2Start, particle2End) {
    let isOverlapping = hasOverlaped(scannerStart, scannerEnd, particle1Start, particle1End, particle2Start, particle2End);
    let color = isOverlapping ? r.ColorAlpha(r.RED, 0.7) : r.WHITE;
    return color
}


function updateHorzintalScanner(d, p, p2) {
    const scanner = d.x + d.width;
    const firstParticleEnd = p.x + p.width;
    const secondParticleEnd = p2.x + p2.width;

    d.velocity = getNewVelocity(d.x, d.width, d.lower, d.upper, d.velocity);
    d.x = updatePosition(d.x, d.velocity);
    d.color = colorSelector(d.x, scanner, p.x, firstParticleEnd, p2.x, secondParticleEnd);

    return d;

}

function verticalScanner(d, p) {

    const verticalScannerEnd = d.y + d.height
    const verticalParticleEnd = p.y + p.height

    d.velocity = getNewVelocity(d.y, d.height, d.lower, d.upper, d.velocity);
    d.y = updatePosition(d.y, d.velocity);
    d.color = colorSelector(d.y, verticalScannerEnd, p.y, verticalParticleEnd);
    return d;
}

function draw(d) {
    r.DrawRectangle(d.x, d.y, d.width, d.height, d.color)

}


function createScanner(x, y, width, height) {
    return {
        x: x,
        y: y,
        height: height,
        width: width,
    }

}

module.exports = {
    createScanner,
    updateHorzintalScanner,
    verticalScanner,
    draw,
}