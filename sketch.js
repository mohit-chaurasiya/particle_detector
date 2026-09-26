const r = require('raylib');
const geometry = require('./geometry')

const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 500;
const TITLE = "Particle Detector";
const FPS = 50;

const SCANNER_WIDTH = WINDOW_WIDTH / 20;
const SCANNER_HEIGHT = WINDOW_HEIGHT;

const FIRST_PARTICLE_WIDTH = WINDOW_WIDTH / 8;
const FIRST_PARTICLE_HEIGHT = WINDOW_HEIGHT;
const FIRST_PARTICLE_X = WINDOW_WIDTH / 2 - FIRST_PARTICLE_WIDTH;
const FIRST_PARTICLE_Y = 0;

const SECOND_PARTICLE_WIDTH = 5;
const SECOND_PARTICLE_HEIGHT = WINDOW_HEIGHT;
const SECOND_PARTICLE_X = FIRST_PARTICLE_X + 300;
const SECOND_PARTICLE_Y = FIRST_PARTICLE_Y;

const speedForLeftScanner = 1;
const speedForRightScanner = 5;


function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(WINDOW_WIDTH, WINDOW_HEIGHT, TITLE);
    r.SetTargetFPS(FPS);
}

let leftScannerX = 0;
let leftScannerY = 0;
let leftColor = r.WHITE;
let maxPosForLeft = FIRST_PARTICLE_X + FIRST_PARTICLE_WIDTH - SCANNER_WIDTH;
let minPosForLeft = 0
let rightScannerX = FIRST_PARTICLE_X + FIRST_PARTICLE_WIDTH;
let rightScannerY = 0;
let rightColor = r.WHITE;
let maxPosForRight = WINDOW_WIDTH - SCANNER_WIDTH;
let minPosForRight = FIRST_PARTICLE_X + FIRST_PARTICLE_WIDTH



function update() {
    const leftScannerRange = leftScannerX + SCANNER_WIDTH;
    const rightScannerRange = rightScannerX + SCANNER_WIDTH;
    const particleRange = FIRST_PARTICLE_X + FIRST_PARTICLE_WIDTH;
    const secondParticleRange = SECOND_PARTICLE_X + SECOND_PARTICLE_WIDTH;

    leftScannerX += (geometry.checkCollideForLeft(leftScannerX, maxPosForLeft, minPosForLeft)) ? speedForLeftScanner : -(speedForLeftScanner);
    rightScannerX += (geometry.checkCollideForRight(rightScannerX, maxPosForRight, minPosForRight)) ? speedForRightScanner : -(speedForRightScanner);
    // leftColor = geometry.checkOverlap(leftScannerRange, leftScannerX, particleRange, FIRST_PARTICLE_X) ? r.ColorAlpha(r.RED, 0.7) : r.WHITE;
    leftColor = geometry.checkOverlap(particleRange, FIRST_PARTICLE_X, leftScannerRange, leftScannerX) ? r.ColorAlpha(r.RED, 0.7) : r.WHITE;
    // rightColor = (geometry.checkOverlap(rightScannerRange, rightScannerX, secondParticleRange, SECOND_PARTICLE_X)) ? r.ColorAlpha(r.RED, 0.7) : r.WHITE;
    rightColor = (geometry.checkOverlap(rightScannerRange, rightScannerX, secondParticleRange, SECOND_PARTICLE_X)) ? r.ColorAlpha(r.RED, 0.7) : r.WHITE;



}

function drawScanner(posX, posY, width, height, color) {
    r.DrawRectangle(posX, posY, width, height, color);
}

function drawParticles(posX, posY, width, height) {
    r.DrawRectangle(posX, posY, width, height, r.SKYBLUE);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    // write code from here

    drawParticles(FIRST_PARTICLE_X, FIRST_PARTICLE_Y, FIRST_PARTICLE_WIDTH, FIRST_PARTICLE_HEIGHT);
    drawParticles(SECOND_PARTICLE_X, SECOND_PARTICLE_Y, SECOND_PARTICLE_WIDTH, SECOND_PARTICLE_HEIGHT);
    drawScanner(leftScannerX, leftScannerY, SCANNER_WIDTH, SCANNER_HEIGHT, leftColor);
    drawScanner(rightScannerX, rightScannerY, SCANNER_WIDTH, SCANNER_HEIGHT, rightColor);

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