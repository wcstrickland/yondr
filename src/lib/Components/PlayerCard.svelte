<script>
  export let player;
  export let modifyParticipant;
  let currentHp;
  if (player["currentHp"] === undefined) {
    currentHp = player.hp;
  } else {
    currentHp = player["currentHp"];
  }
  let maxHp = player.hp;
</script>

<div id="player-card" style="">
  <h1>{player.name}</h1>

  <div
    style="display: flex; justify-content:center; align-items:center;margin:auto auto;"
  >
    <h3 style="margin-right:30px;">HP :</h3>
    <input
      on:input={() => {
        player["currentHp"] = currentHp;
        modifyParticipant(player);
        currentHp = player["currentHp"];
      }}
      on:change={() => {
        player["currentHp"] = currentHp;
        modifyParticipant(player);
        currentHp = player["currentHp"];
      }}
      type="text"
      bind:value={currentHp}
    />
    <h3>/ {maxHp}</h3>
  </div>

          <input
            style=""
            type="text"
            placeholder="damage"
            on:change={(e) => {
              currentHp =
                parseInt(currentHp) + -1 * parseInt(e.currentTarget.value);
              player.currentHp =
                parseInt(player.currentHp) + -1 * parseInt(e.currentTarget.value);
              modifyParticipant(player);
              e.currentTarget.value = "";
            }}
          />
  <h1>AC: {player.ac}</h1>
  <h1>Initiative: {player.init}</h1>
</div>

<style>
  #player-card {
    margin-left: 10em;
  }
  @media (max-width: 575px) {
    #player-card {
      margin-left: auto;
    }
  }
</style>
