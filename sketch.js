const r = require('raylib');
const geometry = require('./geometry')

const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 500;
const TITLE = "Particle Detector";
const FPS = 50;

const SCANNER_WIDTH = WINDOW_WIDTH / 20;
const SCANNER_HEIGHT = WINDOW_HEIGHT;

const PARTICLE_WIDTH = WINDOW_WIDTH / 8;
const PARTICLE_HEIGHT = WINDOW_HEIGHT;
const PARTICLE_X = WINDOW_WIDTH / 2 - PARTICLE_WIDTH;
const PARTICLE_Y = 0;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(WINDOW_WIDTH, WINDOW_HEIGHT, TITLE);
    r.SetTargetFPS(FPS);
}

let scannerX = 0;
let scannerY = 0;
let color;
let maxPos = WINDOW_WIDTH - SCANNER_WIDTH;
let minPos = 0


function update() {

    const scannerRange = scannerX + SCANNER_WIDTH;
    const particleRange = PARTICLE_X + PARTICLE_WIDTH

    scannerX += (geometry.checkCollide(scannerX, maxPos, minPos)) ? 5 : -5;
    color = geometry.checkOverlap(scannerRange, scannerX, particleRange, PARTICLE_X) ? r.RED : r.WHITE;

}

function drawScanner() {
    r.DrawRectangle(scannerX, scannerY, SCANNER_WIDTH, SCANNER_HEIGHT, color)
}

function drawParticles(posX, posY, width, height) {
    r.DrawRectangle(posX, posY, width, height, r.BLUE);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    // write code from here

    drawParticles(PARTICLE_X, PARTICLE_Y, PARTICLE_WIDTH, PARTICLE_HEIGHT);
    drawScanner();



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