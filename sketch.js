var grid;

function setup() {
  createCanvas(800, 860);
  setupGui();
  grid = new Grid(50);
}

function draw() {
  background(220);
  grid.draw();
  runButtons(grid);
}