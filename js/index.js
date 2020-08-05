'use strict'

const canvas = document.querySelector('.ground'),
ctx = canvas.getContext("2d");

const grid = 30;
const FPS = 20;

const player = {
    dx: 0,
    dy: -grid,
    currentX: (canvas.clientWidth - grid) / 2,
    currentY: (canvas.clientHeight - grid) / 2,

    tail: [],
    tailLength: 80
};

const Start = () => {
    DrawBegin();
    setInterval(Update, 1000 / FPS);
};

const Update = () => {
    Draw();
    teleport();
};

const DrawBegin = () => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
};

const Draw = () => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight); // Очистка поля
    move();
};

const teleport = () => {
    player.currentX = player.currentX < 0 ? canvas.clientWidth : player.currentX > canvas.clientWidth ? -grid : player.currentX;
    player.currentY = player.currentY < 0 ? canvas.clientHeight : player.currentY > canvas.clientHeight ? -grid : player.currentY;
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
        ctx.fillStyle = `rgb(${24+i*3}, ${36+i*10}, ${151+i*5})`;
        ctx.fillRect(cell.x, cell.y, grid, grid);
        console.log(`PlayerX: ${player.currentX}, PlayerY: ${player.currentY}
            CellX: ${cell.x}, CellY: ${cell.y}
            DX: ${player.currentX - cell.x}, DY: ${player.currentY - cell.y}`);
    });
};


const changeDirection = key => {
    switch(key) {
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
}

document.addEventListener('load', Start());

document.addEventListener('keydown', e => {
    console.log(e.code);
    changeDirection(e.code);
})


