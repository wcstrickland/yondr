<script>
  import { toast } from "@zerodevx/svelte-toast";
  import { randomNumber } from "../utils/utils";
  export let monster;
  export let updateParticipants;
  let init = "";
</script>

<div style="margin-top:1em;">
  <a
    style="font-size:21px;"
    href={`#/monster/${monster.numberId}`}
    target="_blank">{monster.name}</a
  >
  <br />
  cr {monster.cr}
  {monster.type}
  <br />
  <div>
    <label
      class="linky"
      on:click={(e) => {
        e.preventDefault()
        init = randomNumber(1, 20).toString();
      }}
      for="init">Initiative</label
    >
    <input
      style="width:20%;"
      bind:value={init}
      type="text"
      inputmode="numeric"
      name="init"
      id="init"
    />
    <button
      on:click={() => {
        if(init !==""){
        monster["init"] = init;
        updateParticipants(monster);
        toast.push(`${monster.name} added with initiative of ${init}`);
        init = "";
        }else{
            toast.push(`Input initiative for ${monster.name}`)
        }
      }}>Add</button
    >
  </div>
</div>

<style>
  .linky {
    color: #535bf2;
    cursor: pointer;
  }
</style>
