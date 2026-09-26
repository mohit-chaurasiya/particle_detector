let flag = 1;

function checkCollide(pos, max, min) {
    return (pos <= max && flag === 1) || pos === min ? flag = 1 : flag = 0;
}

module.exports = {
    checkCollide,

}