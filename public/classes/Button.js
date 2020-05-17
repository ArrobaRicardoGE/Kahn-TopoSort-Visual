class Button{
    constructor(text,posX,posY,width,height,col){
        this.text=text;
        this.posX=posX;
        this.posY=posY;
        this.width=width;
        this.height=height;
        this.col=col;
    }
    show(){
        push();
        stroke(this.col.r,this.col.g,this.col.b);
        fill(this.col.r,this.col.g,this.col.b);
        rect(this.posX,this.posY,this.width,this.height);   
        textSize(this.height/2);  
        noStroke();
        fill(255);
        text(this.text,this.posX,this.posY+this.height/2,this.width);   
        pop();
    }
    inside(){
        return(this.posX<=mouseX && mouseX<this.posX+this.width && this.posY<=mouseY && mouseY<this.posY+this.height);
    }
}