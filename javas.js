let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};
let direcao = "rigth";

function criarBG() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarSnake() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

function iniciarJogo() {
  criarBG();
  criarSnake();

  let snakex = snake[0].x;
  let snakey = snake[0].y;

  if (direcao == "right") snakex += box;
  if (direcao == "left") snakex -= box;
  if (direcao == "down") snakey += box;
  if (direcao == "up") snakey -= box;

  snake.pop();

  let newHead = {
    x: snakex,
    y: snakey,
  };

  snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);
