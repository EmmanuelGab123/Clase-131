imagen = "";
status = "";
objetos = [];
function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Estatus: detectando objetos";
    video.hide();
}
function preload(){
    imagen = loadImage("Puebla.jpg");
}
function draw(){
    image(video,0,0,380,380);
    if(status!=""){
        r = random(255);
        g = random(255);
        b = random(255)
        for(var i=0;i<objetos.length;i++){
            document.getElementById("status").innerHTML = "Estatus: objeto detectado";
            document.getElementById("numero_objetos").innerHTML = "Numero de objetos detectados: "+objetos.length;
            fill(r,g,b);
            porcentaje = floor(objetos[i].confidence*100);
            text(objetos[i].label+" "+porcentaje+"%",objetos[i].x,objetos[i].y);
            noFill();
            stroke(r,g,b);
            rect(objetos[i].x,objetos[i].y,objetos[i].width,objetos[i].height);
        }
    }
    /*fill("#afef00");
    text("Perro",45,75);
    noFill();
    rect(30,60,450,350);
    stroke("#5d771a");
    fill("#afef00")
    text("Gato", 320,95);
    noFill();
    rect(310,80,300,350);
    stroke("#5d771a")*/
}
function modelLoaded(){
    console.log("modelo cargado");
    status = true;
    objectDetector.detect(video,gotResult);
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        objetos = results;
    }
}