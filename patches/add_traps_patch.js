GameHooks.onGameStart.push(() => {
  console.log("Patch aktiviert: Zusätzliche Fallen werden hinzugefügt.");
  addMoreTraps(5); // Anzahl kann beliebig geändert werden
});

function addMoreTraps(amount) {
  let placed = 0;
  while (placed < amount) {
    let x = Math.floor(Math.random() * maze[0].length);
    let y = Math.floor(Math.random() * maze.length);
    if (maze[y][x] === 0 && !(player.x === x && player.y === y)) {
      maze[y][x] = 3; // 3 = CELL_TRAP
      placed++;
    }
  }
}
