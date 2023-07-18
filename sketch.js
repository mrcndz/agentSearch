var world;
var agent;
var goal;

function setup() {
  createCanvas(1200, 660);
  setupGui();
  world = new World(25);
}

function draw() {
  background(220);
  world.draw();
  runButtons(world, agent);
}

function drawWorld(){
  world.draw();
  runButtons(world, agent);
}