class Graph{
    constructor(n,r,posX,posY,_sep,_col){
        this.posX=posX;
        this.posY=posY;
        this.sep=_sep;
        this.r=r;
        this.col=_col;
        this.vertex=[];
        for(let i=0;i<n;i++){
            this.vertex[i]={
                sep:_sep,
                col: Object.assign({},_col),
                posX: this.sep*Math.cos(3*Math.PI/2+2*i*Math.PI/n)+this.posX,
                posY: this.sep*Math.sin(3*Math.PI/2+2*i*Math.PI/n)+this.posY
            }
        }
    }
    show(){
        push();
        for(let i=0;i<this.vertex.length;i++){
            stroke(this.vertex[i].col.r,this.vertex[i].col.g,this.vertex[i].col.b);
            fill(this.vertex[i].col.r,this.vertex[i].col.g,this.vertex[i].col.b);
            ellipse(this.vertex[i].posX,this.vertex[i].posY,this.r);
            let t=i+1+"";
            fill(0);
            textSize(this.r/2);
            text(t,this.vertex[i].posX,this.vertex[i].posY);
        }
        pop();
    }
    vertexPos(i){
        return [this.vertex[i].posX,this.vertex[i].posY];
    }
    highlight(idx,col){
        this.vertex[idx].col=col;
    }
    static showEdges(g,mat){
        push();
        stroke(255);
        fill(255);
        for(let i=0;i<mat.length;i++){
            let sel=mat[i].selection;
            for(let j=0;j<sel.length;j++){
                let v1=g.vertexPos(i);
                let v2=g.vertexPos(sel[j]);
                Graph.addArrow(v1[0],v1[1],v2[0],v2[1],g.r,7);
            }
        }
        pop();
    }    
    static addArrow(x1,y1,x2,y2,r,arrowS){
        push();
        stroke(255);
        fill(255);
        line(x1,y1,x2,y2);
        let m=(y1-y2)/(x1-x2);
        let a=Math.atan(m);
        if(x1>x2)x1-=Math.abs(r/2*Math.cos(a));
        else x1+=Math.abs(r/2*Math.cos(a));
        if(y1>y2)y1-=Math.abs(r/2*Math.sin(a));
        else y1+=Math.abs(r/2*Math.sin(a));
        push();
        translate(x1,y1);
        let sgn=1;
        if(x1<x2)sgn*=-1;
        rotate(a+sgn*Math.PI/2);
        triangle(-arrowS/2,arrowS,arrowS/2,arrowS,0,0);
        //triangle(0,0,-arrowS,-arrowS,-arrowS,arrowS);
        pop();
        pop();
    }
}