const SNAKE_SPEED = 100;
const gameBoard = document.getElementById("game-board");
const gameTimer = document.getElementById("timer");
const gameScore = document.getElementById("length");
const snakeBody = [
    {x: 11, y: 11}
];
let go_on = 1;
let foodX = 0;
let foodY = 0;

const main = () => {
    if (go_on == 0) {
        draw();
    } else if (go_on == 1){
        init();
        go_on = 0;    
    } else if (go_on == 2){
        go_on = 4;
        alert("You lose!");
    } else if (go_on == 3){
        go_on = 4;
        alert("You win!");
    }
}

setInterval(main, 1000 / SNAKE_SPEED);
setInterval(function(){gameTimer.textContent  = parseInt(gameTimer.textContent) + 1}, 1000);

document.onkeydown = function(even){
    var jpCode = even.keyCode;
    var keychar = String.fromCharCode(jpCode);
    let towards = 0;
    switch(keychar) {
        case 'W':{
            towards = 0;
            break;
        }
        case 'A':{
            towards = 1;
            break;
        }
        case 'S':{
            towards = 2;
            break;
        }
        case 'D':{
            towards = 3;
            break;
        }
    }

    switch(towards) {
        case 0:{
            const newHead = {x: snakeBody[0].x, y: snakeBody[0].y - 1};
            snakeBody.pop();
            snakeBody.unshift(newHead);
            break;
        }
        case 1:{
            const newHead = {x: snakeBody[0].x - 1, y: snakeBody[0].y};
            snakeBody.pop();
            snakeBody.unshift(newHead);
            break;
        }
        case 2:{
            const newHead = {x: snakeBody[0].x, y: snakeBody[0].y + 1};
            snakeBody.pop();
            snakeBody.unshift(newHead);
            break;
        }
        case 3:{
            const newHead = {x: snakeBody[0].x + 1, y: snakeBody[0].y};
            snakeBody.pop();
            snakeBody.unshift(newHead);
            break;
        }
    }
    for (let i = 0; i < snakeBody.length; ++ i) {
        if (snakeBody[i].x == foodX && snakeBody[i].y == foodY) {
            const newNode = {x: snakeBody[snakeBody.length - 1].x + 1, y: snakeBody[snakeBody.length - 1].y};
            snakeBody.push(newNode);
            init();
        }
    }
    if (snakeBody.length == 20) {
        go_on = 3;
    }
    for (let i = 0; i < snakeBody.length; ++ i) {
        if (snakeBody[i].x < 1 || snakeBody[i].x > 48 || snakeBody[i].y < 1 || snakeBody[i].y > 48) {
            go_on = 2;
        }
    }
    gameScore.textContent = snakeBody.length;
}

const init = () => {
    foodX = Math.floor(Math.random() * 50);
    foodY = Math.floor(Math.random() * 50);
    foodX = Math.max(1, foodX);
    foodY = Math.max(1, foodY);
    foodX = Math.min(foodX, 48);
    foodY = Math.min(foodY, 48);
    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = foodY;
    foodElement.style.gridColumnStart = foodX;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);
}

const draw = () => {
    for (let i = 0; i < snakeBody.length; i++) {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = snakeBody[i].y;
        snakeElement.style.gridColumnStart = snakeBody[i].x;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    }
    let childList = gameBoard.childNodes;
    for (let i = 0; i < childList.length; i ++) {
        let toEliminate = true;
        if (childList[i].classList.contains("snake")) {
            for (let j = 0;j < snakeBody.length; j ++) {
                if (childList[i].style.gridRowStart == snakeBody[j].y && childList[i].style.gridColumnStart == snakeBody[j].x) {
                    toEliminate = false;
                }
            }
        }
        if (childList[i].classList.contains("food")) {
            if (childList[i].style.gridRowStart == foodY && childList[i].style.gridColumnStart == foodX) {
                toEliminate = false;
            }
        }
        if (toEliminate) {
            gameBoard.removeChild(childList[i]);
        }
    }
}