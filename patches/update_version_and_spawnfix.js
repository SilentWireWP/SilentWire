GameHooks.onGameStart.push(() => {
  const version = document.getElementById("version-info");
  if (version) version.textContent = "Version: Alpha 0.0.2";
  nullborns.length = 0;
  nullborns.push({ x: 5, y: 5 });
});
