
class Animate{
    constructor(speed, iMax, jMax){
        this.i = 0;
        this.j = 0;

        this.iMax = iMax;
        this.jMax = jMax;
        this.speed = 0.01;
        this.time = 0;
    }

    forAnimate(){
        this.time += deltaTime;

        if(this.time > this.speed){
            this.j++;
            this.time = 0;
        }

        if(this.j >= this.jMax){
            this.j = 0;
            this.i++;
        }

        if(this.i >= this.jMax){
            this.i = 0;
        }
        
        return true;
    }
}