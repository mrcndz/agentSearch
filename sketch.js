var world;
var goal;

function setup() {
  frameRate(60);
  createCanvas(1200, 660);
  setupGui();
  world = new World(25);
}

function draw() {
  background(220);
  world.draw();
  runButtons(world);
  // btStartCt = "Stop";
}