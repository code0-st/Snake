'use strict'

const canvas = document.querySelector('.ground'),
    ctx = canvas.getContext("2d");

const playerVelocity = 10;
const playerSize = 40;
const FPS = 60;
let directionX = 0;
let directionY = -1;
let currentX = (canvas.clientWidth - playerSize) / 2;
let currentY = (canvas.clientHeight - playerSize) / 2;

const DrawBegin = () => {
    ctx.fillStyle = "rgb(200,0,0)";

    ctx.fillRect(currentX, currentY, playerSize, playerSize);
}

const Draw = () => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect(currentX += playerVelocity*directionX, currentY += playerVelocity*directionY, playerSize, playerSize);    
}

const Update = () => {
    Draw();
    teleport();
    console.log(`current X: ${currentX}
    current Y: ${currentY}`);
}

const Start = () => {
    DrawBegin();
    setInterval(Update, 1000 / FPS);
}

const teleport = () => {
    currentX = currentX < 0 ? canvas.clientWidth - playerSize : currentX > canvas.clientWidth - playerSize ? 0 : currentX;
    currentY = currentY < 0 ? canvas.clientHeight - playerSize : currentY > canvas.clientHeight - playerSize ? 0 : currentY;
}

document.addEventListener('load', Start());

document.addEventListener('keydown', e => {
    console.log(e.code);
    Move(e.code);
})


function Move( key) {
    switch(key) {
        case 'KeyW': directionY = -1; directionX = 0;
            //ctx.fillRect(currentX, currentY += velocity*directionY, 50, 50);
            break;
        case 'KeyS': directionY = 1; directionX = 0;
            //ctx.fillRect(currentX, currentY += velocity*directionY, 50, 50);
            break;
        case 'KeyA': directionX = -1; directionY = 0;
            //ctx.fillRect(currentX += velocity*directionX, currentY, 50, 50);
            break;
        case 'KeyD': directionX = 1; directionY = 0;
            //ctx.fillRect(currentX += velocity*directionX, currentY, 50, 50);
            break;
    }  
}
