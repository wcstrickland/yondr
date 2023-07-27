<script>
  import { toast } from "@zerodevx/svelte-toast";
  import { randomNumber } from "../utils/utils.js";
  export let updateParticipants;
  $: player = {
    name: name,
    ac: ac,
    hp: hp,
    init: init,
  };
  let name ="";
  let ac = "";
  let hp = "";
  let init = "";
</script>

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
    <label
      class="linky"
      on:click={(e) => {
        e.preventDefault();
        init = randomNumber(1, 20).toString();
      }}
      for="init">Initiative</label
    >
    <input
      bind:value={init}
      type="text"
      inputmode="numeric"
      name="init"
      id="init"
    />
  </div>

  <button
    style="margin:1em 0 0 1em ;"
    on:click={() => {
      if (init !== "" && name !== "") {
        updateParticipants(player);
        toast.push(`${player.name} added with initiative of ${init}`);
        init = "";
        name = "";
        ac = "";
        hp = "";
      }else{
        toast.push(`Input player name and initiative`)
      }

    }}>Add</button
  >
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
