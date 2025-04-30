// Patch: Versionsnummer + Nullborn-Spawn-Fix

GameHooks.onGameStart.push(() => {
  // 1. Versionsnummer ändern
  const menuVersion = document.querySelector("#menu p");
  if (menuVersion) menuVersion.innerText = "Version: Alpha 0.0.2";

  // 2. Nur einen Nullborn initial spawnen
  nullborns.length = 0; // Leere vorhandene Liste, falls Spiel sie gesetzt hat
  spawnNullborn(); // Nur 1 Gegner manuell

  // 3. Score-abhängiger Spawn weiterhin aktiv
  if (!nullborns.spawnedFor) nullborns.spawnedFor = [0]; // Damit nicht erneut bei Score 0 gespawnt wird
});
