class World {
  constructor(size) {
    this.size = size;
    this.ni = width / size;
    this.nj = (height - GUISIZE) / size;
    this.n = width / size;
    this.cells = [];
    this.createCells();
    this.isRunning = false;

    this.agent = new Agent(this.cells);
  }

  draw(){
    // Draw cells
    for (let i = 0; i < this.ni; i++) {
      for (let j = 0; j < this.nj; j++) {
        this.cells[i][j].draw();
      }
    }

    // Draw Agent
    this.agent.draw();
  }

  createCells() {
    this.cells = new Array(this.ni);

    let sChance = 6;
    let wChance = 3;
    let qChance = 3;
    let oChance = 1;
    let sum = sChance + wChance + qChance + oChance;


    for (let i = 0; i < this.ni; i++) {
      this.cells[i] = new Array(this.nj);

      for (let j = 0; j < this.nj; j++) {
        let x = i * this.size;
        let y = j * this.size + GUISIZE;
        let newType = "";

        oChance = oChance + (this.cellsAroundType(i, j, "obstacle"))/1000 * isEnableBtS.isSelected;

        if(!isEnableBtO.isSelected) oChance = 0;
        if(!isEnableBtS.isSelected) sChance = 0;
        if(!isEnableBtW.isSelected) wChance = 0;
        if(!isEnableBtQ.isSelected) qChance = 0;

        sum = sChance + wChance + qChance + oChance;
        let n = random(sum);

          if(n <= sChance){
            newType = "sand";
          }
          if(n > sChance && n <= sChance + wChance){
            newType = "water";
          }
          if(n > sChance + wChance && n <= sChance + wChance + qChance){
            newType = "quagmire";
          }
          if(n > sChance + wChance + qChance){
            newType = "obstacle";
          }

        if(i == 0 || j == 0 || i == this.ni - 1 || j == this.nj - 1) newType = "obstacle"; // Map borders

        this.cells[i][j] = new Cell(x, y, this.size, newType);
      }
    }
  }

  cellsAroundType(i, j, type) {
    let count = 1;


    if (i - 1 >= 0)
      if(this.cells[i - 1][j].type == type)
        count++;

    if (j - 1 >= 0)
      if(this.cells[i][j - 1].type == type)
        count++;

    if (i + 1 > this.ni)
      if(this.cells[i + 1][j].type == type)
        count++;

    if (j + 1 > this.nj)
      if(this.cells[i][j + 1].type == type)
        count++;

    if(j + 1 > this.nj && i + 1 > this.ni)
      if(this.cells[i + 1][j + 1].type == type)
        count++;

    if(j - 1 >= 0 && i - 1 >= 0)
      if(this.cells[i - 1][j - 1].type == type)
        count++;

    if(j + 1 > this.nj && i - 1 >= 0)
      if(this.cells[i - 1][j + 1].type == type)
        count++;

    if(j - 1 >= 0 && i + 1 > this.ni)
      if(this.cells[i + 1][j - 1].type == type)
        count++;

    return count;
  }

  applyType(type) {
    for (let i = 0; i < this.ni; i++)
      for (let j = 0; j < this.nj; j++) 
        if(this.agent.i == i && this.agent.j == j) continue;
        else this.cells[i][j].applyType(type);
  }

  unsetSelected() {
    for (let i = 0; i < this.ni; i++)
      for (let j = 0; j < this.nj; j++)
        if (this.cells[i][j].isSelected) this.cells[i][j].unsetSelected();
  }
}
