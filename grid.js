class World {
  constructor(size) {
    this.size = size;
    this.ni = width / size; // i axis size
    this.nj = (height - GUISIZE) / size; // j axis size

    this.cells = [];
    this.createCells(); // Generate new cells!

    this.isRunning = false;
    this.pathVisualizer = new Find();
    this.agent = new Agent(this.cells, false);
    this.goal = new Agent(this.cells, true);

  }

  draw(){
    // Draw cells
    for (let i = 0; i < this.ni; i++)
      for (let j = 0; j < this.nj; j++){
        this.cells[i][j].draw();
      }

    // Draw Agent
    this.agent.draw();
    this.goal.draw();


    // New button
    if(!btGenerateBl){
      world.createCells();
      world.goal.updateCells(world.cells);
      world.agent.updateCells(world.cells);
      world.goal.randomSpawn();
      world.agent.randomSpawn();
      btGenerateBl = true;
    }

    // Start button
    if(btStartCt == "Stop") this.runPathVisualizer();
    else this.isRunning = false;
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

        oChance = oChance + (this.numOfNeighborsOfType(i, j, "obstacle"))/1000 * isEnableBtS.isSelected;

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

        this.cells[i][j] = new Cell(i, j, x, y, this.size, newType);
      }
    }

    // Now get neighbors
    for (let i = 0; i < this.ni; i++)
      for(let j = 0; j < this.nj; j++)
        this.cells[i][j].neighbors = this.getNeighbors(i, j);


  }

  numOfNeighborsOfType(i, j, type) {
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

  getNeighbors(i, j){
    let neighbors = [];

    if (i - 1 >= 0)
      if(this.cells[i - 1][j].type != "obstacle")
        neighbors.push(this.cells[i - 1][j]);

    if (j - 1 >= 0)
      if(this.cells[i][j - 1].type != "obstacle")
        neighbors.push(this.cells[i][j - 1]);

    if (i + 1 < this.ni)
      if(this.cells[i + 1][j].type != "obstacle")
        neighbors.push(this.cells[i + 1][j]);

    if (j + 1 < this.nj)
      if(this.cells[i][j + 1].type != "obstacle")
        neighbors.push(this.cells[i][j + 1]);

    if(j + 1 < this.nj && i + 1 < this.ni)
      if(this.cells[i + 1][j + 1].type != "obstacle")
        neighbors.push(this.cells[i + 1][j + 1]);

    if(j - 1 >= 0 && i - 1 >= 0)
      if(this.cells[i - 1][j - 1].type != "obstacle")
        neighbors.push(this.cells[i - 1][j - 1]);

    if(j + 1 < this.nj && i - 1 >= 0)
      if(this.cells[i - 1][j + 1].type != "obstacle")
        neighbors.push(this.cells[i - 1][j + 1]);

    if(j - 1 >= 0 && i + 1 < this.ni)
      if(this.cells[i + 1][j - 1].type != "obstacle")
        neighbors.push(this.cells[i + 1][j - 1]);

    return neighbors;
  }

  runPathVisualizer(){
    if(this.isRunning == true){
      this.pathVisualizer.drawAndAnimate("#ff8800cd", "#00eeff8d", 1);
      return;
    }

    this.pathVisualizer = new Find();

    switch(btAlgorithmChosen){
      case "BFS":
        this.pathVisualizer.bfs(this.cells, this.agent, this.goal);
        break;
      case "DFS":
        this.pathVisualizer.dfs(this.cells, this.agent, this.goal);
      case "A*":
        this.pathVisualizer.aStar(this.cells, this.agent, this.goal);
        break;
      case "GREEDY":
        this.pathVisualizer.greedy(this.cells, this.agent, this.goal);
        break;
      case "UNIFORM COST":
        this.pathVisualizer.uniformCost(this.cells, this.agent, this.goal);
        break;
    }
    this.isRunning = true;

    // this.runPathVisualizer.drawAndAnimate("red", 1000);

    // this.pathVisualizer.bfs(this.agent, this.goal);
  }

}
