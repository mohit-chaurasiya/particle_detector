const r = require('raylib')

function createScanner(x, y, width, height, velocity, color) {
    return {
        x: x,
        y: y,
        height: height,
        width: width,
        velocity: velocity,
        color: color,
    }
}

function draw(s) {
    r.DrawRectangle(s.x, s.y, s.width, s.height, s.color)
}

function isOverlap(start, end, particle_Start, particle_End) {
    return (start < particle_End && particle_Start < end)
}

function hasOverlaped(start, end, particle1Start, particle1Range, particle2Start, particle2Range) {
    const leftRange = isOverlap(start, end, particle1Start, particle1Range)
    const rightRange = isOverlap(start, end, particle2Start, particle2Range)
    return leftRange || rightRange;
}

function isScannerOutOfBound(pos, lower, upper) {
    return pos > upper || pos < lower;
}

function updateVelocity(pos, width, lower, upper, velocity) {
    const isScannerOut = isScannerOutOfBound(pos, lower, upper, width);
    return isScannerOut ? -velocity : velocity;
}

function updatePosition(start, velocity) {
    return start + velocity;
}

function colorSelector(start, end, particle1Start, particle1Range, particle2Start, particle2Range) {
    const isOverlapping = hasOverlaped(start, end, particle1Start, particle1Range, particle2Start, particle2Range);
    const color = isOverlapping ? r.ColorAlpha(r.RED, 0.7) : r.WHITE;
    return color;
}

function updateHorzintalScanner(s, p1, p2) {
    const scanner = s.x + s.width;
    const particle1Range = p1.x + p1.width;
    const particle2Range = p2.x + p2.width;

    s.velocity = updateVelocity(s.x, s.width, s.lower, s.upper, s.velocity);
    s.x = updatePosition(s.x, s.velocity);
    s.color = colorSelector(s.x, scanner, p1.x, particle1Range, p2.x, particle2Range);

    return s;

}

function verticalScanner(s, p) {

    const verticalScannerEnd = s.y + s.height
    const verticalParticleEnd = p.y + p.height

    s.velocity = updateVelocity(s.y, s.height, s.lower, s.upper, s.velocity);
    s.y = updatePosition(s.y, s.velocity);
    s.color = colorSelector(s.y, verticalScannerEnd, p.y, verticalParticleEnd);
    return s;
}

module.exports = {
    draw,
    createScanner,
    updateHorzintalScanner,
    verticalScanner,
}