class Find{
    constructor(){
        this.cells = [];
        this.start = null;
        this.goal = null;

        this.path = [];
        // Animation purposes
        this.frontierHistory = [];
        this.exploredHistory = [];
        this.currentFrontier = [];
        this.currentExplored = [];
        this.cellSize = 0;
        this.time = 0;
        this.it = 0;
    }

    drawAndAnimate(colorFrontier, colorExplored, animationSpeed){
        rectMode(CENTER);
        // console.log(this.cellSize);

        let size = this.cells[0][0].size;

        if(this.exploredHistory.length > 0 && this.frontierHistory.length > 0){
            this.cellSize = this.cellSize + (deltaTime/animationSpeed);
        } else {
            this.cellSize = size;
        }

        if(this.cellSize >= size && this.exploredHistory.length > 0 && this.frontierHistory.length > 0){
            this.cellSize = 0;
            this.currentExplored = this.exploredHistory.shift();
            this.currentFrontier = this.frontierHistory.shift();
        }

        console.log("Explored" + this.currentExplored.length);


        fill(colorExplored);
        for(let i = 0; i < this.currentExplored.length; i++){
            noStroke();
            rect(this.currentExplored[i].x + size/2, this.currentExplored[i].y + size/2, this.cells[0][0].size, this.cells[0][0].size);
        }

        fill(colorFrontier);
        for(let i = 0; i < this.currentFrontier.length; i++){
            noStroke();
            rect(this.currentFrontier[i].x + size/2, this.currentFrontier[i].y + size/2, this.cellSize, this.cellSize);
        }

        rectMode(CORNER);
    }


    bfs(cells, start, goal){
        this.cells = cells;
        this.start = cells[start.i][start.j];
        this.goal = cells[goal.i][goal.j];

        let frontier =  [];
        let explored =  [];

        frontier.push(this.start);
        explored.push(this.start);

        while(frontier.length > 0 && !frontier.includes(this.goal) && !explored.includes(this.goal)){
            this.exploredHistory.push(explored.slice());
            let current = frontier.shift();
            let neighbors = current.neighbors;

            for(let i = 0; i < neighbors.length; i++){
                let neighbor = neighbors[i];

                if(!explored.includes(neighbor)){
                    frontier.push(neighbor);
                    explored.push(neighbor);
                }
           }
        this.frontierHistory.push(frontier.slice());
        }
    }
}