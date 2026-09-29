const r = require('raylib');
const geometry = require('./geometry')
const p1 = require('./particle1')
const p2 = require('./particle2')
const vP = require('./verticalParticle')
const s1 = require('./scanner1')
const s2 = require('./scanner2')
const vS = require('./verticalScanner')

const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 500;
const TITLE = "Particle Detector";
const FPS = 50;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WINDOW_WIDTH, WINDOW_HEIGHT, TITLE);
    r.SetTargetFPS(FPS);
}

function colorSelector(scannerStart, scannerEnd, particle1Start, particle1End, particle2Start, particle2End) {
    let isOverlapping = geometry.hasOverlaped(scannerStart, scannerEnd, particle1Start, particle1End, particle2Start, particle2End);
    let color = isOverlapping ? r.ColorAlpha(r.RED, 0.7) : r.WHITE;
    return color
}

function updateScanner3() {

    const verticalScannerEnd = vS.posY + vS.height
    const verticalParticleEnd = vP.posY + vP.height

    vS.velocity = geometry.getNewVelocity(vS.posY, vS.maxPos, vS.minPos, vS.height, vS.velocity);
    vS.posY = geometry.calcNextPosition(vS.posY, vS.velocity);
    vS.color = colorSelector(vS.posY, verticalScannerEnd, vP.posY, verticalParticleEnd);

}

function updateScanner2() {
    const secondParticleEnd = p2.posX + p2.width;
    const scanner2End = s2.posX + s2.width;
    const firstParticleEnd = p1.posX + p1.width;

    s2.velocity = geometry.getNewVelocity(s2.posX, s2.maxPos, s2.minPos, s2.width, s2.velocity);
    s2.posX = geometry.calcNextPosition(s2.posX, s2.velocity);
    s2.color = colorSelector(s2.posX, scanner2End, p1.posX, firstParticleEnd, p2.posX, secondParticleEnd);
}

function updateScanner1() {

    const secondParticleEnd = p2.posX + p2.width;
    const scanner1End = s1.posX + s1.width;
    const firstParticleEnd = p1.posX + p1.width;

    s1.velocity = geometry.getNewVelocity(s1.posX, s1.maxPos, s1.minPos, s1.width, s1.velocity);
    s1.posX = geometry.calcNextPosition(s1.posX, s1.velocity);
    s1.color = colorSelector(s1.posX, scanner1End, p1.posX, firstParticleEnd, p2.posX, secondParticleEnd);
}

function updateScanners() {
    updateScanner1();
    updateScanner2();
    updateScanner3();
}


function update() {
    updateScanners();
}

function drawScanner() {
    r.DrawRectangle(s1.posX, 0, s1.width, s1.height, s1.color);
    r.DrawRectangle(s2.posX, 0, s2.width, s2.height, s2.color);
    r.DrawRectangle(0, vS.posY, WINDOW_WIDTH, vS.height, vS.color);
}

function drawParticles() {
    const color = r.SKYBLUE;
    r.DrawRectangle(p1.posX, 0, p1.width, p1.height, color);
    r.DrawRectangle(p2.posX, 0, p2.width, p2.height, color);
    r.DrawRectangle(0, vP.posY, WINDOW_WIDTH, vP.height, color);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawParticles();
    drawScanner();

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