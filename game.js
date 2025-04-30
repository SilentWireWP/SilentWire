
// === GAME CONFIG & HOOKS ===
// (gekürzter Anfang für Übersicht)
...
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

      // Emoji-Symbole anzeigen
      if (maze[y][x] === CELL_TRAP) {
        ctx.fillStyle = "#ff00ff";
        ctx.font = `${cellSize * 0.6}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("🕳️", (x + 0.5) * cellSize, (y + 0.5) * cellSize);
      }
      if (maze[y][x] === CELL_BOOST) {
        ctx.fillStyle = "#00ccff";
        ctx.font = `${cellSize * 0.6}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("⚡", (x + 0.5) * cellSize, (y + 0.5) * cellSize);
      }
    }
  }
}
