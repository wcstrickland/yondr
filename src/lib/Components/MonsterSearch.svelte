<script>
  import all_monsters from "../json/monsters.json";
  import MonsterSearchSection from "./MonsterSearchSection.svelte";
  import { push } from "svelte-spa-router";
  import { searchCriteria, updateSearchCriteria } from "../utils/stores.js";
  import DiceButton from "./DiceButton.svelte";
  const types = [
    "all",
    "aberration",
    "beast",
    "celestial",
    "construct",
    "dragon",
    "elemental",
    "fey",
    "fiend",
    "giant",
    "humanoid",
    "humanoid (shapechanger)",
    "humanoid (elf)",
    "humanoid (half-elf)",
    "humanoid (human)",
    "monstrosity",
    "ooze",
    "plant",
    "undead",
  ];

  const crs = [
    "all",
    "0",
    "1/4",
    "1/2",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
  ];
  let participants = [];

  function updateParticipants(el) {
    participants.push(el);
  }

  let challenge = "0";
  let upperChallenge = "30";
  let type = "all";
  let searchString = "";

  // 2 way bind search criteria and and localstorage
  searchCriteria.subscribe(
    (value) => (localStorage.searchCriteria = JSON.stringify(value))
  );

  $: monster_list = (() => {
    let outPut = all_monsters["monsters"];
    outPut = outPut.filter(
      (x) => parseInt(x["cr"]) >= parseInt($searchCriteria.lowerChallenge)
    );
    outPut = outPut.filter(
      (x) => parseInt(x["cr"]) <= parseInt($searchCriteria.upperChallenge)
    );
    if ($searchCriteria.type !== "all") {
      outPut = outPut.filter((x) => x["type"] === $searchCriteria.type);
    }
    if (searchString !== "") {
      let firstChar = searchString[0];
      let newSearchString = searchString.slice(1);
      newSearchString = firstChar.toUpperCase() + newSearchString;
      let pattern = RegExp(`.*${newSearchString}.*`);
      outPut = outPut.filter((x) => x["name"] == x["name"].match(pattern));
    }
    return outPut;
  })();

</script>

<svelte:head>
  <title>Yndr</title>
  <meta name="description" content="Yndr" />
</svelte:head>

<form
  style="display:flex;flex-direction:column;position:sticky; top:0px; background-color:#242424;"
>
  <div style="margin-bottom:1em;">
    <button
      on:click={(e) => {
        e.preventDefault();
        push("/builder");
      }}>Encounter Builder</button
    >
  </div>
  <div>
    <label for="cr">Minimum Challenge</label>
    <select bind:value={$searchCriteria.lowerChallenge} name="cr" id="cr">
      {#each crs.filter((x) => parseInt(x) <= parseInt($searchCriteria.upperChallenge)) as cr}
        <option>{cr}</option>
      {/each}
    </select>
  </div>

  <div>
    <label style="" for="uppercr">Maximum Challenge</label>
    <select
      bind:value={$searchCriteria.upperChallenge}
      name="uppercr"
      id="uppercr"
    >
      {#each crs.filter((x) => parseInt(x) >= parseInt($searchCriteria.lowerChallenge)) as cr}
        <option>{cr}</option>
      {/each}
    </select>
  </div>

  <div>
    <label for="type">Type</label>
    <select bind:value={$searchCriteria.type} name="type" id="type">
      {#each types as type}
        <option>{type}</option>
      {/each}
    </select>
  </div>

  <div>
    <label for="search">Search</label>
    <input bind:value={searchString} type="text" />
  </div>
  <div style="margin: 1em;">
    <button
      on:click={(e) => {
        e.preventDefault();
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }}>Back to Top</button
    >
  </div>
  <div style="margin-bottom:.5em;">
    {#if monster_list.length > 1000}
      Showing first 1000 results
      {:else}
      Showing {monster_list.length} results
    {/if}
  </div>
</form>

{#each monster_list as monster, i}
  {#if i < 1000}
    <MonsterSearchSection {monster} {updateParticipants} />
  {/if}
{/each}

<style></style>
