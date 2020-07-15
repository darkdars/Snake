// Colors
var gray = 51;
var white = 255;
var black = 0;
var yellow = [255, 255, 0];
var violet = [238, 130, 238];
var board = null

// Enviromnent variables
var sizeWindowX = 300;
var sizeWindowY = 300;
var frame_rate = 10;
var size = 10;

class Blocks {
    _pos_x = -1;
    _pos_y = -1;

    constructor(pos_x, pos_y) {
        this._pos_x = pos_x;
        this._pos_y = pos_y;
    }

    get pos_x() {
        return this._pos_x;
    }
    set pos_x(value) {
        this._pos_x = value;
    }

    get pos_y() {
        return this._pos_y;
    }
    set pos_y(value) {
        this._pos_y = value;
    }


}

class Snake {
    _head = null;
    _body = [];
    _xspeed = 0;
    _yspeed = 0;
    _speed = 1;
    _total = 0;

    constructor() {
        this._head = new Blocks(floor(sizeWindowX / 2), floor(sizeWindowY / 2));
        this._body = [];
        this._yspeed = -this._speed;
        this._xspeed = 0;
        this._total = 0;
    }

    get head() {
        return this._head;
    }

    set head(value) {
        this._head = value;
    }

    get body() {
        return this._body;
    }

    set body(value) {
        this._body = value;
    }

    get xspeed() {
        return this._xspeed;
    }

    set xspeed(value) {
        this._xspeed = value;
    }

    get yspeed() {
        return this._yspeed;
    }

    set yspeed(value) {
        this._yspeed = value;
    }

    get speed() {
        return this._speed;
    }
    set speed(value) {
        this._speed = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }

    movement() {
        this.bodyMovement();
        this.headMovement();
        this.status();
    }

    headMovement() {
        let head = this.head;

        head.pos_x += this.xspeed * size;
        head.pos_y += this.yspeed * size;

       // head.pos_x = constrain(head.pos_x, 0, sizeWindowX - size);
       // head.pos_y = constrain(head.pos_y, 0, sizeWindowY - size);
    }

    bodyMovement() {
        if(this.body.length > 0){
            for (let i = 0; i < this.body.length - 1; i++) {
                this.body[i] = this.body[i + 1];
            }
            this.body[this.body.length - 1] = new Blocks(this.head.pos_x, this.head.pos_y);
        }
    }

    eat() {
        this.total += 1;
        this.addTail();
    }

    addTail() {
        let pos_x = this.head.pos_x;
        let pos_y = this.head.pos_y;

        this.body.push(new Blocks(pos_x, pos_y));
    }


    status() {

        if (this.checkColision()) {
            console.log("New Start!");
            this._head = new Blocks(floor(sizeWindowX / 2), floor(sizeWindowY / 2));
            this._body = [];
            this._yspeed = -this._speed;
            this._xspeed = 0;
            this._total = 0;
        }

    }

    checkColision() {
        var head = this.head;

        for (var i = 0; i < this.body.length; i++) {
            var pos = this.body[i];
            var d = dist(head.pos_x, head.pos_y, pos.pos_x, pos.pos_y);

            if (d < size ) {
                return true;
            }

        }

        if(head.pos_x < 0 || head.pos_x >= sizeWindowX ||
            head.pos_y < 0 || head.pos_y > sizeWindowY){
            return true;
        }

        return false;
    }

}

class Board {
    _snake = null;
    _food = null;

    constructor() {
        this._snake = new Snake();
        this._food = this.randomFood();
    }

    get snake() {
        return this._snake;
    }

    set snake(value) {
        this._snake = value;
    }

    get food() {
        return this._food;
    }

    set food(value) {
        this._food = value;
    }

    getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    randomFood() {
        var cols = floor(sizeWindowX / size);
        var rows = floor(sizeWindowY / size);
        let x = floor(this.getRandom(1, cols - 1) * size);
        let y = floor(this.getRandom(1, rows - 1) * size);
        return new Blocks(x, y);
    }

    snackMovement() {
        this.snake.movement();
        this.snakeEat();
    }

    snakeEat() {
        if (this.checkColisionBetweenTwoBlocks(this.snake.head, this.food)) {
            this.food = this.randomFood();
            this.snake.eat();
        }
    }

    checkColisionBetweenTwoBlocks(block1, block2) {
        var d = dist(block1.pos_x, block1.pos_y, block2.pos_x, block2.pos_y);
        if (d < size ) {
            return true;
        } else {
            return false;
        }
    }

    update() {
        this.snackMovement();
    }

    drawSnake() {
        fill(violet);
        let head = this.snake.head;
        rect(head.pos_x, head.pos_y, size, size);

        fill(white);
        let body = this.snake.body;
        for (let i = 0; i < body.length; i++) {
            rect(body[i].pos_x, body[i].pos_y, size, size);
        }
    }

    drawFood() {
        fill(yellow);
        rect(this.food.pos_x, this.food.pos_y, size, size);
    }

    show() {
        this.drawSnake();
        this.drawFood();
    }

    up() {
        if (this.snake.xspeed != 0) {
            this.snake.xspeed = 0;
            this.snake.yspeed = - this.snake.speed;
        }
    }

    left() {
        if (this.snake.yspeed != 0) {
            this.snake.xspeed = - this.snake.speed;
            this.snake.yspeed = 0;
        }

    }

    down() {
        if (this.snake.xspeed != 0) {
            this.snake.xspeed = 0;
            this.snake.yspeed = this.snake.speed;
        }
    }

    right() {
        if (this.snake.yspeed != 0) {
            this.snake.xspeed = this.snake.speed;
            this.snake.yspeed = 0;
        }
    }
}

function setup() {
    board = new Board();
    createCanvas(sizeWindowX, sizeWindowY);
    background(gray);
    frameRate(frame_rate);

}

function draw() {
    background(gray);
    board.update();
    board.show();

}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        board.left();
    } else if (keyCode === RIGHT_ARROW) {
        board.right();
    } else if (keyCode === UP_ARROW) {
        board.up();
    } else if (keyCode === DOWN_ARROW) {
        board.down();
    }
}