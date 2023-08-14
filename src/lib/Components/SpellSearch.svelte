
<script>
  import all_spells from "../json/spells.json";
  import { push } from "svelte-spa-router";
  const classes = [
    "Barbarian",
    "Cleric",
    "Paladin",
    "Sorcerer",
    "Bard",
    "Wizard",
    "Monk",
    "Warlock",
    "Ranger"
  ];

  const levels = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9"
  ];


  let lowerLevel = "0";
  let upperLevel = "9";
  let spellClass = "all";
  let searchString = "";


  $: spell_list = (() => {
    let outPut = all_spells["spells"];
    outPut = outPut.filter(
      (x) => parseInt(x["level"]) >= parseInt(lowerLevel)
    );
    outPut = outPut.filter(
      (x) => parseInt(x["level"]) <= parseInt(upperLevel)
    );
    if (spellClass !== "all") {
      outPut = outPut.filter((x) => x["classes"].includes(spellClass));
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
        push("/");
      }}>Monsters</button
    >
  </div>
  <div>
    <label for="lowerLevel">Lower Level</label>
    <select bind:value={lowerLevel} name="lowerLevel" id="lowerLevel">
      {#each levels.filter((x) => parseInt(x) <= parseInt(upperLevel)) as level}
        <option>{level}</option>
      {/each}
    </select>
  </div>

  <div>
    <label style="" for="upperLevel">Upper Level</label>
    <select
      bind:value={upperLevel}
      name="upperLevel"
      id="upperLevel"
    >
      {#each levels.filter((x) => parseInt(x) >= parseInt(lowerLevel)) as level}
        <option>{level}</option>
      {/each}
    </select>
  </div>

  <div>
    <label for="spellClass">Class</label>
    <select bind:value={spellClass} name="spellClass" id="spellClass">
      {#each classes as spc}
        <option>{spc}</option>
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
</form>

{#each spell_list as spell, i}
  
<div style="margin-top:1em;">
    <a style="font-size:21px;" href={`#/spell/${spell.numberId}`}
      >{spell.name}</a
    >
    <br />
    level {spell.level}
    {spell.classes}
    <br />
    <div />
</div>

  {/each}

<style></style>
