const GameHooks = {
  onGameStart: []
};

let player = { x: 1, y: 1 };
let maze = Array.from({ length: 10 }, () => Array(10).fill(0));
let moveDirection = null;
let score = 0;
let nullborns = [];

function startGame(mode) {
  document.getElementById("menu").style.display = "none";
  document.getElementById("gameCanvas").style.display = "block";
  GameHooks.onGameStart.forEach(fn => fn());
  draw();
}

function tapMove(dir) {
  moveDirection = dir;
}

function teleportPlayer() {
  player.x = Math.floor(Math.random() * 10);
  player.y = Math.floor(Math.random() * 10);
  draw();
}

function draw() {
  const ctx = document.getElementById("gameCanvas").getContext("2d");
  ctx.clearRect(0, 0, 600, 600);
  ctx.fillStyle = "green";
  ctx.beginPath();
  ctx.arc(player.x * 60 + 30, player.y * 60 + 30, 20, 0, Math.PI * 2);
  ctx.fill();
}
