let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};
let direcao = "rigth";
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box,
};

let hh = 0;
let mm = 0;
let ss = 0;
let tempo = 1000;
let cron;

function start() {
  let hh = 0;
  let mm = 0;
  let ss = 0;
  cron = setInterval(() => {
    timer();
  }, tempo);
}

function stopc() {
  clearInterval(cron);
}

function timer() {
  ss++;
  if (ss == 60) {
    ss = 0;
    mm++;
    if (mm == 60) {
      mm = 0;
      hh++;
    }
  }

  let formato =
    (hh < 10 ? "0" + hh : hh) +
    ":" +
    (mm < 10 ? "0" + mm : mm) +
    ":" +
    (ss < 10 ? "0" + ss : ss);
  document.getElementById("contador").innerText = formato;
}

function criarBG() {
  context.fillStyle = "lightblue";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarSnake() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = "blue";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function drawFood() {
  context.fillStyle = "green";
  context.fillRect(food.x, food.y, box, box);
}

document.addEventListener("keydown", update);

function update(event) {
  if (event.keyCode == 37 && direcao != "right") direcao = "left";
  if (event.keyCode == 38 && direcao != "down") direcao = "up";
  if (event.keyCode == 39 && direcao != "left") direcao = "right";
  if (event.keyCode == 40 && direcao != "up") direcao = "down";
}

function iniciarJogo() {
  if (snake[0].x > 15 * box && direcao == "right") snake[0].x = 0;
  if (snake[0].x < 0 && direcao == "left") snake[0].x = 16 * box;
  if (snake[0].y > 15 * box && direcao == "down") snake[0].y = 0;
  if (snake[0].y < 0 && direcao == "up") snake[0].y = 16 * box;

  for (i = 1; i < snake.length; i++) {
    start();
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(jogo);
      alert("Game Over!");
      stopc();
    }
  }

  criarBG();
  criarSnake();
  drawFood();

  let snakex = snake[0].x;
  let snakey = snake[0].y;

  if (direcao == "right") snakex += box;
  if (direcao == "left") snakex -= box;
  if (direcao == "down") snakey += box;
  if (direcao == "up") snakey -= box;

  if (snakex != food.x || snakey != food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
  }

  let newHead = {
    x: snakex,
    y: snakey,
  };

  snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 150);
