// Buttons for terrain
const GUISIZE = 60;

// Button for Start, Generate
var btStart;
var btStartCt;
var btGenerate;
var btGenerateBl;

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
  background: '#f00',
  color: '#000',
}

const STYLE_GREEN = {
  background: '#0f0',
  color: '#000',
}

const STYLE_YELLOW = {
  background: '#ff0',
  color: '#000',
}

const STYLE_BLUE = {
  background: '#00f',
  color: '#FFF'
}

function setupGui(){

  let distance = 10;

  // Botão de começar
  btStartCt = 'Start'
  btStart = new Button({
    x: width/2 + distance + 100, y: 30,
    width: 100, height: 50,
    align_x: 0, align_y: 0,
    content: 'Start',
    on_press() {
      if(btStartCt == 'Start'){
        btStartCt = 'Stop';
        btStart.style('default', STYLE_RED);
      }
      else
      {
        btStartCt = 'Start';
        btStart.style('default', STYLE_GREEN);
      }

      btStart.text(btStartCt);
    }
  });
  btStart.style('default', STYLE_GREEN);

  // Botão de escolha de Terreno
    btTerrainBl = false;
    btTerrain = new Button({
      x: width/2 - distance - 100, y: 30,
      width: 100, height: 50,
      align_x: 0, align_y: 0,
      content: 'Terrain',
      on_press() {
        if(btTerrainBl == true){
          btTerrainBl  = false;
          btTerrain.style('default', STYLE_YELLOW);
          btTerrain.text('Terrain')
        }
        else{
          btTerrainBl  = true;
          btTerrain.style('default', STYLE_PRESSED);
          btTerrain.text('Hide')
        }
      }
  });
  btTerrain.style('default', STYLE_YELLOW)

  // Botão de gerar novo terreno
  btGenerateBl = true;
  btGenerate = new Button({
    x: width/2, y: 30,
    width: 100, height: 50,
    align_x: 0, align_y: 0,
    content: 'Generate',
    on_press() {
      if(btGenerateBl == true){
        btGenerateBl = false;
      }
      else{
        btGenerateBl = true;
      }
    }
  });
  btGenerate.style('default', STYLE_BLUE)

  // Botão de escolha de modo de desenho
  let btCellDist = distance + 30;
  cellButtonS = new Cell(10 + 0 * btCellDist, 15, 30, 'sand');
  cellButtonQ = new Cell(10 + 1 * btCellDist, 15, 30, 'quagmire');
  cellButtonW = new Cell(10 + 2 * btCellDist, 15, 30, 'water');
  cellButtonO = new Cell(10 + 3 * btCellDist, 15, 30, 'obstacle');
  typeSelected = 'obstacle';
  
  // Botão de escolha de modo de desenho
  isEnableBtS = new Cell(width - 40 - 0 * btCellDist, 15, 30, 'sand');
  isEnableBtS.strokeColor = "green"
  isEnableBtQ = new Cell(width - 40 - 1 * btCellDist, 15, 30, 'quagmire');
  isEnableBtQ.strokeColor = "green"
  isEnableBtW = new Cell(width - 40 - 2 * btCellDist, 15, 30, 'water');
  isEnableBtW.strokeColor = "green"
  isEnableBtO = new Cell(width - 40 - 3 * btCellDist, 15, 30, 'obstacle');
  isEnableBtO.strokeColor = "green"
  isEnableBtS.cycleSelected();
  isEnableBtO.cycleSelected();
  isEnableBtW.cycleSelected();
  isEnableBtQ.cycleSelected();

}

function runButtons(){
  fill('#474747');
  rect(0, 0, width, 60, 0);

  btStart.draw();
  btGenerate.draw();

  cellButtonS.draw();
  cellButtonQ.draw();
  cellButtonW.draw();
  cellButtonO.draw();
  if(cellButtonS.isPressed)
    typeSelected = cellButtonS.type;
  cellButtonS.typeSetSelected(typeSelected);
  if(cellButtonQ.isPressed)
    typeSelected = cellButtonQ.type;
  cellButtonQ.typeSetSelected(typeSelected);
  if(cellButtonW.isPressed)
    typeSelected = cellButtonW.type;
  cellButtonW.typeSetSelected(typeSelected);
  if(cellButtonO.isPressed)
    typeSelected = cellButtonO.type;
  cellButtonO.typeSetSelected(typeSelected);
  
  grid.applyType(typeSelected);

  isEnableBtS.draw();
  isEnableBtO.draw();
  isEnableBtQ.draw();
  isEnableBtW.draw();
}
