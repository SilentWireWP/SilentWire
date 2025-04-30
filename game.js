
// === GAME CONFIG & HOOKS ===
const GameConfig = {
  maxNullborns: 10,
  hardcoreScore: 500,
  nullbornSpawnStep: 50,
  mode: "normal",
  debugMode: true
};

const GameHooks = {
  onNullbornSpawn: [],
  onScoreChange: [],
  onGameStart: []
};

let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let score = 0;
let level = 1;
let gameRunning = false;

// === MAZE ===
const mapCols = 15;
const mapRows = 15;
const cellSize = canvas.width / mapCols;

const CELL_EMPTY = 0;
const CELL_WALL = 1;
const CELL_BOOST = 2;
const CELL_TRAP = 3;
const CELL_TELEPORT = 4;

let maze = [];

function initMaze() {
  maze = Array.from({ length: mapRows }, () => Array(mapCols).fill(CELL_EMPTY));

  for (let y = 0; y < mapRows; y++) {
    for (let x = 0; x < mapCols; x++) {
      if (Math.random() < 0.2 && !(x === 1 && y === 1)) maze[y][x] = CELL_WALL;
    }
  }

  placeRandomObjects(CELL_BOOST, 5);
  placeRandomObjects(CELL_TRAP, 5);
  placeRandomObjects(CELL_TELEPORT, 1);
}

function placeRandomObjects(type, count) {
  let placed = 0;
  while (placed < count) {
    let x = Math.floor(Math.random() * mapCols);
    let y = Math.floor(Math.random() * mapRows);
    if (maze[y][x] === CELL_EMPTY && !(x === player.x && y === player.y)) {
      maze[y][x] = type;
      placed++;
    }
  }
}

function drawMaze() {
  for (let y = 0; y < mapRows; y++) {
    for (let x = 0; x < mapCols; x++) {
      let color = "#000";
      switch (maze[y][x]) {
        case CELL_WALL:
          color = GameConfig.mode === "hardcore" && score >= GameConfig.hardcoreScore ? "#330000" : "#003300";
          break;
        case CELL_BOOST: color = "#003366"; break;
        case CELL_TRAP: color = "#330033"; break;
        case CELL_TELEPORT: color = "#003300"; break;
      }
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 5;
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      ctx.shadowBlur = 0;
    }
  }
}

// === PLAYER ===
let player = { x: 1, y: 1, lives: 4, emoji: "😶", speedBoost: false };

function drawPlayer() {
  ctx.fillStyle = "#00ff00";
  ctx.font = `${cellSize * 0.8}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(player.emoji, (player.x + 0.5) * cellSize, (player.y + 0.5) * cellSize);
}

// === NULLBORNS ===
let nullborns = [];

function spawnNullborn() {
  let attempts = 0;
  while (attempts < 100) {
    let x = Math.floor(Math.random() * mapCols);
    let y = Math.floor(Math.random() * mapRows);
    let distance = Math.abs(player.x - x) + Math.abs(player.y - y);
    if (maze[y][x] === CELL_EMPTY && distance > 5 && !nullborns.some(nb => nb.x === x && nb.y === y)) {
      nullborns.push({ x, y, speed: GameConfig.mode === 'hardcore' ? 0.5 : 0.2, emoji: "👽" });
      GameHooks.onNullbornSpawn.forEach(fn => fn());
      break;
    }
    attempts++;
  }
}

function moveNullborns() {
  for (let nb of nullborns) {
    let dx = player.x - nb.x;
    let dy = player.y - nb.y;
    let moveX = dx !== 0 ? Math.sign(dx) : 0;
    let moveY = dy !== 0 ? Math.sign(dy) : 0;
    let newX = nb.x + (Math.abs(dx) > Math.abs(dy) ? moveX : 0);
    let newY = nb.y + (Math.abs(dy) >= Math.abs(dx) ? moveY : 0);
    if (maze[newY]?.[newX] === CELL_EMPTY && !nullborns.some(o => o !== nb && o.x === newX && o.y === newY)) {
      nb.x = newX;
      nb.y = newY;
    }
    if (nb.x === player.x && nb.y === player.y) {
      player.lives = 0;
    }
  }
}

function drawNullborns() {
  for (let nb of nullborns) {
    ctx.fillStyle = "#ff0000";
    ctx.font = `${cellSize * 0.8}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(nb.emoji, (nb.x + 0.5) * cellSize, (nb.y + 0.5) * cellSize);
  }
}

// === MOVEMENT ===
let moveDirection = null;
let moveInterval = null;

function startMoving() {
  if (moveInterval) return;
  moveInterval = setInterval(() => {
    if (!moveDirection) return;
    const dir = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] }[moveDirection];
    if (!dir) return;
    const [dx, dy] = dir;
    const newX = player.x + dx;
    const newY = player.y + dy;
    if (newX >= 0 && newY >= 0 && newX < mapCols && newY < mapRows && maze[newY][newX] !== CELL_WALL) {
      player.x = newX;
      player.y = newY;
      handleTile(maze[newY][newX]);
    }
  }, player.speedBoost ? 100 : 200);
}

function stopMoving() {
  clearInterval(moveInterval);
  moveInterval = null;
  moveDirection = null;
}

function handleTile(tile) {
  if (tile === CELL_TRAP) {
    player.lives -= 0.5;
    player.emoji = "😨";
  } else if (tile === CELL_BOOST) {
    player.speedBoost = true;
    player.emoji = "😎";
    setTimeout(() => { player.speedBoost = false; }, 5000);
  } else if (tile === CELL_TELEPORT) {
    teleportPlayer();
  }
}

function teleportPlayer() {
  let empty = [];
  for (let y = 0; y < mapRows; y++) {
    for (let x = 0; x < mapCols; x++) {
      if (maze[y][x] === CELL_EMPTY) empty.push([x, y]);
    }
  }
  const [tx, ty] = empty[Math.floor(Math.random() * empty.length)];
  player.x = tx;
  player.y = ty;
}

// === KEYBOARD ===
document.addEventListener('keydown', (e) => {
  if (!moveDirection) {
    if (e.key === "w") moveDirection = 'up';
    if (e.key === "s") moveDirection = 'down';
    if (e.key === "a") moveDirection = 'left';
    if (e.key === "d") moveDirection = 'right';
    startMoving();
  }
  if (e.code === "Space") teleportPlayer();
});
document.addEventListener('keyup', (e) => {
  if (["w", "a", "s", "d"].includes(e.key)) stopMoving();
});

// === GAME LOOP ===
function gameLoop() {
  if (!gameRunning) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMaze();
  drawPlayer();
  drawNullborns();
  moveNullborns();

  score += 0.05;
  document.getElementById("score").innerText = score.toFixed(0);
  document.getElementById("level").innerText = Math.floor(score / 100) + 1;

  if (Math.floor(score) % GameConfig.nullbornSpawnStep === 0 && nullborns.length < GameConfig.maxNullborns && !nullborns.spawnedFor?.includes(Math.floor(score))) {
    nullborns.spawnedFor = nullborns.spawnedFor || [];
    nullborns.spawnedFor.push(Math.floor(score));
    spawnNullborn();
  }

  document.getElementById("health").innerText = "♥️".repeat(Math.ceil(player.lives));
  document.getElementById("emotions").innerText = player.emoji;

  if (player.lives <= 0) {
    gameRunning = false;
    alert("Game Over – Score: " + Math.floor(score));
    location.reload();
  } else {
    requestAnimationFrame(gameLoop);
  }
}

// === GAME START ===
function startGame(mode) {
  GameConfig.mode = mode;
  document.getElementById('menu').style.display = 'none';
  document.getElementById('gameCanvas').style.display = 'block';
  document.getElementById('ui').style.display = 'block';
  GameHooks.onGameStart.forEach(fn => fn());
  initMaze();
  spawnNullborn();
  gameRunning = true;
  gameLoop();
}
