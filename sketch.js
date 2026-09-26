const r = require('raylib');
const geometry = require('./geometry')

const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 500;
const TITLE = "Particle Detector";
const FPS = 50;

const HORIZONTAL_SCANNER_WIDTH = WINDOW_WIDTH / 20;
const HORIZONTAL_SCANNER_HEIGHT = WINDOW_HEIGHT;

const FIRST_PARTICLE_WIDTH = WINDOW_WIDTH / 8;
const FIRST_PARTICLE_HEIGHT = WINDOW_HEIGHT;
const FIRST_PARTICLE_X = 100;
const FIRST_PARTICLE_Y = 0;

const SECOND_PARTICLE_WIDTH = 5;
const SECOND_PARTICLE_HEIGHT = WINDOW_HEIGHT;
const SECOND_PARTICLE_X = 450
const SECOND_PARTICLE_Y = FIRST_PARTICLE_Y;

const VERTICAL_PARTICAL_X = 0;
const VERTICAL_PARTICAL_Y = WINDOW_HEIGHT / 2
const VERTICAL_PARTICAL_HEIGHT = WINDOW_HEIGHT / 10;

const VERTICAL_SCANNER_HEIGHT = WINDOW_HEIGHT / 20;

const speedForLeftScanner = 1;
const speedForRightScanner = 5;
const speedForVerticalScanner = 1;

const LEFT_CHECK = 1;
const RIGHT_CHECK = 2;
const VERTICAL_CHECK = 3;


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
let maxPosForLeft = WINDOW_WIDTH / 2 - HORIZONTAL_SCANNER_WIDTH;
let minPosForLeft = 0

let rightScannerX = WINDOW_WIDTH / 2;
let rightScannerY = 0;
let rightColor = r.WHITE;
let maxPosForRight = WINDOW_WIDTH - HORIZONTAL_SCANNER_WIDTH;
let minPosForRight = WINDOW_WIDTH / 2;

let verticalScannerY = 0;
let verticalColor = r.WHITE;
let maxPosForVertical = WINDOW_HEIGHT - WINDOW_HEIGHT / 20;


function update() {
    const leftScannerRange = leftScannerX + HORIZONTAL_SCANNER_WIDTH;
    const rightScannerRange = rightScannerX + HORIZONTAL_SCANNER_WIDTH;
    const particleRange = FIRST_PARTICLE_X + FIRST_PARTICLE_WIDTH;
    const secondParticleRange = SECOND_PARTICLE_X + SECOND_PARTICLE_WIDTH;
    const verticalScannerRange = verticalScannerY + VERTICAL_SCANNER_HEIGHT
    const verticalParticleRange = VERTICAL_PARTICAL_Y + VERTICAL_PARTICAL_HEIGHT

    leftScannerX += (geometry.checkCollision(leftScannerX, maxPosForLeft, minPosForLeft, LEFT_CHECK)) ? speedForLeftScanner : -(speedForLeftScanner);
    rightScannerX += (geometry.checkCollision(rightScannerX, maxPosForRight, minPosForRight, RIGHT_CHECK)) ? speedForRightScanner : -(speedForRightScanner);
    verticalScannerY += (geometry.checkCollision(verticalScannerY, maxPosForVertical, 0, VERTICAL_CHECK)) ? speedForVerticalScanner : -(speedForVerticalScanner);


    // leftColor = geometry.checkOverlap(leftScannerRange, leftScannerX, particleRange, FIRST_PARTICLE_X) ? r.ColorAlpha(r.RED, 0.7) : r.WHITE;
    leftColor = geometry.checkOverlap(particleRange, FIRST_PARTICLE_X, leftScannerRange, leftScannerX) ? r.ColorAlpha(r.RED, 0.7) : r.WHITE;
    rightColor = (geometry.checkOverlap(rightScannerRange, rightScannerX, secondParticleRange, SECOND_PARTICLE_X)) ? r.ColorAlpha(r.RED, 0.7) : r.WHITE;
    // rightColor = (geometry.checkOverlap(rightScannerRange, rightScannerX, secondParticleRange, SECOND_PARTICLE_X)) ? r.ColorAlpha(r.RED, 0.7) : r.WHITE;
    verticalColor = (geometry.checkOverlap(verticalScannerRange, verticalScannerY, verticalParticleRange, VERTICAL_PARTICAL_Y)) ? r.ColorAlpha(r.RED, 0.7) : r.WHITE;
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
    drawParticles(VERTICAL_PARTICAL_X, VERTICAL_PARTICAL_Y, WINDOW_WIDTH, VERTICAL_PARTICAL_HEIGHT);

    drawScanner(leftScannerX, leftScannerY, HORIZONTAL_SCANNER_WIDTH, HORIZONTAL_SCANNER_HEIGHT, leftColor);
    drawScanner(rightScannerX, rightScannerY, HORIZONTAL_SCANNER_WIDTH, HORIZONTAL_SCANNER_HEIGHT, rightColor);
    drawScanner(0, verticalScannerY, WINDOW_WIDTH, VERTICAL_SCANNER_HEIGHT, verticalColor);

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