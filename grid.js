class Grid{
  constructor(size) {
    this.cells = [];
    this.size = size;
    this.n = width / size;
    this.createCells();

  }

  draw(){
    for(let i = 0; i < this.n; i++){
      for(let j = 0; j < this.n; j++){
        this.cells[i][j].draw();
      }
    }
  }

  createCells(){
    this.cells = new Array(this.n);

    for(let i = 0; i < this.n; i++){
      let x = i * this.size;
      this.cells[i] = new Array(this.n);

      for (let j = 0; j < this.n; j++){
        let y = j * this.size + GUISIZE;
        this.cells[i][j] = new Cell(x, y, this.size, 'water')
      }
    }
   }

   applyType(type){
      for(let i = 0; i < this.n; i++)
        for(let j = 0; j < this.n; j++)
            this.cells[i][j].applyType(type);
   }
  
   unsetSelected(){
      for(let i = 0; i < this.n; i++)
        for(let j = 0; j < this.n; j++)
          if(this.cells[i][j].isSelected)
            this.cells[i][j].unsetSelected();
   }

}