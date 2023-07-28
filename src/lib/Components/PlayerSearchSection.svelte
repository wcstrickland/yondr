<script>
  import { toast } from "@zerodevx/svelte-toast";
  import { randomNumber, uuidv4 } from "../utils/utils.js";
  export let updateParticipants;
  $: player = {
    name: name,
    ac: ac,
    hp: hp,
    init: init,
  };
  let name = "";
  let ac = "";
  let hp = "";
  let init = "";
</script>

<div style="margin-top:1em;">
  <h3>Player</h3>
  <div style="margin-top:1em;display:flex; flex-direction:column;">
    <div class="start">
      <label for="name">Name</label>
      <input bind:value={name} type="text" name="name" id="name" />
    </div>

    <div class="start">
      <label for="ac">Ac</label>
      <input bind:value={ac} type="text" name="ac" id="ac" />
    </div>

    <div class="start">
      <label for="hp">Hp</label>
      <input bind:value={hp} type="text" name="hp" id="hp" />
    </div>

    <div class="start">
      <label for="init">Initiative </label>
      <input
        bind:value={init}
        type="text"
        inputmode="numeric"
        name="init"
        id="init"
      />
    </div>
    <button
      style="margin: .5em 0;"
      on:click={(e) => {
        e.preventDefault();
        init = randomNumber(1, 20).toString();
      }}>Roll</button
    >

    <div class="start">
    </div>
      <button
        style="margin:.5em 0"
        on:click={(e) => {
          e.preventDefault();
          if (init !== "" && name !== "") {
            player["uid"] = uuidv4()
            updateParticipants(player);
            toast.push(`${player.name} added with initiative of ${init}`);
            init = "";
            name = "";
            ac = "";
            hp = "";
          } else {
            toast.push(`Input player name and initiative`);
          }
        }}>Add to Combat</button
      >
  </div>
</div>

<style>
  .start {
    display: flex;
    justify-content: space-between;
    margin: 0.5em 0 0 0;
  }

  .linky {
    color: #535bf2;
    cursor: pointer;
  }
</style>
