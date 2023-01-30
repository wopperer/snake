var playGround = document.querySelector('#playGround');
var easyButton = document.querySelector('#easyButton');
var overLay = document.querySelector('#overLay');
var middleButton = document.querySelector('#middleButton');
var advancedButton = document.querySelector('#advancedButton');
var snake = [28, 47, 66];
var direction = 'down';
var stone;
var started = false;
var interval;
var speed = 200;
document.addEventListener('keydown', function (e) {
    if (e.keyCode === 40) {
        direction = 'down';
    }
    else if (e.keyCode === 38) {
        direction = 'up';
    }
    else if (e.keyCode === 37) {
        direction = 'left';
    }
    else if (e.keyCode === 39) {
        direction = 'right';
    }
});
easyButton.addEventListener('click', function () {
    init('easy');
});
middleButton.addEventListener('click', function () {
    init('middle');
});
advancedButton.addEventListener('click', function () {
    init('advanced');
});
overLay.style.visibility = 'visible';
overLay.style.borderColor = 'rgb(17,17,215)';
overLay.querySelector('.overlayHeader').textContent = 'select level';
function init(level) {
    snake = [28, 47, 66];
    direction = 'down';
    started = false;
    clearInterval(interval);
    playGround.innerHTML = '';
    speed = level === 'easy' ? 200 : level === 'middle' ? 100 : 50;
    var overLay = document.querySelector('#overLay');
    overLay.style.visibility = 'hidden';
    var score = document.querySelector('#score');
    score.textContent = '0';
    for (var i = 0; i < 266; i++) {
        var square = document.createElement('div');
        square.className = "square s".concat(i, " ").concat(snake.includes(i) ? 'snake' : '');
        playGround.appendChild(square);
    }
    throwStone();
}
function throwStone() {
    stone = getRandomInt(0, 265, snake);
    var stoneSquare = document.querySelector(".s".concat(stone));
    stoneSquare.classList.add('stone');
    if (!started) {
        interval = setInterval(function () { move(); }, speed);
    }
    started = true;
}
function getRandomInt(min, max, snake) {
    min = Math.ceil(min);
    max = Math.floor(max);
    var result = Math.floor(Math.random() * (max - min)) + min;
    while (snake.includes(result)) {
        result = Math.floor(Math.random() * (max - min)) + min;
    }
    return result;
}
function move() {
    var oldSnake = snake;
    snake.shift();
    switch (direction) {
        case 'down':
            snake.push(oldSnake[oldSnake.length - 1] + 19);
            break;
        case 'up':
            snake.push(oldSnake[oldSnake.length - 1] - 19);
            break;
        case 'left':
            snake.push(oldSnake[oldSnake.length - 1] - 1);
            break;
        case 'right':
            snake.push(oldSnake[oldSnake.length - 1] + 1);
            break;
    }
    var snakeSquares = document.querySelectorAll('.snake');
    var newSnakeSquare = document.querySelector(".s".concat(snake[snake.length - 1]));
    // snake hit snake - game over
    if (newSnakeSquare === null || newSnakeSquare === void 0 ? void 0 : newSnakeSquare.classList.contains('snake')) {
        clearInterval(interval);
        var overLay_1 = document.querySelector('#overLay');
        overLay_1.style.visibility = 'visible';
        overLay_1.querySelector('.overlayHeader').textContent = 'game over!';
        overLay_1.style.borderColor = 'rgb(255, 0, 0)';
        return;
    }
    newSnakeSquare === null || newSnakeSquare === void 0 ? void 0 : newSnakeSquare.classList.add('snake');
    snakeSquares.forEach(function (snakeSquare) {
        if (!snake.includes(parseInt(snakeSquare.classList[1].split('s')[1]))) {
            snakeSquare.classList.remove('snake');
        }
    });
    // snake eats stone - points
    if (snake[snake.length - 1] === stone) {
        var stoneSquare = document.querySelector(".s".concat(stone));
        stoneSquare.classList.remove('stone');
        snake.unshift(oldSnake[0]);
        var score = document.querySelector('#score');
        score.textContent = "".concat(parseInt(score.textContent ? score.textContent : '0') + 25);
        var recordElement = document.querySelector('#record');
        if (parseInt(score.textContent) > parseInt((recordElement === null || recordElement === void 0 ? void 0 : recordElement.textContent) ? recordElement.textContent : '0')) {
            recordElement.textContent = score.textContent;
        }
        throwStone();
    }
    // snake hit top or bottom - game over
    if (!(newSnakeSquare === null || newSnakeSquare === void 0 ? void 0 : newSnakeSquare.classList.length)) {
        clearInterval(interval);
        var overLay_2 = document.querySelector('#overLay');
        overLay_2.style.visibility = 'visible';
        overLay_2.querySelector('.overlayHeader').textContent = 'game over!';
        overLay_2.style.borderColor = 'rgb(255, 0, 0)';
    }
    // snake hit left or right - game over
    if (((snake[snake.length - 1] % 19 === 18) && direction === 'left') || ((snake[snake.length - 1] % 19 === 0) && direction === 'right')) {
        clearInterval(interval);
        var overLay_3 = document.querySelector('#overLay');
        overLay_3.style.visibility = 'visible';
        overLay_3.querySelector('.overlayHeader').textContent = 'game over!';
        overLay_3.style.borderColor = 'rgb(255, 0, 0)';
    }
}
