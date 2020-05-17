/*
    Pending tasks: 
    Details: 
        
*/

let cnv;

function setup(){
    cnv = createCanvas(1000,600);
    cnv.position((windowWidth-width)/2,(windowHeight-height)/2+20);
    cnv.style("z-index: -1");
    background(40,42,54);
    textAlign(CENTER,CENTER);
}
class Color{
    constructor(r,g,b){
        this.r=r;
        this.g=g;
        this.b=b;
    }
}
let graph1 = new Graph(10,25,800,165,100,new Color(255, 120, 202));
let pq = new Heap(500,300,25,150,new Color(241, 250, 140),new Color(80, 250, 123));
let table = new Table(15,60,10,22,new Color(95, 150, 227));
let invTable = new Table(15,60,10,22,new Color(255,45,45));
let ans = new Answer(320,500,25,40,new Color(206, 108, 255));
let b1 = new Button("Resetear",1000-85,600-50,50,20,new Color(0,0,0));
let b2 = new Button("Iniciar",1000-85,600-75,50,20,new Color(0,0,0));
let b3 = new Button("Aleatorio",55,600-60,50,20,new Color(0,0,0));
let delayDown = new Button("-",1000-115,600-30,20,20,new Color(0,0,0));
let delayUp = new Button("+",1000-25,600-30,20,20,new Color(0,0,0));
let delay = 100;
let usa = new Map();
let proc = true,done = false;

function reset(){
    table.clear();
    invTable.clear();
    ans.clear();
    pq.clear();
    for(let i=0;i<table.rows.length;i++){
        graph1.highlight(i,new Color(255, 120, 202));
    }
    done = false;
}

function draw(){
    cnv.position((windowWidth-width)/2,(windowHeight-height)/2+20);
    background(40,42,54);
    textSize(20);
    fill(255);
    text("Matriz de adyacencia",(table.posX+(table.rows.length+2)*table.cellSize)/2+14,table.posY-table.cellSize-10);
    text("Heap",pq.posX,pq.posY-pq.r-10);
    text("Gráfica",graph1.posX,table.posY-table.cellSize-5);
    text("Orden topológico",500,ans.posY-ans.r-10);
    table.show();
    Graph.showEdges(graph1,table.rows);
    if(done)Graph.showEdges(graph1,invTable.rows);
    graph1.show();
    pq.show();
    ans.show();
    ans.showOutline(table.rows.length);
    b1.show();
    b2.show();
    b3.show();
    delayUp.show();
    delayDown.show();
    fill(255);
    textSize(10);
    text(("Delay (ms): "+delay),1000-60,600-20);
    if(table.inside() && !done)cursor(HAND);
    else if(b1.inside() || b2.inside() || delayUp.inside() || delayDown.inside() || b3.inside())cursor(HAND);
    else cursor(ARROW);
    if(!proc && !done)table.mouseOver();
}

function mousePressed(){
    if(delayUp.inside())delay+=10;
    if(delayDown.inside())delay-=10;
    if(b1.inside() && !proc)reset();
    if(b3.inside() && !proc)randomGraph();
    if(!done){
        if(!proc){
            table.isPressed();
            invTable.isPressed();
            if(b2.inside() && !proc)Toposort();
        }
    }
    else window.alert('Terminado! Para probar otra simulación presiona "Resetear"');
    console.log(mouseX,mouseY);
    delay=Math.max(delay,10);
}

function keyPressed(){
    if(keyCode==UP_ARROW)delay+=10;
    else if(keyCode==DOWN_ARROW)delay-=10;
    else if(keyCode==32 && !proc && !done)Toposort();
    else if(keyCode==82 && !proc)reset();
    else if(keyCode==87 && !proc)randomGraph();
    delay=Math.max(delay,10);
}

function randomGraph(){
    reset();
    let nvertex = Math.round(Math.random()*13)+7;
    while(nvertex>0){
        let x = Math.round(Math.random()*9);
        let y = Math.round(Math.random()*9);
        if(x!=y){
            table.rows[x].arr[y].selected=true;
            table.rows[x].arr[y].col=new Color(80, 250, 123);
            invTable.rows[x].arr[y].selected=true;
            usa.clear();
            if(validEdge(y)==1)nvertex--;
            else{
                table.rows[x].arr[y].selected=false;
                table.rows[x].arr[y].col=table.rows[x].col;
                invTable.rows[x].arr[y].selected=false;
            }
        }
    }
}

function validEdge(v){
    usa.set(v,true);
    let r=1;
    for(let i=0;i<table.rows.length;i++){
        if(table.rows[i].arr[v].selected==true){
            if(usa.get(i)==true)return 0;
            r*=validEdge(i);
        }
    }
    return r;
}

async function Toposort(){
    proc = true;
    usa.clear();
    for(let i=0;i<table.rows.length;i++){
        table.highlightX(i,new Color(255,255,255));
        await sleep(delay);
        if(table.rows[i].selection.length==0){
            pq.insert(i+1);
            await sleep(delay);
            usa.set(i,true);
            graph1.highlight(i,new Color(114, 94, 255));
            //255,85,85
        }
        await sleep(delay);
        table.highlightX(i,new Color(0,0,0));
    }
    while(pq.vertex.length>1){
        let v=pq.remove();
        await sleep(2*delay);
        ans.insert(v);
        v--;
        await sleep(2*delay);
        table.highlightY(v,new Color(255,255,255));
        await sleep(delay);
        for(let i=0;i<table.rows.length;i++){
            table.rows[i].arr[v].bcol=new Color(255, 135, 48);
            await sleep(delay);
            if(i!=v && table.rows[i].arr[v].selected){
                table.rows[i].deselect(v);
                await sleep(delay);
            }
            if(table.rows[i].selection.length==0 && usa.get(i)!=true){
                pq.insert(i+1);
                await sleep(delay);
                usa.set(i,true);
                graph1.highlight(i,new Color(114, 94, 255)); 
                await sleep(delay);
            }
            //await sleep(delay);
            table.rows[i].arr[v].bcol=new Color(255,255,255);
        }
        await sleep(delay);
        table.highlightY(v,new Color(0,0,0));
    }
    if(ans.arr.length!=table.rows.length)window.alert('Oops, algo salió mal. Parece que la entrada indicada no es un Grafo Acíclico Dirigido. Verifícala y vuelve a intentarlo');
    proc = false;
    done = true;
    window.alert('Terminado! Para probar otra simulación presiona "Reset"');
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Tutorial
document.getElementById("ant1").addEventListener("click",function(){
    document.getElementById("Tutorial_1").style.display = "none";
    proc = false;
});
document.getElementById("sig1").addEventListener("click",function(){
    document.getElementById("Tutorial_1").style.display = "none";
    document.getElementById("Tutorial_2").style.display = "block";
});
document.getElementById("ant6").addEventListener("click",function(){
    document.getElementById("Tutorial_6").style.display = "none";
    document.getElementById("Tutorial_5").style.display = "block";
});
document.getElementById("sig6").addEventListener("click",function(){
    document.getElementById("Tutorial_6").style.display = "none";
    proc = false;
});

for(let i=2;i<=5;i++){
    document.getElementById("ant"+i).addEventListener("click",function(){
        document.getElementById("Tutorial_"+(i-1)).style.display = "block";
        document.getElementById("Tutorial_"+(i)).style.display = "none";
    });
    document.getElementById("sig"+i).addEventListener("click",function(){
        document.getElementById("Tutorial_"+(i+1)).style.display = "block";
        document.getElementById("Tutorial_"+(i)).style.display = "none";
    });
}