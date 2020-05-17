class Heap{
    constructor(posX,posY,r,sep,col1,col2){
        this.posX=posX;
        this.posY=posY;
        this.r=r;
        this.col1=col1;
        this.col2=col2;
        this.vertex=[220];
        this.sep=sep;
        this.change=new Map();
    }
    get radius(){
        return this.r;
    }
    insert(x){
        this.vertex.push(x);
        this.change.clear();
        //this.change.set(this.vertex.length-1,true);
        let i=this.vertex.length-1;
        while(i>0 && this.vertex[Math.floor(i/2)]<this.vertex[i]){
            //console.log(i);
            this.change.set(i,true);
            let temp=this.vertex[Math.floor(i/2)];
            this.vertex[Math.floor(i/2)]=this.vertex[i];
            this.vertex[i]=temp;
            i=Math.floor(i/2);
        }
        this.change.set(i,true);
    }
    remove(){
        let top=this.vertex[1]
        this.vertex[1]=this.vertex[this.vertex.length-1];
        this.vertex.pop();
        this.change.clear();
        let i=1;
        while(true){
            if(i*2>=this.vertex.length)break;
            let may=0;
            let idx=-1;
            if(this.vertex[i]<this.vertex[i*2]){
                may=this.vertex[i*2];
                idx=i*2;
            }
            if(i*2+1<this.vertex.length && this.vertex[i]<this.vertex[i*2+1]){
                if(this.vertex[i*2+1]>may){
                    idx=i*2+1;
                }
            }
            if(idx!=-1){
                this.change.set(i,true);
                this.change.set(idx,true);
                let temp=this.vertex[i];
                this.vertex[i]=this.vertex[idx];
                this.vertex[idx]=temp;
                i=idx;
            }
            else break;
        }
        return top;
    }
    show(){
        Heap.explore(1,this,this.posX,this.posY,this.sep);
    }
    static explore(i,tree,x,y,s){
        //console.log(x,y);
        push();
        if(tree.change.get(i)==true)Heap.drawVertex(x,y,tree.radius,tree.vertex[i],tree.col1);
        else Heap.drawVertex(x,y,tree.radius,tree.vertex[i],tree.col2);
        if(i*2<tree.vertex.length){
            Graph.addArrow(x-s,y+40,x,y,tree.radius,7);
            if(tree.change.get(i)==true)Heap.drawVertex(x,y,tree.radius,tree.vertex[i],tree.col1);
            else Heap.drawVertex(x,y,tree.radius,tree.vertex[i],tree.col2);
            Heap.explore(i*2,tree,x-s,y+40,s/2);
        }
        if(i*2+1<tree.vertex.length){
            Graph.addArrow(x+s,y+40,x,y,tree.radius,7);
            if(tree.change.get(i)==true)Heap.drawVertex(x,y,tree.radius,tree.vertex[i],tree.col1);
            else Heap.drawVertex(x,y,tree.radius,tree.vertex[i],tree.col2);
            Heap.explore(i*2+1,tree,x+s,y+40,s/2);
        }
        pop();
    }
    clear(){
        while(this.vertex.length>1)this.remove();
        this.change.clear();
    }
    static drawVertex(x,y,r,n,col){
        push();
        stroke(col.r, col.g, col.b);
        fill(col.r, col.g, col.b);
        ellipse(x,y,r);
        textSize(r/2);
        fill(0);
        stroke(0);
        let t=n+"";
        if(t=='undefined')t='V';
        text(t,x,y);
        pop();
    }
}