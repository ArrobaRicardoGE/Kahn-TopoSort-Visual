class Answer{
    constructor(posX,posY,r,sep,col){
        this.posX=posX;
        this.posY=posY;
        this.r=r;
        this.sep=sep;
        this.col=col;
        this.lastCol=new Color(255,255,255);
        this.arr=[];
    }
    insert(x){
        this.arr.push(x);
    }
    remove(){
        this.arr.pop();
    }
    show(){
        push();
        for(let i=0;i<this.arr.length;i++){
            fill(this.col.r,this.col.g,this.col.b);
            if(i==this.arr.length-1)fill(this.lastCol.r,this.lastCol.g,this.lastCol.b);
            noStroke();
            ellipse(this.posX+this.sep*i,this.posY,this.r,this.r);
            let t=this.arr[i]+"";
            stroke(0);
            fill(0);
            textSize(this.r/2);
            text(t,this.posX+this.sep*i,this.posY);
        }
        pop();
    }
    showOutline(n){
        push();
        for(let i=0;i<n;i++){
            stroke(255);
            noFill();
            ellipse(this.posX+this.sep*i,this.posY,this.r,this.r);
        }
        pop();
    }
    clear(){
        while(this.arr.length>0)this.remove();
    }
}