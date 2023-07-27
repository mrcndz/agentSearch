class Find {
    constructor() {
        this.cells = [];
        this.start = null;
        this.goal = null;
        this.agent = null;

        this.path = [];

        // Animation purposes
        this.frontierHistory = [];
        this.exploredHistory = [];
        this.currentFrontier = [];
        this.currentExplored = [];
        this.cellSize = 0;
        this.time = 0;
    }

    drawAndAnimate(colorFrontier, colorNotExplored, colorPath, animationSpeed) {
        rectMode(CENTER);
        // console.log(this.cellSize);

        let size = this.cells[0][0].size;


        if (this.time >= 100 && this.exploredHistory.length > 0 && this.frontierHistory.length > 0) {
            this.currentExplored = this.exploredHistory.shift();
            this.currentFrontier = this.frontierHistory.shift();
        }

        //console.log("Explored" + this.currentExplored.length);

        // fill(colorExplored);
        noStroke();
        fill(colorNotExplored);
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                let draw = true;

                for (let k = 0; k < this.currentExplored.length; k++) {
                    if ((this.currentExplored[k].i == i && this.currentExplored[k].j == j)) {
                        draw = false;
                        break;
                    }
                }

                if (draw) rect(this.cells[i][j].x + size / 2, this.cells[i][j].y + size / 2, size, size);
            }
        }

        fill(colorFrontier);
        for (let i = 0; i < this.currentFrontier.length; i++) {
            noStroke();
            rect(this.currentFrontier[i].x + size / 2, this.currentFrontier[i].y + size / 2, size, size);
        }


        if (this.exploredHistory.length > 0 && this.frontierHistory.length > 0) {
            this.time = this.time + (deltaTime / animationSpeed);
        } else {
            this.showPath(colorPath);
            this.agent.setPath(this.path);
            this.agent.move();
        }
        rectMode(CORNER);
    }

    showPath(colorPath) {
        for (let i = 0; i < this.path.length; i++) {
            fill(colorPath)
            noStroke();
            rect(this.path[i].x + this.cells[0][0].size / 2, this.path[i].y + this.cells[0][0].size / 2, this.cells[0][0].size / 2, this.cells[0][0].size / 2);
        }

    }


    bfs(cells, start, goal) {
        this.cells = cells;
        this.start = cells[start.i][start.j];
        this.goal = cells[goal.i][goal.j];

        let frontier = [];
        let explored = [];
        let cameFrom = {};

        frontier.push(this.start);
        explored.push(this.start);
        cameFrom[this.start.i + "," + this.start.j] = null;

        while (frontier.length > 0 && !frontier.includes(this.goal) && !explored.includes(this.goal)) {
            this.exploredHistory.push(explored.slice());
            let current = frontier.shift();
            let neighbors = current.neighbors;

            for (let i = 0; i < neighbors.length; i++) {
                let neighbor = neighbors[i];

                if (!explored.includes(neighbor)) {
                    frontier.push(neighbor);
                    explored.push(neighbor);
                    cameFrom[neighbor.i + "," + neighbor.j] = current;
                }
            }
            this.frontierHistory.push(frontier.slice());
        }

        let path = [];
        let current = this.goal;
        while (current != null) {
            path.unshift(current);
            current = cameFrom[current.i + "," + current.j];
        }
        this.path = path;
    }

    dfs(cells, start, goal) {
        this.cells = cells;
        this.start = cells[start.i][start.j];
        this.goal = cells[goal.i][goal.j];

        let frontier = [];
        let explored = [];
        let cameFrom = {};

        frontier.push(this.start);
        explored.push(this.start);
        cameFrom[this.start.i + "," + this.start.j] = null;

        while (frontier.length > 0 && !frontier.includes(this.goal) && !explored.includes(this.goal)) {
            this.exploredHistory.push(explored.slice());
            let current = frontier.pop();
            let neighbors = current.neighbors;

            for (let i = 0; i < neighbors.length; i++) {
                let neighbor = neighbors[i];

                if (!explored.includes(neighbor)) {
                    frontier.push(neighbor);
                    explored.push(neighbor);
                    cameFrom[neighbor.i + "," + neighbor.j] = current;
                }
            }
            this.frontierHistory.push(frontier.slice());
        }

        let path = [];
        let current = this.goal;
        while (current != null) {
            path.unshift(current);
            current = cameFrom[current.i + "," + current.j];
        }
        this.path = path;
    }

    // Faz a escolha ótima local buscando a escolha ótima global
    greedy(cells, start, goal) {
        this.cells = cells;
        this.start = cells[start.i][start.j];
        this.goal = cells[goal.i][goal.j];

        let frontier = [];
        let explored = [];
        let cameFrom = {};

        frontier.push(this.start);
        explored.push(this.start);
        cameFrom[this.start.i + "," + this.start.j] = null;

        // Função heurística (custo do terreno * distância euclidiana entre cell e goal)
        let calculateHeuristic = (cell) => {
            const dx = Math.abs(cell.i - this.goal.i);
            const dy = Math.abs(cell.j - this.goal.j);
            const euclideanDistance = Math.sqrt(dx * dx + dy * dy);
            return cell.cost() * euclideanDistance;
        };

        while (frontier.length > 0 && !frontier.includes(this.goal) && !explored.includes(this.goal)) {
            // Fila pela ordem de custo
            frontier.sort((a, b) => calculateHeuristic(a) - calculateHeuristic(b));

            this.exploredHistory.push(explored.slice());
            let current = frontier.shift();
            let neighbors = current.neighbors;

            for (let i = 0; i < neighbors.length; i++) {
                let neighbor = neighbors[i];

                if (!explored.includes(neighbor)) {
                    frontier.push(neighbor);
                    explored.push(neighbor);
                    cameFrom[neighbor.i + "," + neighbor.j] = current;
                }
            }

            this.frontierHistory.push(frontier.slice());
        }

        let path = [];
        let current = this.goal;
        while (current != null) {
            path.unshift(current);
            current = cameFrom[current.i + "," + current.j];
        }

        this.path = path;
    }

    uniformCost(cells, start, goal) {
        this.cells = cells;
        this.start = cells[start.i][start.j];
        this.goal = cells[goal.i][goal.j];

        let frontier = [];
        let explored = [];
        let cameFrom = {};
        let costSoFar = {};

        frontier.push(this.start);
        explored.push(this.start);
        cameFrom[this.start.i + "," + this.start.j] = null;
        costSoFar[this.start.i + "," + this.start.j] = 0;

        while (frontier.length > 0 && !frontier.includes(this.goal) && !explored.includes(this.goal)) {
            // Fila pela ordem de custo acumulado (custo até o nó)
            frontier.sort((a, b) => costSoFar[a.i + "," + a.j] - costSoFar[b.i + "," + b.j]);

            this.exploredHistory.push(explored.slice());
            let current = frontier.shift();
            let neighbors = current.neighbors;

            for (let i = 0; i < neighbors.length; i++) {
                let neighbor = neighbors[i];
                let newCost = costSoFar[current.i + "," + current.j] + neighbor.cost();

                if (!explored.includes(neighbor) && (!costSoFar[neighbor.i + "," + neighbor.j] || newCost < costSoFar[neighbor.i + "," + neighbor.j])) {
                    frontier.push(neighbor);
                    explored.push(neighbor);
                    cameFrom[neighbor.i + "," + neighbor.j] = current;
                    costSoFar[neighbor.i + "," + neighbor.j] = newCost;
                }
            }

            this.frontierHistory.push(frontier.slice());
        }

        let path = [];
        let current = this.goal;
        while (current != null) {
            path.unshift(current);
            current = cameFrom[current.i + "," + current.j];
        }

        this.path = path;
    }
}
