<script>
  import all_monsters from "../json/monsters.json";
  import { SvelteToast } from "@zerodevx/svelte-toast";
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
  let challenge = "0";
  let upperChallenge = "30";
  let type = "all";
  let searchString = "";
  let currentMonster;

  $: monster_list = (() => {
    let outPut = all_monsters["monsters"];
    outPut = outPut.filter((x) => parseInt(x["cr"]) >= parseInt(challenge));
    outPut = outPut.filter(
      (x) => parseInt(x["cr"]) <= parseInt(upperChallenge)
    );
    if (type !== "all") {
      outPut = outPut.filter((x) => x["type"] === type);
    }
    if (searchString !== "") {
      let firstChar = searchString[0];
      let newSearchString = searchString.slice(1);
      newSearchString = firstChar.toUpperCase() + newSearchString;
      let pattern = RegExp(`.*${newSearchString}.*`);
      console.log({ pattern });
      outPut = outPut.filter((x) => x["name"] == x["name"].match(pattern));
    }
    return outPut;
  })();
</script>

<svelte:head>
  <title>Yndr</title>
  <meta name="description" content="Yndr" />
</svelte:head>

<form style="display:flex;flex-direction:column;width:85vw;position:sticky; top:5px; background-color:#242424;">
  <div>
    <label for="cr">Minimum Challenge</label>
    <select bind:value={challenge} name="cr" id="cr">
      {#each crs.filter((x) => parseInt(x) <= parseInt(upperChallenge)) as cr}
        <option>{cr}</option>
      {/each}
    </select>
  </div>

  <div>
    <label style="" for="uppercr">Maximum Challenge</label>
    <select bind:value={upperChallenge} name="uppercr" id="uppercr">
      {#each crs.filter((x) => parseInt(x) >= parseInt(challenge)) as cr}
        <option>{cr}</option>
      {/each}
    </select>
  </div>

  <div>
    <label for="type">Type</label>
    <select bind:value={type} name="type" id="type">
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
    <button on:click={(e)=>{
      e.preventDefault()
      document.body.scrollTop =0;
      document.documentElement.scrollTop =0;
    }}>Back to Top</button>
  </div>
</form>

  {#each monster_list as monster}
    <div style="margin-top:1em;">
      <a href={`#/monster/${monster.numberId}`} target="_blank"
        >{monster.name}</a
      >
      <br />
      cr {monster.cr}
      {monster.type}
    </div>
  {/each}

<style></style>
