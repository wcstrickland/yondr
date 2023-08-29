<script>
  import { toast } from "@zerodevx/svelte-toast";
  import monsters from "../json/monsters.json";
  import {
    generateRollText,
    splitAroundRoll,
    findDamageStrings,
    extractRoll,
    findSpells,
    addSpellIds,
  } from "../utils/utils.js";

  import {
    participantStore,
    addParticipant,
    setParticipants,
    customMonsters,
  } from "../utils/stores.js";
  import { randomNumber, uuidv4 } from "../utils/utils.js";

  import spell_list from "../json/spell_list.json";

  export let params = {};
  let monsterList = monsters["monsters"];
  let currentMonster;
  if (params.id.length > 5) {
    currentMonster = $customMonsters.filter((x) => x.uid === params.id)[0];
  } else {
    currentMonster = monsterList.filter((x) => x["numberId"] == params.id)[0];
  }
  let data = currentMonster;

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
  let showDescription = false;

  let currentHp;
  let maxHp;
  if (data.type === "custom") {
    currentHp = parseInt(data.hp);
    maxHp = parseInt(data.hp);
  } else {
    currentHp = data.currentHp;
    maxHp = parseInt(data.hp.slice(0, data.hp.indexOf("(")));
  }

  let traits = Array.isArray(data.trait) ? data.trait : [data.trait];

  let reactions = Array.isArray(data.reaction)
    ? data.reaction
    : [data.reaction];

  let actions = Array.isArray(data.action) ? data.action : [data.action];
  if (!data.action) {
    actions = "";
  }

  let legendary = Array.isArray(data.legendary)
    ? data.legendary
    : [data.legendary];

  function isPresent(key) {
    return data[key] !== "" && Object.hasOwn(data, key);
  }
  document.documentElement.scrollTop = 0;
</script>

<svelte:head>
  <title>{data.name}</title>
  <meta name="description" content="Yndr" />
</svelte:head>

<div class="post">
  <div class="stat-block">
    <hr class="orange-border" />
    <div class="section-left">
      <div class="creature-heading">
        <div style="display:flex; justify-content:space-between;">
          <h1>{data.name}</h1>
          <h2 style="margin-top:1.5em;">
            <a
              on:click={() => {
                let newUid = uuidv4();
                data["init"] = randomNumber(1, 20);
                data["uid"] = newUid;
                let newData = { ...data };
                addParticipant($participantStore, newData);
                console.log($participantStore);
                toast.push(
                  `${data.name} added with initiative of ${data["init"]}`,
                  { duration: 1000 }
                );
              }}>Add to encounter</a
            >
          </h2>
        </div>
        <h2 style="color:black;">{data.size}, {data.alignment}</h2>
      </div>
      <!-- creature heading -->
      <svg height="5" width="100%" class="tapered-rule">
        <polyline points="0,0 400,2.5 0,5" />
      </svg>
      <div class="top-stats">
        <!-- property line -->
        <div class="property-line">
          <h4>Hit Points</h4>
          <div style="display: flex;justify-content:start">
            <input
              style="background-color: white; color:black;height:20px; width:80px; margin-right:30px;"
              type="text"
              bind:value={currentHp}
              on:input={() => {
                data.currentHp = currentHp;
              }}
              on:change={() => {
                data.currentHp = currentHp;
              }}
            />
            <label
              style="display:flex;color:black;flex-direction:column;flex:1;"
              for="range"
              >{data.hp}
              <input
                style="flex:1;display:flex;flex-direction:column;"
                type="range"
                min="0"
                max={maxHp}
                bind:value={currentHp}
                on:change={() => {
                  data.currentHp = currentHp;
                }}
                on:input={() => {
                  data.currentHp = currentHp;
                }}
                id="range"
                name="range"
              />
            </label>
          </div>
          <input
            style="background-color: white; color:black;height:20px; width:80px; margin-right:30px;"
            type="text"
            placeholder="damage"
            on:change={(e) => {
              currentHp =
                parseInt(currentHp) + -1 * parseInt(e.currentTarget.value);
              data.currentHp =
                parseInt(data.currentHp) + -1 * parseInt(e.currentTarget.value);
              e.currentTarget.value = "";
            }}
          />
        </div>
        <!-- property line -->
        <div class="property-line first">
          <h4>Armor Class</h4>
          <p>{data.ac}</p>
        </div>
        <div class="property-line last">
          <h4>Speed</h4>
          <p>{data.speed}</p>
        </div>
        <!-- property line -->
        <svg height="5" width="100%" class="tapered-rule">
          <polyline points="0,0 400,2.5 0,5" />
        </svg>
        <div class="abilities">
          <div>
            <div class="stat-header"><b class="stat-value">STR</b></div>
            <a
              on:click={() => {
                let roll =
                  "Strength: " + generateRollText(1, 20, modifiers[data.str]);
                toast.push(roll, {
                  duration: 10000,
                });
                navigator.clipboard.writeText(roll);
              }}
            >
              {data.str}
              <br />
              ({modifiers[data.str]})
            </a>
          </div>
          <div>
            <div class="stat-header"><b class="stat-value">DEX</b></div>
            <a
              on:click={() => {
                let roll =
                  "Dexterity: " + generateRollText(1, 20, modifiers[data.dex]);
                toast.push(roll, {
                  duration: 10000,
                });
                navigator.clipboard.writeText(roll);
              }}
            >
              {data.dex}
              <br />
              ({modifiers[data.dex]})
            </a>
          </div>
          <div>
            <div class="stat-header"><b class="stat-value">CON</b></div>
            <a
              on:click={() => {
                let roll =
                  "Constitution: " +
                  generateRollText(1, 20, modifiers[data.con]);
                toast.push(roll, {
                  duration: 10000,
                });
                navigator.clipboard.writeText(roll);
              }}
            >
              {data.con}
              <br />
              ({modifiers[data.con]})
            </a>
          </div>
          <div>
            <div class="stat-header"><b class="stat-value">INT</b></div>
            <a
              on:click={() => {
                let roll =
                  "Inteligence: " +
                  generateRollText(1, 20, modifiers[data.int]);
                toast.push(roll, {
                  duration: 10000,
                });
                navigator.clipboard.writeText(roll);
              }}
            >
              {data.int}
              <br />
              ({modifiers[data.int]})
            </a>
          </div>
          <div>
            <div class="stat-header"><b class="stat-value">WIS</b></div>
            <a
              on:click={() => {
                let roll =
                  "Wisdom: " + generateRollText(1, 20, modifiers[data.wis]);
                toast.push(roll, {
                  duration: 10000,
                });
                navigator.clipboard.writeText(roll);
              }}
            >
              {data.wis}
              <br />
              ({modifiers[data.wis]})
            </a>
          </div>
          <div>
            <div class="stat-header"><b class="stat-value">CHA</b></div>
            <a
              on:click={() => {
                let roll =
                  "Charisma: " + generateRollText(1, 20, modifiers[data.cha]);
                toast.push(roll, {
                  duration: 10000,
                });
                navigator.clipboard.writeText(roll);
              }}
            >
              {data.cha}
              <br />
              ({modifiers[data.cha]})
            </a>
          </div>
        </div>
        <svg height="5" width="100%" class="tapered-rule top-gap">
          <polyline points="0,0 400,2.5 0,5" />
        </svg>
        {#if isPresent("immune")}
          <div class="property-line">
            <h4>Damage Immunities</h4>
            <p>{data.immune}</p>
          </div>
        {/if}
        {#if isPresent("resist")}
          <div class="property-line">
            <h4>Damage Resistances</h4>
            <p>{data.resist}</p>
          </div>
        {/if}
        {#if isPresent("vulnerable")}
          <div class="property-line">
            <h4>Damage Vulnerabilities</h4>
            <p>{data.vulnerable}</p>
          </div>
        {/if}
        {#if isPresent("conditionImmune")}
          <div class="property-line">
            <h4>Condition Immunities</h4>
            <p>{data.conditionImmune}</p>
          </div>
        {/if}
        {#if isPresent("senses")}
          <div class="property-line">
            <h4>Senses</h4>
            <p>{data.senses}</p>
          </div>
        {/if}
        <div class="property-line">
          <h4>Saving Throws:</h4>
          <p>
            {#each splitAroundRoll(data.save, findDamageStrings(data.save)) as chunk, i}
              {#if chunk.replace}
                <a
                  on:click={() => {
                    let roll =
                      `${splitAroundRoll(
                        data.save,
                        findDamageStrings(data.save)
                      )[i - 1].value.replace(",", "")} Save: ` +
                      generateRollText(1, 20, extractRoll(chunk.value).mod);
                    toast.push(roll, { duration: 10000 });
                    navigator.clipboard.writeText(roll);
                  }}>{chunk.value}</a
                >
              {:else}
                {chunk.value}
              {/if}
            {/each}
          </p>
        </div>
        {#if isPresent("skill")}
          <div class="property-line">
            <h4>Skills</h4>
            <p>
              {#each splitAroundRoll(data.skill, findDamageStrings(data.skill)) as chunk, i}
                {#if chunk.replace}
                  <a
                    on:click={() => {
                      let roll =
                        `${splitAroundRoll(
                          data.skill,
                          findDamageStrings(data.skill)
                        )[i - 1].value.replace(",", "")}: ` +
                        generateRollText(1, 20, extractRoll(chunk.value).mod);
                      toast.push(roll, { duration: 10000 });
                      navigator.clipboard.writeText(roll);
                    }}>{chunk.value}</a
                  >
                {:else}
                  {chunk.value}
                {/if}
              {/each}
            </p>
          </div>
        {/if}
        {#if isPresent("languages")}
          <div class="property-line">
            <h4>Languages</h4>
            <p>{data.languages}</p>
          </div>
        {/if}
        {#if isPresent("environment")}
          <div class="property-line">
            <h4>Environment</h4>
            <p>{data.environment}</p>
          </div>
        {/if}
        <div class="property-line">
          <h4>Challenge</h4>
          <p>{data.cr}</p>
        </div>
        {#if isPresent("slots")}
          <div class="property-line">
            <h4>Spell Slots</h4>
            <p>{data.slots}</p>
          </div>
        {/if}
        {#if isPresent("trait")}
          <div id="actions">
            <div class="creature-heading">
              <h1>Traits</h1>
            </div>
            <p>
              {#each traits as trait}
                <b>{trait.name}: </b>
                {#if Array.isArray(trait.text)}
                  {#each trait.text as line}
                    {#if trait.name.includes("Spellcasting")}
                      {#each addSpellIds(splitAroundRoll(line, findSpells(line, spell_list)), spell_list) as chunk}
                        {#if chunk.replace}
                          <a
                            on:click={() => {
                              window.open(
                                `#/spell/${chunk.spellId}`,
                                "_blank",
                                "width=650"
                              );
                            }}>{chunk.value}</a
                          >
                        {:else}
                          {chunk.value}
                        {/if}
                      {/each}
                      <br />
                    {:else}
                      {#each splitAroundRoll(line, findDamageStrings(line)) as chunk}
                        {#if chunk.replace}
                          <a
                            on:click={() => {
                              let roll =
                                `${trait.name}: ` +
                                generateRollText(
                                  extractRoll(chunk.value).num,
                                  extractRoll(chunk.value).sides,
                                  extractRoll(chunk.value).mod
                                );
                              toast.push(roll, { duration: 10000 });
                              navigator.clipboard.writeText(roll);
                            }}>{chunk.value}</a
                          >
                        {:else}
                          {chunk.value}
                        {/if}
                      {/each}

                      <br />
                    {/if}
                  {/each}
                {:else}
                  {#each splitAroundRoll(trait.text, findDamageStrings(trait.text)) as chunk}
                    {#if chunk.replace}
                      <a
                        on:click={() => {
                          let roll =
                            `${trait.name}: ` +
                            generateRollText(
                              extractRoll(chunk.value).num,
                              extractRoll(chunk.value).sides,
                              extractRoll(chunk.value).mod
                            );
                          toast.push(roll, { duration: 10000 });
                          navigator.clipboard.writeText(roll);
                        }}>{chunk.value}</a
                      >
                    {:else}
                      {chunk.value}
                    {/if}
                  {/each}
                {/if}
                <br />
                <br />
              {/each}
            </p>
          </div>
        {/if}
      </div>
      <svg height="5" width="100%" class="tapered-rule bottom-gap">
        <polyline points="0,0 400,2.5 0,5" />
      </svg>
      <div id="actions">
        <div class="creature-heading">
          <h1>Actions</h1>
        </div>
        <p>
          {#each actions as action}
            <b>{action.name}: </b>
            {#each splitAroundRoll(action.text, findDamageStrings(action.text)) as chunk}
              {#if chunk.replace}
                <a
                  on:click={() => {
                    let roll =
                      `${action.name}: ` +
                      generateRollText(
                        extractRoll(chunk.value).num,
                        extractRoll(chunk.value).sides,
                        extractRoll(chunk.value).mod
                      );
                    toast.push(roll, { duration: 10000 });
                    navigator.clipboard.writeText(roll);
                  }}>{chunk.value}</a
                >
              {:else}
                {chunk.value}
              {/if}
            {/each}
            <br />
            <br />
          {/each}
        </p>
      </div>
      {#if isPresent("reaction")}
        <div id="reactions">
          <div class="creature-heading">
            <h1>Reactions</h1>
          </div>
          <p>
            {#each reactions as reaction}
              <b>{reaction.name}: </b>
              {#each splitAroundRoll(reaction.text, findDamageStrings(reaction.text)) as chunk}
                {#if chunk.replace}
                  <a
                    on:click={() => {
                      let roll = generateRollText(
                        extractRoll(chunk.value).num,
                        extractRoll(chunk.value).sides,
                        extractRoll(chunk.value).mod
                      );
                      toast.push(roll, { duration: 10000 });
                      navigator.clipboard.writeText(roll);
                    }}>{chunk.value}</a
                  >
                {:else}
                  {chunk.value}
                {/if}
              {/each}
              <br />
              <br />
            {/each}
          </p>
        </div>
      {/if}
      {#if isPresent("legendary")}
        <div id="actions">
          <div class="creature-heading">
            <h1>Legendary Actions</h1>
          </div>
          <p>
            {#each legendary as legend}
              {#if legend["name"]}
                <b>{legend.name}: </b>
              {/if}
              {#if Array.isArray(legend.text)}
                {#each legend.text as line}
                  {#each splitAroundRoll(line, findDamageStrings(line)) as chunk}
                    {#if chunk.replace}
                      <a
                        on:click={() => {
                          let roll =
                            `${legend.name}: ` +
                            generateRollText(
                              extractRoll(chunk.value).num,
                              extractRoll(chunk.value).sides,
                              extractRoll(chunk.value).mod
                            );
                          toast.push(roll, { duration: 10000 });
                          navigator.clipboard.writeText(roll);
                        }}>{chunk.value}</a
                      >
                    {:else}
                      {chunk.value}
                    {/if}
                  {/each}

                  <br />
                {/each}
              {:else}
                {#each splitAroundRoll(legend.text, findDamageStrings(legend.text)) as chunk}
                  {#if chunk.replace}
                    <a
                      on:click={() => {
                        let roll =
                          `${legend.name}: ` +
                          generateRollText(
                            extractRoll(chunk.value).num,
                            extractRoll(chunk.value).sides,
                            extractRoll(chunk.value).mod
                          );
                        toast.push(roll, { duration: 10000 });
                        navigator.clipboard.writeText(roll);
                      }}>{chunk.value}</a
                    >
                  {:else}
                    {chunk.value}
                  {/if}
                {/each}

                <!-- {legend.text} -->
              {/if}
              <br />
              <br />
            {/each}
          </p>
        </div>
      {/if}
      <div id="reactions">
        <div class="creature-heading">
          <h1>
            <a style="" on:click={() => (showDescription = !showDescription)}>
              Description
            </a>
          </h1>
        </div>
        {#if showDescription}
          <p>{data.description}</p>
        {/if}
      </div>
      <hr class="orange-border bottom" />
    </div>
  </div>
</div>

<style>
  :root {
    --base-font-family: "Calluna", Georgia, serif;
    --base-font-size: 18px;
    --small-font-size: var(--base-font-size) * 0.875;
    --base-line-height: 1.5;
    --spacing-unit: 30px;
    --spacing-unit-line: 7px;
    --text-color: #181818;
    --background-color: #fdfdfd;
    --brand-color: #4d96b9;
    --brand-color-secondary: #109269;
    --brand-color-light: lighten(var(--brand-color-secondary), 1%);
    --brand-color-dark: darken(var(--brand-color-secondary), 1%);
    --grey-color: #141414;
    --grey-color-light: lighten(var(--grey-color), 20%);
    --grey-color-dark: darken(var(--grey-color), 15%);
    --on-palm: 750px;
    --on-laptop: 800px;
    --statblock-main-color: #7a200d;
    --statblock-secondary-color: #922610;
    --statblock-background-color: #fdf1dc;
    --toastContainerTop: auto;
    --toastContainerRight: auto;
    --toastContainerBottom: 8rem;
    --toastContainerLeft: calc(50vw - 8rem);
  }

  a {
    color: blue;
    cursor: pointer;
  }

  .stat-header {
    margin-bottom: 1em;
    margin-top: 1em;
  }
  .stat-value {
    font-size: 20px;
  }

  .stat-block {
    font-size: 13.5px;
    line-height: 1.2em;
    box-sizing: border-box;
    max-width: 100%;
    text-align: left;
    vertical-align: top;
    width: 50%;
    min-width: 280px;
    background: var(--statblock-background-color);
    padding: 5px 3px 50px;
    box-shadow: 0 0 1.5em #867453;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-right: auto;
    margin-left: auto;
  }
  .stat-block p {
    margin-bottom: 10px;
  }
  .stat-block h4 {
    font-weight: bold;
  }
  .orange-border {
    display: block;
    background: #e69a28;
    border: 1px solid #000;
    height: 5px;
    padding: 0 10px 0;
    margin: -10px -10px 0;
    box-sizing: initial;
  }
  .orange-border.bottom {
    margin: 15px -10px -20px;
  }
  .tapered-rule {
    display: block;
    width: 100%;
    height: 5px;
    border: none;
    color: var(--statblock-secondary-color);
    fill: var(--statblock-secondary-color);
    stroke: var(--statblock-secondary-color);
  }
  .top-gap {
    margin: 0 0 8px;
  }
  .bottom-gap {
    margin: 10px 0;
  }
  .creature-heading h1 {
    color: var(--statblock-secondary-color);
    font-size: 23px;
    line-height: 1.2em;
    margin: 10px 0 0;
    letter-spacing: 1px;
    font-variant: small-caps;
    font-weight: bold;
  }
  .creature-heading h2 {
    font-weight: normal;
    font-style: italic;
    font-size: 12px;
    line-height: 1.2em;
    margin: 0 0 10px;
  }
  .property-line h4,
  .property-line p {
    display: inline;
    margin: 0;
    color: var(--statblock-secondary-color);
    font-size: 13.5px;
    line-height: 1.2em;
  }
  .property-line h4 {
    color: var(--statblock-main-color);
  }
  .property-line {
    text-indent: -1em;
    padding-left: 1.1em;
    line-height: 1.4em;
  }
  .property-line.first {
    margin: 8px 0 0;
  }
  .property-line.last {
    margin: 0 0 10px;
  }
  .abilities {
    text-align: center;
    color: var(--statblock-secondary-color);
    margin-bottom: 1em;
  }
  .abilities > div {
    display: inline-block;
    vertical-align: middle;
    width: 12.5%;
    min-width: 40px;
    font-size: 12px;
    line-height: 1em;
  }
  #actions > *,
  #reactions > * {
    border-bottom: 1px solid var(--statblock-main-color);
    color: var(--statblock-main-color);
    font-size: 14px;
    font-weight: normal;
    margin: 10px 0 0;
    padding: 0 0 10px;
    text-indent: 5px;
  }
  #actions,
  #reactions {
    margin: 0 0 10px;
  }
  #actions:last-child,
  #reactions:last-child {
    margin: 0;
  }

  @media print {
    .orange-border {
      display: none;
    }
    .stat-block,
    .property-line,
    .stat-block {
      width: 40%;
      display: inline-block;
      vertical-align: top;
    }
  }
  @media screen and (max-width: 575px) {
    .stat-block {
      width: 100%;
    }
  }
</style>
