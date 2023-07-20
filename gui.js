// Buttons for terrain
const GUISIZE = 60;

// Button for Start, Generate
var btStart;
var btStartCt;
var btGenerate;
var btGenerateBl;

// Button for find algorithms
var btAlgorithm;
var btAlgorithmChosen;
var btBFS;
var btDFS;
var btAStar;
var btUniformCost;
var btGreedy;

// Button for drawing mode
var btApply;
var btApplyBl;
var typeSelected;
var cellButtonS;
var cellButtonQ;
var cellButtonW;
var cellButtonO;

// Button for disable mode
var isEnableBtS;
var isEnableBtW;
var isEnableBtQ;
var isEnableBtO;

const STYLE_RED = {
  background: "#b711118b",
  color: "#000",
};

const STYLE_GREEN = {
  background: "#1ca817a5",
  color: "#000",
};

const STYLE_BLUE = {
  background: "#290bd18b",
  color: "#FFF",
};

function setupGui() {
  let distance = 5;

  // Botão de começar
  btStartCt = "Start";
  btStart = new Button({
    x: width / 2,
    y: 30,
    width: 40,
    height: 30,
    align_x: 0,
    align_y: 0,
    content: "Start",
    on_press() {
      if (btStartCt == "Start") {
        btStartCt = "Stop";
        btStart.style("default", STYLE_RED);
      } else {
        btStartCt = "Start";
        btStart.style("default", STYLE_GREEN);
      }

      btStart.text(btStartCt);
    },
  });
  btStart.style("default", STYLE_GREEN);

  // Botão de gerar novo terreno
  btGenerateBl = true;
  btGenerate = new Button({
    x: width / 2 - distance - 100,
    y: 30,
    width: 100,
    height: 30,
    align_x: 0,
    align_y: 0,
    content: "New",
    on_press() {
      if (btGenerateBl == true) {
        btGenerateBl = false;
      } else {
        btGenerateBl = true;
      }
    },
  });
  btGenerate.style("default", STYLE_BLUE);
  
  btAlgorithmBl = false;
  btAlgorithm = new Button({
    x: width / 2 + distance + 100,
    y: 30,
    width: 100,
    height: 30,
    align_x: 0,
    align_y: 0,
    content: "Algorithm",
    on_press() {
      if(btAlgorithmBl == true){
        btAlgorithmBl = false;
      } else{
        btAlgorithmBl = true;
      }
    },
  });

  btAlgorithm = new Button({
    x: width / 2 + distance + 100,
    y: 30,
    width: 100,
    height: 30,
    align_x: 0,
    align_y: 0,
    content: "Algorithm",
    on_press() {
      if(btAlgorithmBl == true){
        btAlgorithmBl = false;
      } else{
        btAlgorithmBl = true;
      }
    },
  });

  btBFS = new Button({
    x: width - 60 ,
    y: 15,
    width: 100,
    height: 20,
    align_x: 0,
    align_y: 0,
    content: "BFS",
    on_press() {
      btAlgorithmChosen = "BFS";
      btGreedy.style("default", STYLE_DEFAULT);
      btAStar.style("default", STYLE_DEFAULT);
      btBFS.style("default", STYLE_GREEN);
      btDFS.style("default", STYLE_DEFAULT);
      btUniformCost.style("default", STYLE_DEFAULT);
    },
  });

  btDFS = new Button({
    x: width - 60, 
    y: 45,
    width: 100,
    height: 20,
    align_x: 0,
    align_y: 0,
    content: "DFS",
    on_press() {
      btAlgorithmChosen = "DFS";
      btGreedy.style("default", STYLE_DEFAULT);
      btAStar.style("default", STYLE_DEFAULT);
      btBFS.style("default", STYLE_DEFAULT);
      btDFS.style("default", STYLE_GREEN);
      btUniformCost.style("default", STYLE_DEFAULT);
    },
  });
    
  btAStar = new Button({
    x: width - 110 - 60,
    y: 45,
    width: 100,
    height: 20,
    align_x: 0,
    align_y: 0,
    content: "A*",
    on_press() {
      btAlgorithmChosen = "A*";
      btGreedy.style("default", STYLE_DEFAULT);
      btAStar.style("default", STYLE_GREEN);
      btBFS.style("default", STYLE_DEFAULT);
      btDFS.style("default", STYLE_DEFAULT);
      btUniformCost.style("default", STYLE_DEFAULT);
    },
  });

  btGreedy = new Button({
    x: width - 110 - 60,
    y: 15,
    width: 100,
    height: 20,
    align_x: 0,
    align_y: 0,
    content: "GREEDY",
    on_press() {
      btAlgorithmChosen = "GREEDY";
      btGreedy.style("default", STYLE_GREEN);
      btAStar.style("default", STYLE_DEFAULT);
      btBFS.style("default", STYLE_DEFAULT);
      btDFS.style("default", STYLE_DEFAULT);
      btUniformCost.style("default", STYLE_DEFAULT);

    },
  });

  btUniformCost = new Button({
    x: width - 220 - 60,
    y: 30,
    width: 100,
    height: 20,
    align_x: 0,
    align_y: 0,
    content: "UNIFORM COST",
    on_press() {
      btAlgorithmChosen = "UNIFORM COST";
      btGreedy.style("default", STYLE_DEFAULT);
      btAStar.style("default", STYLE_DEFAULT);
      btBFS.style("default", STYLE_DEFAULT);
      btDFS.style("default", STYLE_DEFAULT);
      btUniformCost.style("default", STYLE_GREEN);
    },
  });

  // Botão de escolha de modo de desenho
  let btCellDist = distance + 30;
  cellButtonS = new Cell(0, 0, 10 + 0 * btCellDist, 15, 30, "sand");
  cellButtonQ = new Cell(0, 0, 10 + 1 * btCellDist, 15, 30, "quagmire");
  cellButtonW = new Cell(0, 0, 10 + 2 * btCellDist, 15, 30, "water");
  cellButtonO = new Cell(0, 0, 10 + 3 * btCellDist, 15, 30, "obstacle");
  typeSelected = "obstacle";
  // Botão de escolha de modo de desenho
  isEnableBtS = new Cell(0, 0, 10 + 4 * btCellDist + 20 , 15, 30, "sand");
  isEnableBtS.strokeColor = "green";
  isEnableBtQ = new Cell(0, 0, 10 + 5 * btCellDist + 20, 15, 30, "quagmire");
  isEnableBtQ.strokeColor = "green";
  isEnableBtW = new Cell(0, 0, 10 + 6 * btCellDist + 20, 15, 30, "water");
  isEnableBtW.strokeColor = "green";
  isEnableBtO = new Cell(0, 0, 10 + 7 * btCellDist + 20, 15, 30, "obstacle");
  isEnableBtO.strokeColor = "green";
  isEnableBtS.cycleSelected();
  isEnableBtO.cycleSelected();
  isEnableBtW.cycleSelected();
  isEnableBtQ.cycleSelected();
}

function runButtons(world) {
  fill("#474747");
  rect(0, 0, width, 60, 0);

  btStart.draw();
  if(world.isRunning){
    world.unsetSelected();
    return;
  } 

  btGenerate.draw();

  cellButtonS.draw();
  cellButtonQ.draw();
  cellButtonW.draw();
  cellButtonO.draw();

  // btAlgorithm.draw();
  btBFS.draw();
  btDFS.draw();
  btAStar.draw();
  btGreedy.draw();
  btUniformCost.draw();

  if (cellButtonS.isPressed) typeSelected = cellButtonS.type;
  cellButtonS.typeSetSelected(typeSelected);
  if (cellButtonQ.isPressed) typeSelected = cellButtonQ.type;
  cellButtonQ.typeSetSelected(typeSelected);
  if (cellButtonW.isPressed) typeSelected = cellButtonW.type;
  cellButtonW.typeSetSelected(typeSelected);
  if (cellButtonO.isPressed) typeSelected = cellButtonO.type;
  cellButtonO.typeSetSelected(typeSelected);

  world.applyType(typeSelected);

  isEnableBtS.draw();
  isEnableBtO.draw();
  isEnableBtQ.draw();
  isEnableBtW.draw();

}
