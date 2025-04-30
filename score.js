// === SCORE SYSTEM ===
function saveScore(name, score) {
  let highscores = JSON.parse(localStorage.getItem("nullbornScores")) || [];
  highscores.push({ name, score });
  highscores.sort((a, b) => b.score - a.score);
  localStorage.setItem("nullbornScores", JSON.stringify(highscores.slice(0, 10)));
}

function getScores() {
  return JSON.parse(localStorage.getItem("nullbornScores")) || [];
}
