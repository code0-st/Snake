'use strict'

const canvas = document.querySelector('.ground'),
    ctx = canvas.getContext("2d"),
    currentScore = document.querySelector('.info__current-score'),
    bestScore = document.querySelector('.info__best-score'),
    playButton = document.querySelector('.play__button'),
    mainMenu = document.querySelector('.play__menu'),
    loseMenu = document.querySelector('.lose'),
    playAgainButton = document.querySelector('.lose__button'),
    finallyScore = document.querySelector('.lose__title');

const grid = 20;
const FPS = 30;
let playerCurrentScore = 0;
let playerBestScore = 0;
let interval;

const player = {
    dx: 0,
    dy: -grid,
    currentX: (canvas.clientWidth - grid) / 2,
    currentY: (canvas.clientHeight - grid) / 2,

    tail: [],
    tailLength: 3
};

const fruit = {
    fruitX: (canvas.clientWidth - grid) / 2,
    fruitY: (canvas.clientHeight - grid) / 2 - 100
};

const Start = () => {
    if (playButton.classList.contains('inplay') && !loseMenu.classList.contains('inlose')) {
        console.log("Start");
        DrawBegin();
        interval = setInterval(Update, 1000 / FPS);
    } else {
        console.log("Stop");
        DrawBegin();
        clearInterval(interval);
    }
};

function Update(){
    Draw();
    teleport();
};

const DrawBegin = () => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    currentScore.textContent = `Текущий счёт: ${playerCurrentScore}`;
    player.dx = 0,
    player.dy = -grid,
    player.currentX = (canvas.clientWidth - grid) / 2,
    player.currentY = (canvas.clientHeight - grid) / 2,

    player.tail = [],
    player.tailLength = 3
};

const Draw = () => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight); 
    if (player.tailLength === 3) {
        ctx.fillRect(fruit.fruitX, fruit.fruitY, grid, grid);
    }
    move();
};

const teleport = () => {
    if (player.currentX < 0 && player.dx === -grid) {
        player.currentX = canvas.clientWidth;
    } else if (player.currentX > canvas.clientWidth - grid && player.dx === grid) {
        player.currentX = -grid;
    }

    if (player.currentY < 0 && player.dy === -grid) {
        player.currentY = canvas.clientHeight;
    } else if (player.currentY > canvas.clientHeight - grid && player.dy === grid) {
        player.currentY = -grid;
    }

    if (player.currentX === - grid && player.dx === 0) {
        player.currentX = 0;
    }

    if (player.currentX === canvas.clientWidth && player.dx === 0) {
        player.currentX = canvas.clientWidth - grid;
    }

    if (player.currentY === -grid && player.dy === 0) {
        player.currentY = 0;
    }

    if (player.currentY === canvas.clientHeight && player.dy === 0) {
        player.currentY = 0;
    }
};

const move = () => {

    player.currentX += player.dx;
    player.currentY += player.dy;

    player.tail.unshift({
        x: player.currentX,
        y: player.currentY
    });

    if (player.tail.length > player.tailLength) {
        player.tail.pop();
    }

    player.tail.forEach((cell, i) => {
        ctx.fillStyle = `rgb(${0 + i * 3}, ${15 + i * 10}, ${100 + i * 5})`;
        ctx.fillRect(cell.x, cell.y, grid-1, grid-1);
        eatFruit(cell.x, cell.y);
        crash(cell.x, cell.y, i);
    });
};

const crash = (x, y, index) => {
    for (let i = index + 1; i < player.tailLength; i++) {
        if (player.tail[i].x === x && player.tail[i].y === y) {
            console.log(x);
            loseMenu.classList.add('inlose');
            playButton.classList.remove('inplay');
            finallyScore.textContent = `Ваш счёт: ${playerCurrentScore}`;
            if (playerCurrentScore > playerBestScore) {
                playerBestScore = playerCurrentScore;
            }
            bestScore.textContent = `Ваш рекорд: ${playerBestScore}`;
            playerCurrentScore = 0;
            Start();
        }
    }
};

const changeDirection = key => {
    switch (key) {
        case 'KeyW': player.dx = 0; player.dy = -grid;
            //ctx.fillRect(currentX, currentY += velocity*directionY, 50, 50);
            break;
        case 'KeyS': player.dx = 0; player.dy = grid;
            //ctx.fillRect(currentX, currentY += velocity*directionY, 50, 50);
            break;
        case 'KeyA': player.dx = -grid; player.dy = 0;
            //ctx.fillRect(currentX += velocity*directionX, currentY, 50, 50);
            break;
        case 'KeyD': player.dx = grid; player.dy = 0;
            //ctx.fillRect(currentX += velocity*directionX, currentY, 50, 50);
            break;
    }
};

const getRandomInt = (min, max) =>{
  return Math.floor(Math.random() * (max - min)) + min;
};

const eatFruit = (x, y) => {
    if (x === fruit.fruitX && y === fruit.fruitY) {
        player.tailLength++;
        playerCurrentScore += 10;
        currentScore.textContent = `Текущий счёт: ${playerCurrentScore}`;
        
        fruit.fruitX = getRandomInt(0, canvas.clientWidth / grid) * grid;
        fruit.fruitY = getRandomInt(0, canvas.clientHeight / grid) * grid;
    }

    drawFruit();
};

const drawFruit = () => {
    ctx.fillStyle = 'rgb(163, 226, 55)';
    ctx.fillRect(fruit.fruitX, fruit.fruitY, grid, grid);
}

document.addEventListener('keydown', e => {
    console.log(e.code);
    changeDirection(e.code);
});

document.addEventListener('load', () => {
    playerCurrentScore = 0;
    playerBestScore = 0;

    playButton.classList.remove('inplay');
    mainMenu.classList.add('inplay');
    loseMenu.classList.remove('inlose');

    Start();
})

playButton.addEventListener('click', () => {
    playButton.classList.add('inplay');
    mainMenu.classList.add('inplay');

    Start();
});

playAgainButton.addEventListener('click', () => {
    playButton.classList.add('inplay');
    loseMenu.classList.remove('inlose');

    Start();
});

