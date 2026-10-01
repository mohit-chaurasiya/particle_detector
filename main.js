const sketch = require("./sketch");

function loop(world) {
    while (sketch.running()) {
        sketch.update(world);
        sketch.draw(world);
    }
}

function main() {
    const world = sketch.setup(800, 500, "Partical Detector", 50);
    loop(world);
    sketch.teardown();
}

main();