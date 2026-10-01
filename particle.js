const r = require('raylib')
function createParticle(x, y, width, height) {
    return {
        x: x,
        y: y,
        width: width,
        height: height,
    }

}

function draw(d) {
    r.DrawRectangle(d.x, d.y, d.width, d.height, d.color)

}

module.exports = {
    createParticle,
    draw,
}