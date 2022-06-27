
const playGround = document.querySelector('#playGround')
let snake = [28, 47, 66]
let direction = 'down'
let stone
let started = false
let interval
let speed = 200
let record = 0;

document.addEventListener('keydown', (e)=>{
    if(e.keyCode === 40){
        direction = 'down'
    }else if(e.keyCode === 38){
        direction = 'up'
    }else if(e.keyCode === 37){
        direction = 'left'
    }else if(e.keyCode === 39){
        direction = 'right'
    }
})

const easyButton = document.querySelector('#easyButton') as Element;
easyButton.addEventListener('click', ()=>{
    init('easy');
})

const middleButton = document.querySelector('#middleButton') as Element
middleButton.addEventListener('click', ()=>{
    init('middle');
})

const advancedButton = document.querySelector('#advancedButton') as Element;
advancedButton.addEventListener('click', ()=>{
    init('advanced');
})

const overLay = document.querySelector('#overLay') as HTMLDivElement;
overLay.style.visibility = 'visible'
overLay.style.borderColor = 'rgb(17,17,215)'
overLay.querySelector('.overlayHeader')!.textContent = 'select level'


function init(level){
    snake = [28, 47, 66]
    direction = 'down'
    started = false
    clearInterval(interval)
    playGround!.innerHTML = ''
    speed = level === 'easy' ? 200 : level === 'middle' ? 100 : 50;

    const overLay = document.querySelector('#overLay') as HTMLDivElement; 
    overLay.style.visibility = 'hidden';

    const score = document.querySelector('#score');
    score!.textContent = '0';

    for(let i=0; i<266; i++){
        const square = document.createElement('div');
        square.className = `square s${i} ${snake.includes(i)?'snake': ''}`;
        playGround!.appendChild(square);
    }
    throwStone();
} 

function throwStone(){
    stone = getRandomInt(0, 265, snake);
    const stoneSquare = document.querySelector(`.s${stone}`) as HTMLDivElement;
    stoneSquare.classList.add('stone');
    if(!started){
        interval = setInterval(() => move(),speed); 
    }
    started = true;
}

function getRandomInt(min, max, snake) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let result = Math.floor(Math.random() * (max - min)) + min
    while (snake.includes(result)) {
        result = Math.floor(Math.random() * (max - min)) + min
    }
    return result;
  }

function move(){
    const oldSnake = snake;
    snake.shift()
    switch(direction){
        case 'down':
            snake.push(oldSnake[oldSnake.length-1] + 19) 
            break;
        case 'up':
            snake.push(oldSnake[oldSnake.length-1] - 19) 
            break;
        case 'left':
            snake.push(oldSnake[oldSnake.length-1] - 1)
            break;
        case 'right':
            snake.push(oldSnake[oldSnake.length-1] + 1)
            break;
        }

    const snakeSquares = document.querySelectorAll('.snake')

    const newSnakeSquare = document.querySelector(`.s${snake[snake.length-1]}`)

    // snake hit snake - game over
    if(newSnakeSquare?.classList.contains('snake')){
        clearInterval(interval)
        const overLay = document.querySelector('#overLay') as HTMLDivElement;
        overLay.style.visibility = 'visible'
        overLay.querySelector('.overlayHeader')!.textContent = 'game over!'
        overLay.style.borderColor = 'rgb(255, 0, 0)'
        return
    }

    newSnakeSquare?.classList.add('snake')
    
    snakeSquares.forEach(snakeSquare => {
        if(!snake.includes(parseInt(snakeSquare.classList[1].split('s')[1]))){
            snakeSquare.classList.remove('snake')
        }
    })

    // snake eats stone - points
    if(snake[snake.length-1] === stone){
        const stoneSquare = <HTMLDivElement>document.querySelector(`.s${stone}`);
        stoneSquare.classList.remove('stone')
        snake.unshift(oldSnake[0])
        const score = <HTMLDivElement>document.querySelector('#score')
        score.textContent = `${parseInt(score.textContent? score.textContent: '0') + 25}`;
        const recordElement = <HTMLDivElement>document.querySelector('#record')
        if(parseInt(score.textContent) > parseInt(recordElement?.textContent? recordElement.textContent: '0')){
            recordElement.textContent = score.textContent
        }
        throwStone()
    }

    //snake hit top or bottom - game over
    if(!newSnakeSquare?.classList.length){
        clearInterval(interval)
        const overLay = document.querySelector('#overLay') as HTMLDivElement;
        overLay.style.visibility = 'visible';
        overLay.querySelector('.overlayHeader')!.textContent = 'game over!';
        overLay.style.borderColor = 'rgb(255, 0, 0)';
    }

    //snake hit left or right - game over
    if(((snake[snake.length-1] % 19 === 18) && direction === "left") || ((snake[snake.length-1] % 19 === 0) && direction === "right")){
        clearInterval(interval)
        const overLay = document.querySelector('#overLay') as HTMLDivElement;
        overLay.style.visibility = 'visible'
        overLay.querySelector('.overlayHeader')!.textContent = 'game over!'
        overLay.style.borderColor = 'rgb(255, 0, 0)'
    }
 }