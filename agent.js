class Agent {
    constructor(cells, isGoal) {
        this.i = 0;
        this.j = 0;
        this.x = 0;
        this.y = 0;
        this.cells = cells;
        this.heading = 0;
        this.speed = 0;
        this.isGoal = isGoal;
        this.food = 0;

        this.path = [];

        this.size = this.cells[0][0].size

        this.randomSpawn();
    }

    updateCells(cells) {
        this.cells = cells;
    }

    spawn(i, j) {
        if (this.cells[i][j].type == "obstacle")
            return;

        this.i = i;
        this.j = j;
    }

    randomSpawn() {
        let i = int(random(1, this.cells.length - 2));
        let j = int(random(1, this.cells[0].length - 2));

        while (this.cells[i][j].type == "obstacle") {
            i = int(random(1, this.cells.length - 2));
            j = int(random(1, this.cells[0].length - 2));
        }

        this.i = i;
        this.j = j;

        this.x = this.cells[i][j].x + this.size / 2;
        this.y = this.cells[i][j].y + this.size / 2;
    }

    draw() {
        let x = this.x
        let y = this.y;

        // rectMode(CENTER);
        if (this.isGoal) {
            fill("white");
            stroke("red");
        } else {
            stroke("green");
            fill("white");
        }

        strokeWeight(6);
        circle(x, y, this.size / 2);
        stroke("black");
    }

    setPath(path) {
        this.path = path;
    }


    move() {
        if (this.path.length <= 0)
            return;

        let x = this.x;
        let y = this.y;

        let x2 = this.path[0].x + this.size / 2;
        let y2 = this.path[0].y + this.size / 2;

        let dx = x2 - x;
        let dy = y2 - y;
        let positivex = dx > 0;
        let positivey = dy > 0;

        let angle = atan2(dy, dx);

        this.heading = angle;

        this.speed = 8/this.cells[this.i][this.j].cost();
        console.log(this.speed);

        this.x = x + cos(angle) * this.speed;
        this.y = y + sin(angle) * this.speed;

        if (this.x > x2 && positivex) {
            this.x = x2; }
        if (this.x < x2 && !positivex) {
            this.x = x2; }
        if (this.y > y2 && positivey) {
            this.y = y2; }
        if (this.y < y2 && !positivey) {
            this.y = y2; }

        if (dist(this.x, this.y, x2, y2) < this.size / 2) {
            this.i = this.path[0].i;
            this.j = this.path[0].j;
        }

        if (dist(this.x, this.y, x2, y2) < 2) {
            this.x = x2;
            this.y = y2;
            this.path.shift();
        }
    }
}