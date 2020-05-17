class Row{
    constructor(n,_posX,posY,cellSize,_color){
        this.posY=posY;
        this.cellSize=cellSize;
        this.arr=[];
        this.col=_color;
        this.bcol=new Color(0,0,0);
        for(let i=0;i<n;i++){
            this.arr[i]={
                posX:_posX+i*this.cellSize,
                col: _color,
                bcol: new Color(0,0,0),
                selected:false
            }
        }
    }
    show(idx){
        push();
        for(let i=0;i<this.arr.length;i++){
            if(i==idx)fill(this.arr[i].col.r-100,this.arr[i].col.g-100,this.arr[i].col.b-100);
            else fill(this.arr[i].col.r,this.arr[i].col.g,this.arr[i].col.b);
            stroke(this.arr[i].bcol.r,this.arr[i].bcol.g,this.arr[i].bcol.b);
            rect(this.arr[i].posX,this.posY,this.cellSize,this.cellSize);
            textSize(this.cellSize/2);
            fill(this.arr[i].bcol.r,this.arr[i].bcol.g,this.arr[i].bcol.b);
            let t=i+1+"";
            textAlign(CENTER,CENTER);
            text(t,this.arr[i].posX,this.posY+this.cellSize/2,this.cellSize);
        }
        pop();
    }
    isPressed(idx){
        for(let i=0;i<this.arr.length;i++){
            if(this.inside(i) && i!=idx){
                if(this.arr[i].selected){
                    this.arr[i].selected=false;
                    this.arr[i].col=this.col;
                }
                else{
                    this.arr[i].selected=true;
                    this.arr[i].col=new Color(80, 250, 123);
                }
            }
        }
    }
    inside(i){
        return(this.arr[i].posX<=mouseX && mouseX<this.arr[i].posX+this.cellSize && this.posY<=mouseY && mouseY<this.posY+this.cellSize);
    }
    deselect(idx){
        this.arr[idx].selected=false;
        this.arr[idx].col=this.col;
    }
    get selection(){
        let arrSel=[];
        for(let i=0;i<this.arr.length;i++){
            if(this.arr[i].selected)arrSel.push(i);
        }
        return arrSel;
    }
}