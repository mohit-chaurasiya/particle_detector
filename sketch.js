const r = require('raylib');

const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 700;
const TITLE = "RAYLIB-TEMPLATE";
const FPS = 50;

function running() {
    return !r.WindowShouldClose();
}


function setup() {
    r.InitWindow(WINDOW_WIDTH, WINDOW_HEIGHT, TITLE);
    r.SetTargetFPS(FPS);
}

function update() {

}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.WHITE);
    // write code from here


    // code end
    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};