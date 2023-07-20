class Cell {
  constructor(i, j, x, y, size, type) {
    this.i = i;
    this.j = j;
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.type = type;
    this.isSelected = false;
    this.isSelecting = false;
    this.isPressed = false;
    this.strokeColor = "#ffffff";
    this.neighbors = [];
  }

  draw() {
    let pixelSize = 4;
    fill("#FFFFFF");
    rect(this.x, this.y, this.size, this.size);
    noStroke();
    fill("#aeadb6e2");
    rect(this.x, this.y, pixelSize, this.size);
    // fill("#707072")
    // rect(this.x, this.y, this.size, pixelSize);
    fill("#eee5e5");
    rect(this.x, this.y + pixelSize, this.size, pixelSize);
    fill("#707072");
    rect(this.x, this.y, this.size, pixelSize);

    if (this.type == "sand") {
      fill("#e8e3a4e8");
    } else if (this.type == "quagmire") {
      // Fill with mud color
      fill("#643a07aa"); // Mud color
    } else if (this.type == "water") {
      fill("#0b0b8dd3");
    } else if (this.type == "obstacle") {
      fill("#232323dc");
    }
    rect(this.x, this.y, this.size, this.size);

    if (this.mouseInside()) {
      fill("#ffffff1f");

      if (mouseIsPressed) {
        fill("stroke");
        this.isPressed = true;
        mouseIsPressed = false;
        this.cycleSelected();
      } else this.isPressed = false;
    } else noFill();

    rect(this.x, this.y, this.size, this.size);

    if (this.isSelected) {
      noFill();
      strokeWeight(2);
      stroke(this.strokeColor);
      rect(this.x, this.y, this.size, this.size);
      noStroke();
    }
  }

  applyType(type) {
    if (this.isSelected && !this.agentIsInside) this.type = type;

    this.isSelected = false;
  }

  mouseInside() {
    if (this.isSelecting) return true;

    if (
      mouseX >= this.x &&
      mouseX <= this.x + this.size &&
      mouseY >= this.y &&
      mouseY <= this.y + this.size
    )
      return true;

    return false;
  }

  cycleSelected() {
    if (this.isSelected) this.isSelected = false;
    else this.isSelected = true;
  }

  typeSetSelected(type) {
    if (this.type == type) this.isSelected = true;
    else this.isSelected = false;
  }

  unsetSelected() {
    this.isSelected = false;
  }

  cost(){
    if(this.type == "sand") return 1;
    if(this.type == "quagmire") return 5;
    if(this.type == "water") return 10;
    if(this.type == "obstacle") return 1000000;
  }

}
