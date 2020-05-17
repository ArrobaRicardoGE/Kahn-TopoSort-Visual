class Table{
    constructor(posX,posY,n,cellSize,color){
        this.posX=posX;
        this.posY=posY;
        this.cellSize=cellSize;
        this.rows=[];
        for(let i=0;i<n;i++){   
            this.rows.push(new Row(n,posX+cellSize,posY+i*cellSize,cellSize,color));
        }
    }
    show(){

        //Show header
        push();
        fill(245, 60, 47);
        rect(this.posX+this.cellSize,this.posY-this.cellSize,this.rows.length*this.cellSize,this.cellSize);
        rect(this.posX+this.cellSize*(this.rows.length+1),this.posY-this.cellSize,this.cellSize,this.cellSize); 
        stroke(0);
        fill(0);
        textSize(this.cellSize/2+2);
        let t="Requisitos";
        text(t,this.posX+this.cellSize,this.posY-this.cellSize/2,this.cellSize*this.rows.length);
        text("T",this.posX+this.cellSize*(this.rows.length+1)+this.cellSize/2,this.posY-this.cellSize+this.cellSize/2);
        //Show the grid
        stroke(0);
        for(let i=0;i<this.rows.length;i++){
            fill(245, 60, 47);
            rect(this.posX,this.posY+i*this.cellSize,this.cellSize,this.cellSize);
            textSize(this.cellSize/2);
            fill(0);
            let t=i+1+"";
            text(t,this.posX,this.posY+i*this.cellSize+this.cellSize/2,this.cellSize);
            this.rows[i].show(i);
        }

        //Show the counter
        for(let i=0;i<this.rows.length;i++){
            fill(241, 250, 140);
            rect(this.posX+(this.rows.length+1)*this.cellSize,this.posY+this.cellSize*i,this.cellSize,this.cellSize);
            textSize(this.cellSize/2);
            fill(0);
            let t=this.rows[i].selection.length+"";
            //This function (p5) has a crazy bug, when 5 parameters sent makes the html go crazy
            text(t,this.posX+(this.rows.length+1)*this.cellSize+this.cellSize/2,this.posY+this.cellSize*i+this.cellSize/2);
        }
        pop();
        //change mouse
    }
    isPressed(){
        for(let i=0;i<this.rows.length;i++)
            this.rows[i].isPressed(i);
    }
    mouseOver(){
        for(let i=0;i<this.rows.length;i++)
            for(let j=0;j<this.rows.length;j++)
                if(i!=j && this.rows[i].inside(j))
                    this.rows[i].arr[j].bcol=new Color(255,255,255);
                else
                    this.rows[i].arr[j].bcol=new Color(0,0,0);
    }
    highlightX(idx,col){
        for(let i=0;i<this.rows[idx].arr.length;i++){
            this.rows[idx].arr[i].bcol=col;
        }
        this.rows[idx].bcol=col;
    }
    highlightY(idx,col){
        for(let i=0;i<this.rows.length;i++){
            this.rows[i].arr[idx].bcol=col;
        }
    }
    clear(){
        for(let i=0;i<this.rows.length;i++){
            for(let j=0;j<this.rows[i].arr.length;j++)this.rows[i].deselect(j);
        }
    }
    inside(){
        return (this.posX+this.cellSize<=mouseX && mouseX<=this.posX+this.cellSize*this.rows.length+this.cellSize && this.posY<=mouseY && mouseY<=this.posY+this.cellSize*this.rows.length);
    }
}