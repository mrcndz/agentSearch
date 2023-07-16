class Grid {
  constructor(size) {
    // this.cells = [];
    this.size = size;
    this.n = width / size;
    this.cells;
    this.createCells();
    this.time = 0;
  }

  draw(){
    // this.time += deltaTime;
    
    if(!btGenerateBl){
      this.createCells();
      btGenerateBl = true;
    }

    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        this.cells[i][j].draw();
      }
    }
  }

  createCells() {
    this.cells = new Array(this.n);

    let sChance = 6;
    let wChance = 3;
    let qChance = 3;
    let oChance = 3;
    let sum = sChance + wChance + qChance + oChance;


    for (let i = 0; i < this.n; i++) {
      this.cells[i] = new Array(this.n);

      for (let j = 0; j < this.n; j++) {
        let x = i * this.size;
        let y = j * this.size + GUISIZE;
        let newType = "";
        oChance = oChance + (this.cellsAroundType(i, j, "obstacle"))/550;

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

        if(i == 0 || j == 0 || i == this.n - 1 || j == this.n - 1) newType = "obstacle"; // Map borders

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

    if (i + 1 > this.n)
      if(this.cells[i + 1][j].type == type)
        count++;

    if (j + 1 > this.n)
      if(this.cells[i][j + 1].type == type)
        count++;

    if(j + 1 > this.n && i + 1 > this.n)
      if(this.cells[i + 1][j + 1].type == type)
        count++;

    if(j - 1 >= 0 && i - 1 >= 0)
      if(this.cells[i - 1][j - 1].type == type)
        count++;

    if(j + 1 > this.n && i - 1 >= 0)
      if(this.cells[i - 1][j + 1].type == type)
        count++;

    if(j - 1 >= 0 && i + 1 > this.n)
      if(this.cells[i + 1][j - 1].type == type)
        count++;

    return count;
  }

  applyType(type) {
    for (let i = 0; i < this.n; i++)
      for (let j = 0; j < this.n; j++) this.cells[i][j].applyType(type);
  }

  unsetSelected() {
    for (let i = 0; i < this.n; i++)
      for (let j = 0; j < this.n; j++)
        if (this.cells[i][j].isSelected) this.cells[i][j].unsetSelected();
  }
}
