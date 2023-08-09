<script>
  import spells from "../json/spells.json";
  export let params = {};
  let spellList = spells["spells"];
  let currentSpell;
  currentSpell = spellList.filter((x) => x["numberId"] == params.id)[0];
  let data = currentSpell;
  import { splitAroundRoll, findDamageStrings, generateRollText, extractRoll } from "../utils/utils";
  import { toast } from "@zerodevx/svelte-toast";
  document.documentElement.scrollTop = 0;
</script>

<h1>{data.name}</h1>

<div>{data.classes}</div>
<div>level: {data.level}</div>
<div>ritual: {data.ritual}</div>
<div>time: {data.time}</div>
<div>range: {data.range}</div>
<div>components: {data.components}</div>
<div>duration: {data.duration}</div>

{#each splitAroundRoll(data.text, findDamageStrings(data.text)) as chunk}
  {#if chunk.replace}
    <a
      on:click={() => {
        toast.push(
          `${data.name}: ` +
            generateRollText(
              extractRoll(chunk.value).num,
              extractRoll(chunk.value).sides,
              extractRoll(chunk.value).mod
            ),
          { duration: 10000 }
        );
      }}>{chunk.value}</a
    >
  {:else}
    {chunk.value}
  {/if}
{/each}
<br />
<br />

<style>
  div {
    margin-bottom: 1em;
  }
</style>
