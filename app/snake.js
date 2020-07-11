var gray = 51;
var white = 255;
var black = 0;
var board = null
var sizeWindowX = 600;
var sizeWindowY = 600;


class Snake {
    _body = [];
    _xspeed = 0;
    _yspeed = 0;
    _speed = 1;

    constructor() {
        this._body.push(new Blocks(sizeWindowX / 2, sizeWindowY / 2));
        this._body.push(new Blocks(sizeWindowX / 2, sizeWindowY / 2 - 10));
        this._body.push(new Blocks(sizeWindowX / 2, sizeWindowY / 2 -20));
        this._yspeed = -this._speed;
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

    snackMovement() {
        this.bodyMovement();
        this.headMovement();


    }

    headMovement() {
        let body = this.body[0];

        body.pos_x += this.xspeed * body.size_x;
        body.pos_y += this.yspeed * body.size_y;

        body.pos_x = constrain(body.pos_x, 0 , sizeWindowX - body._size_x);
        body.pos_y = constrain(body.pos_y, 0 , sizeWindowY - body.size_y);
    }

    bodyMovement() {
        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i].pos_x = this.body[i - 1].pos_x;
            this.body[i].pos_y = this.body[i - 1].pos_y;
        }
    }

}

class Blocks {
    _pos_x = -1;
    _pos_y = -1;
    _size_x = 10;
    _size_y = 10;
    _color = 0;

    constructor(pos_x, pos_y, color) {
        this._pos_x = pos_x;
        this._pos_y = pos_y;
        this._color = color;
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

    get size_y() {
        return this._size_y;
    }
    set size_y(value) {
        this._size_y = value;
    }

    get size_x() {
        return this._size_x;
    }
    set size_x(value) {
        this._size_x = value;
    }

}

class Board {
    _snake = null;

    constructor() {
        this._snake = new Snake();
    }

    get snake() {
        return this._snake;
    }
    set snake(value) {
        this._snake = value;
    }

    snackMovement() {
        this.snake.snackMovement();
    }

    update() {
        this.snackMovement();
    }

    checkLimits() {

    }

    drawSnake() {
        fill(white);
        let body = this.snake.body;
        for (let i = 0; i < body.length; i++) {
            rect(body[i].pos_x, body[i].pos_y, body[i].size_x, body[i].size_y);
        }
    }

    show() {
        this.drawSnake();
    }

    upArrow() {
        this.snake.xspeed = 0;
        this.snake.yspeed = - this.snake.speed;
    }

    leftArrow() {
        this.snake.xspeed = - this.snake.speed;
        this.snake.yspeed = 0;
    }

    downArrow() {
        this.snake.xspeed = 0;
        this.snake.yspeed = this.snake.speed;
    }

    rightArrow() {
        this.snake.xspeed = this.snake.speed;
        this.snake.yspeed = 0;
    }

}

function setup() {
    board = new Board();
    createCanvas(sizeWindowX, sizeWindowY);
    background(gray);
    frameRate(10);

}

function draw() {
    background(gray);
    board.update();
    board.show();

}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        board.leftArrow();
    } else if (keyCode === RIGHT_ARROW) {
        board.rightArrow();
    } else if (keyCode === UP_ARROW) {
        board.upArrow();
    } else if (keyCode === DOWN_ARROW) {
        board.downArrow();
    }
}
