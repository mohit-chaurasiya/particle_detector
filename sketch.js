const r = require('raylib');
const s = require('./scanner')
const p = require('./particle')


function running() {
    return !r.WindowShouldClose();
}

function setup(WINDOW_WIDTH, WINDOW_HEIGHT, TITLE, FPS) {
    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(WINDOW_WIDTH, WINDOW_HEIGHT, TITLE);
    r.SetTargetFPS(FPS);

    const world = {}

    world.s1 = s.createScanner(0, 0, r.GetScreenWidth() / 8, r.GetScreenHeight());
    world.s1.velocity = 1;
    world.s1.lower = 0;
    world.s1.upper = r.GetScreenWidth() / 2 - world.s1.width;
    world.s1.color = r.WHITE;

    world.s2 = s.createScanner(r.GetScreenWidth() / 2, 0, 20, r.GetScreenHeight());
    world.s2.velocity = 3;
    world.s2.lower = r.GetScreenWidth() / 2;
    world.s2.upper = r.GetScreenWidth() - world.s2.width;
    world.s2.color = r.WHITE;

    world.s3 = s.createScanner(0, 0, r.GetScreenWidth(), 80);
    world.s3.velocity = 3;
    world.s3.lower = 0;
    world.s3.upper = r.GetScreenHeight() - world.s3.height;
    world.s3.color = r.WHITE;


    world.p1 = p.createParticle(300, 0, 100, r.GetScreenHeight())
    world.p1.color = r.SKYBLUE

    world.p2 = p.createParticle(550, 0, 10, r.GetScreenHeight(),)
    world.p2.color = r.SKYBLUE

    world.p3 = p.createParticle(0, r.GetScreenHeight() / 2, r.GetScreenWidth(), 100)
    world.p3.color = r.SKYBLUE



    return world;

}

function update(world) {
    s.updateHorzintalScanner(world.s1, world.p1, world.p2);
    s.updateHorzintalScanner(world.s2, world.p1, world.p2);
    s.verticalScanner(world.s3, world.p3);
}


function draw(world) {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    p.draw(world.p1);
    p.draw(world.p2);
    p.draw(world.p3);

    s.draw(world.s1);
    s.draw(world.s2);
    s.draw(world.s3);

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