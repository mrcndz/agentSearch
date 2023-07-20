class Agent{
    constructor(cells, isGoal){
        this.i = 0;
        this.j = 0;
        this.cells = cells;
        this.heading = 0;
        this.speed = 0;
        this.isGoal = isGoal;

        this.size = this.cells[0][0].size

        this.randomSpawn();
    }

    updateCells(cells){
        this.cells = cells;
    }

    spawn(i, j){
        if(this.cells[i][j].type == "obstacle")
            return;

        this.i = i;
        this.j = j;
    }

    randomSpawn(){
        let i = int(random(1, this.cells.length - 2));
        let j = int(random(1, this.cells[0].length - 2));

        while(this.cells[i][j].type == "obstacle"){
            i = int(random(1, this.cells.length - 2));
            j = int(random(1, this.cells[0].length - 2));
        }

        this.i = i;
        this.j = j;
    }

    draw(){
        let x = this.cells[this.i][this.j].x + this.size/2;
        let y = this.cells[this.i][this.j].y + this.size/2;

        // rectMode(CENTER);
        if(this.isGoal){
            fill("white");
            stroke("red");
        }else{
            stroke("green");
            fill("white");
        }

        strokeWeight(6);
        circle(x, y, this.size/2);
        stroke("black");
    }

}