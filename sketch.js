const r = require('raylib');
const s = require('./scanner')
const p = require('./particle')

function running() {
    return !r.WindowShouldClose();
}

function setup(window) {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(window.width, window.height, window.title);
    r.SetTargetFPS(window.FPS);

    const data = {};

    data.s1 = s.createScanner(0, 0, r.GetScreenWidth() / 8, r.GetScreenHeight(), 1, r.WHITE);
    data.s1.lower = 0;
    data.s1.upper = r.GetScreenWidth() / 2 - data.s1.width;

    data.s2 = s.createScanner(r.GetScreenWidth() / 2, 0, 20, r.GetScreenHeight(), 3, r.WHITE);
    data.s2.lower = r.GetScreenWidth() / 2;
    data.s2.upper = r.GetScreenWidth() - data.s2.width;

    data.s3 = s.createScanner(0, 0, r.GetScreenWidth(), 80, 3, r.WHITE);
    data.s3.lower = 0;
    data.s3.upper = r.GetScreenHeight() - data.s3.height;

    data.p1 = p.createParticle(300, 0, 100, r.GetScreenHeight(), r.SKYBLUE);
    data.p2 = p.createParticle(550, 0, 10, r.GetScreenHeight(), r.SKYBLUE);
    data.p3 = p.createParticle(0, r.GetScreenHeight() / 2, r.GetScreenWidth(), 100, r.SKYBLUE);

    return data;
}

function update(data) {
    s.updateHorzintalScanner(data.s1, data.p1, data.p2);
    s.updateHorzintalScanner(data.s2, data.p1, data.p2);
    s.verticalScanner(data.s3, data.p3);
}

function draw(data) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    p.draw(data.p1);
    p.draw(data.p2);
    p.draw(data.p3);

    s.draw(data.s1);
    s.draw(data.s2);
    s.draw(data.s3);

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