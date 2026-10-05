const r = require('raylib')
function createParticle(x, y, width, height, color) {
    return {
        x: x,
        y: y,
        width: width,
        height: height,
        color: color,
    }

}

function draw(p) {
    r.DrawRectangle(p.x, p.y, p.width, p.height, p.color)
}

module.exports = {
    createParticle,
    draw,
}