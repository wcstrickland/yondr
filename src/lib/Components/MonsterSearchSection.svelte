<script>
  export let monster;
  export let updateParticipants;
  import { removeCustomMonster, customMonsters } from "../utils/stores.js";
  let init = "";
</script>

<div style="margin-top:1em;">
  {#if monster.type === "custom"}
    <a style="font-size:21px;" href={`#/monster/${monster.uid}`}
      >{monster.name}</a
    >
    <a
      on:click={() => {
        removeCustomMonster($customMonsters, monster);
      }}
      style="margin-left:1em; cursor:pointer;">X</a
    >
    <br />
    cr {monster.cr}
    {monster.type}
    <br />
    <div />
  {:else}
    <a style="font-size:21px;" href={`#/monster/${monster.numberId}`}
      >{monster.name}</a
    >
    <br />
    cr {monster.cr}
    {monster.type}
    <br />
    <div />
  {/if}
</div>

<style>
</style>
