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

  draw() {
    // Draw cells
    for (let i = 0; i < this.ni; i++)
      for (let j = 0; j < this.nj; j++) {
        this.cells[i][j].draw();
      }

    // Draw Agent


    // New button
    if (!btGenerateBl) {
      world.createCells();
      world.goal.updateCells(world.cells);
      world.agent.updateCells(world.cells);
      world.goal.randomSpawn();
      world.agent.randomSpawn();
      btGenerateBl = true;
    }

    // Start button
    if (btStartCt == "Stop") {
      this.runPathVisualizer();
      stroke(2);
      textSize(20);
      fill("white");
      text("Food: " + String(this.agent.food), 45, 30);
      text("Speed: " + String(this.agent.speed), 145, 30);
      textSize(15);
      noStroke();
      fill("orange")
      text("Frontier: Orange\n", width - 100, 30);
      fill("white")
      text("Explored: Light", width - 100, 45);

      textSize(15);
      noStroke();
      text("Using " + btAlgorithmChosen, width/2 + 100, 30);
    }
    else {
      this.isRunning = false;
      this.agent.food = 0;
      this.agent.x = this.cells[this.agent.i][this.agent.j].x + this.size / 2;
      this.agent.y = this.cells[this.agent.i][this.agent.j].y + this.size / 2;
    }

    this.agent.draw();
    this.goal.draw();

    if (dist(this.agent.x, this.agent.y, this.goal.x, this.goal.y) <= 1) {
      this.goal.randomSpawn();
      this.agent.food++;
      this.agent.speed = 0;
      this.isRunning = false;
    }

    textSize(15);
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

        oChance = oChance + (this.numOfNeighborsOfType(i, j, "obstacle")) / 1000 * isEnableBtS.isSelected;

        if (!isEnableBtO.isSelected) oChance = 0;
        if (!isEnableBtS.isSelected) sChance = 0;
        if (!isEnableBtW.isSelected) wChance = 0;
        if (!isEnableBtQ.isSelected) qChance = 0;

        sum = sChance + wChance + qChance + oChance;
        let n = random(sum);

        if (n <= sChance) {
          newType = "sand";
        }
        if (n > sChance && n <= sChance + wChance) {
          newType = "water";
        }
        if (n > sChance + wChance && n <= sChance + wChance + qChance) {
          newType = "quagmire";
        }
        if (n > sChance + wChance + qChance) {
          newType = "obstacle";
        }

        if (i == 0 || j == 0 || i == this.ni - 1 || j == this.nj - 1) newType = "obstacle"; // Map borders

        this.cells[i][j] = new Cell(i, j, x, y, this.size, newType);
      }
    }
  }

  numOfNeighborsOfType(i, j, type) {
    let count = 1;

    if (i - 1 >= 0)
      if (this.cells[i - 1][j].type == type)
        count++;

    if (j - 1 >= 0)
      if (this.cells[i][j - 1].type == type)
        count++;

    if (i + 1 > this.ni)
      if (this.cells[i + 1][j].type == type)
        count++;

    if (j + 1 > this.nj)
      if (this.cells[i][j + 1].type == type)
        count++;

    if (j + 1 > this.nj && i + 1 > this.ni)
      if (this.cells[i + 1][j + 1].type == type)
        count++;

    if (j - 1 >= 0 && i - 1 >= 0)
      if (this.cells[i - 1][j - 1].type == type)
        count++;

    if (j + 1 > this.nj && i - 1 >= 0)
      if (this.cells[i - 1][j + 1].type == type)
        count++;

    if (j - 1 >= 0 && i + 1 > this.ni)
      if (this.cells[i + 1][j - 1].type == type)
        count++;

    return count;
  }

  applyType(type) {
    for (let i = 0; i < this.ni; i++)
      for (let j = 0; j < this.nj; j++)
        if (this.agent.i == i && this.agent.j == j) continue;
        else this.cells[i][j].applyType(type);
  }

  unsetSelected() {
    for (let i = 0; i < this.ni; i++)
      for (let j = 0; j < this.nj; j++)
        if (this.cells[i][j].isSelected) this.cells[i][j].unsetSelected();
  }

  getNeighbors(i, j) {
    let neighbors = [];

    if (i - 1 >= 0)
      if (this.cells[i - 1][j].type != "obstacle")
        neighbors.push(this.cells[i - 1][j]);

    if (j - 1 >= 0)
      if (this.cells[i][j - 1].type != "obstacle")
        neighbors.push(this.cells[i][j - 1]);

    if (i + 1 < this.ni)
      if (this.cells[i + 1][j].type != "obstacle")
        neighbors.push(this.cells[i + 1][j]);

    if (j + 1 < this.nj)
      if (this.cells[i][j + 1].type != "obstacle")
        neighbors.push(this.cells[i][j + 1]);

    if (j + 1 < this.nj && i + 1 < this.ni)
      if (this.cells[i + 1][j + 1].type != "obstacle" && this.cells[i + 1][j].type != "obstacle" && this.cells[i][j + 1].type != "obstacle")
        neighbors.push(this.cells[i + 1][j + 1]);

    if (j - 1 >= 0 && i - 1 >= 0)
      if (this.cells[i - 1][j - 1].type != "obstacle" && this.cells[i - 1][j].type != "obstacle" && this.cells[i][j - 1].type != "obstacle")
        neighbors.push(this.cells[i - 1][j - 1]);

    if (j + 1 < this.nj && i - 1 >= 0)
      if (this.cells[i - 1][j + 1].type != "obstacle" && this.cells[i - 1][j].type != "obstacle" && this.cells[i][j + 1].type != "obstacle")
        neighbors.push(this.cells[i - 1][j + 1]);

    if (j - 1 >= 0 && i + 1 < this.ni)
      if (this.cells[i + 1][j - 1].type != "obstacle" && this.cells[i + 1][j].type != "obstacle" && this.cells[i][j - 1].type != "obstacle")
        neighbors.push(this.cells[i + 1][j - 1]);

    return neighbors;
  }

  runPathVisualizer() {
    if (this.isRunning == true) {
      this.pathVisualizer.drawAndAnimate("#ff880081", "#00000071", "#ff000072", 0.2);
      return;
    }

    this.pathVisualizer = new Find();
    this.pathVisualizer.agent = this.agent;

    // Get neighbors
    for (let i = 0; i < this.ni; i++)
      for (let j = 0; j < this.nj; j++)
        this.cells[i][j].neighbors = this.getNeighbors(i, j);

    switch (btAlgorithmChosen) {
      case "BFS":
        this.pathVisualizer.bfs(this.cells, this.agent, this.goal);
        break;
      case "DFS":
        this.pathVisualizer.dfs(this.cells, this.agent, this.goal);
        break;
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
  }
}
