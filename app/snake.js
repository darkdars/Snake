var sizeWindowX = 400;
var sizeWindowY = 400;
var gray = 51;
var white = 255
var black = 0

class Snake{
    teste = "X";

    constructor(teste) {
        this.teste;
    }
}

class Rectangles{

}

class Game{
    
}

function setup(){
    createCanvas(sizeWindowX, sizeWindowY);
    background(gray);
}

function draw() {
    if (mouseIsPressed){
        fill(black); 
    }else{
        fill(white);
    }

    // rect(x, y, w, h) 
    //x Number: x-coordinate of the rectangle.
    //y Number: y-coordinate of the rectangle.
    //w Number: width of the rectangle.
    //h Number: height of the rectangle. (Optional)
    rect(mouseX, mouseY, 20, 20)
    //ellipse(mouseX, mouseY, 80, 80)
}