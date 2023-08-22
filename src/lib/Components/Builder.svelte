<script>
  import all_monsters from "../json/monsters.json";
  import { toast } from "@zerodevx/svelte-toast";
  import MonsterSearchSection from "./MonsterSearchSection.svelte";
  import PlayerSearchSection from "./PlayerSearchSection.svelte";
  import { push } from "svelte-spa-router";
  import {
    participantStore,
    setParticipants,
    addParticipant,
    removeParticipant,
    clearParticipants,
  } from "../utils/stores.js";
  import { randomNumber, uuidv4 } from "../utils/utils.js";
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

  let modifiers = {
    "1": "-5",
    "2": "-4",
    "3": "-4",
    "4": "-3",
    "5": "-3",
    "6": "-2",
    "7": "-2",
    "8": "-1",
    "9": "-1",
    "10": "+0",
    "11": "+0",
    "12": "+1",
    "13": "+1",
    "14": "+2",
    "15": "+2",
    "16": "+3",
    "17": "+3",
    "18": "+4",
    "19": "+4",
    "20": "+5",
    "21": "+5",
    "22": "+6",
    "23": "+6",
    "24": "+7",
    "25": "+7",
    "26": "+8",
    "27": "+8",
    "28": "+9",
    "29": "+9",
    "30": "+10",
  };

  let participants = [];

  function updateParticipants(el) {
    participants.push(el);
    participants.sort((a, b) => b["init"] - a["init"]);
    setParticipants(participants);
  }

  let isMobile =
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/Blackberry/i);

  let challenge = "0";
  let init = "";
  let upperChallenge = "30";
  let type = "all";
  let searchString = "";
  let currentMonsterName = "";
  $: currentMonster = all_monsters["monsters"].filter(
    (x) => x["name"] == currentMonsterName.trim()
  )[0];

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
      outPut = outPut.filter((x) => x["name"] == x["name"].match(pattern));
    }
    return outPut;
  })();
</script>

<svelte:head>
  <title>Yndr: Encounter Builder</title>
  <meta name="description" content="Yndr" />
</svelte:head>

<form
  id="grid-container"
  style="text-align:start;flex-direction:column; top:0px; background-color:#242424;"
>
  <div
    id="encounter-button-section"
    class="frm-chnk"
    style="justify-content:center"
  >
    <div style="display: flex; flex-direction:column; align-items:center;">
      <div style="margin-bottom:.5em;">
        <button
          on:click={(e) => {
            e.preventDefault();
            push("/combat");
          }}>Start Encounter</button
        >
      </div>
      <div style="margin-bottom:.5em;">
        <button
          class="encounter-button"
          on:click={(e) => {
            e.preventDefault();
            clearParticipants();
            toast.push("Encounter Cleared", { duration: 1000 });
          }}>Clear Encounter</button
        >
      </div>
      {#if !isMobile}
        <div style="margin-bottom:.5em;">
          <button
            class="encounter-button"
            on:click={async function z(e) {
              e.preventDefault();
              const newHandle = await window.showSaveFilePicker({
                types: [
                  {
                    accept: { "text/plain": [".json"] },
                  },
                ],
              });
              const writableStream = await newHandle.createWritable();
              await writableStream.write(JSON.stringify($participantStore));
              await writableStream.close();
              toast.push("File Saved", { duration: 1000 });
            }}>Save Encounter</button
          >
        </div>
        <div style="margin-bottom:.5em;">
          <button
            class="encounter-button"
            on:click={async function z(e) {
              e.preventDefault();
              const [newHandle] = await window.showOpenFilePicker({
                types: [
                  {
                    accept: { "text/plain": [".json"] },
                  },
                ],
                multiple: false,
              });
              const file = await newHandle.getFile();
              let fileData = await file.text();
              let fileObject = JSON.parse(fileData);
              setParticipants(fileObject);
              toast.push("Encounter Loaded?", { duration: 1000 });
            }}>Load Encounter</button
          >
        </div>
      {/if}
    </div>
  </div>

  <div id="monster-search-section">
    <div class="frm-chnk">
      <select class="frm-sec" bind:value={currentMonsterName}>
        <option value="" disabled selected>Select Monster</option>
        {#each monster_list as monster}
          <option>
            {monster["name"]}
          </option>
        {/each}
      </select>
    </div>

    <div class="frm-chnk">
      <label class="frm-sec" for="cr">Minimum Challenge</label>
      <select bind:value={challenge} name="cr" id="cr">
        {#each crs.filter((x) => parseInt(x) <= parseInt(upperChallenge)) as cr}
          <option>{cr}</option>
        {/each}
      </select>
    </div>

    <div class="frm-chnk">
      <label class="frm-sec" for="uppercr">Maximum Challenge</label>
      <select bind:value={upperChallenge} name="uppercr" id="uppercr">
        {#each crs.filter((x) => parseInt(x) >= parseInt(challenge)) as cr}
          <option>{cr}</option>
        {/each}
      </select>
    </div>

    <div class="frm-chnk">
      <label class="frm-sec" for="type">Type</label>
      <select bind:value={type} name="type" id="type">
        {#each types as type}
          <option>{type}</option>
        {/each}
      </select>
    </div>

    <div class="frm-chnk">
      <label class="frm-sec" for="search">Search</label>
      <input bind:value={searchString} type="text" />
    </div>

    <div class="frm-chnk" style="margin-top:.5em;">
      <a
        class="frm-sec linky"
        on:click={(e) => {
          e.preventDefault();
          init = randomNumber(1, 20).toString();
        }}>Initiative</a
      >
      <input bind:value={init} type="text" />
    </div>

    <div class="frm-chnk" style="margin: 0 0;">
      <button
        class="frm-sec"
        on:click={(e) => {
          e.preventDefault();
          if (init !== "") {
            let copyMonster = { ...currentMonster };
            copyMonster["init"] = init;
            copyMonster["uid"] = uuidv4();
            addParticipant($participantStore, copyMonster);
            toast.push(`${copyMonster.name} added with initiative of ${init}`);
            init = "";
          } else {
            toast.push(`Input initiative for ${currentMonster["name"]}`);
          }
        }}>Add to Combat</button
      >
    </div>
  </div>
  <div id="player-search-section">
    <PlayerSearchSection />
  </div>
  <div id="participant-list" >
    {#each $participantStore as participant}
      <div style="display: flex; justify-content:start;">
        <a
          style="margin-right:1em; cursor:pointer;"
          on:click={() => {
            removeParticipant($participantStore, participant);
          }}>X</a
        >
        <div>{participant.name} - initiative: {participant.init}</div>
      </div>
    {/each}
  </div>
</form>

<style>
  .frm-chnk {
    display: flex;
    margin: 0.5em 0;
  }
  .frm-sec {
    flex: 1;
    min-width: 120px;
  }

  .linky {
    cursor: pointer;
  }

  #grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
  }

  #encounter-button-section {
    grid-row: 1;
    grid-column: 2;
  }

  #participant-list {
    grid-row: 2;
    grid-column: 2;
    margin: auto;
  }

  #player-search-section {
    grid-row: 2;
    grid-column: 1;
  }
  #monster-search-section {
    grid-row: 1;
    grid-column: 1;
  }

  @media (max-width: 575px) {
    #grid-container {
      display: grid;
      grid-template-columns: 1fr;
    }

    #encounter-button-section {
      grid-column: 1;
      grid-row: 1;
    }

    #participant-list {
      grid-column: 1;
      margin: auto;
      grid-row: 4;
    }

    #player-search-section {
      grid-column: 1;
      grid-row: 3;
    }
    #monster-search-section {
      grid-column: 1;
      grid-row: 2;
    }
  }
</style>
