<script>
  import {
    participantStore,
    setParticipants,
    removeParticipant,
    participantIndex,
    clearParticipants,
  } from "../utils/stores.js";
  import MonsterCombatant from "./MonsterCombatant.svelte";
  import PlayerCard from "./PlayerCard.svelte";
  let participants = $participantStore;
  participants = participants.sort((a, b) => b.init - a.init);

  participantIndex.subscribe(
    (value) => (localStorage.participantIndex = value)
  );

  //   $: currentCombatant = $participantStore[$participantIndex];
  let currentCombatant;
  let outgoingCurrentHp;
  let outgoingMaxHp;
  let currentType;
  let selected;

  function modifyParticipant(newParticipant) {
    for (let i = 0; i < participants.length; i++) {
      if (participants[i].uid === newParticipant.uid) {
        participants.splice(i, 1, newParticipant);
      }
    }
    participants = [...participants];
    setParticipants(participants);
  }
</script>

<div id="wrap">
  <!-- <div class="card">Next</div> -->
  {#each $participantStore as participant, i}
    {#if i == $participantIndex}
      <div
        id={participant.selected}
        class="active-card"
        on:click={(e) => {
          // e.preventDefault();
          participantIndex.set(i);
          localStorage.participantIndex = i;
          currentCombatant = $participantStore[i];
          currentType = currentCombatant.type;
          outgoingCurrentHp = currentCombatant.currentHp;
          outgoingMaxHp = currentCombatant.hp.slice(
            0,
            currentCombatant.hp.indexOf("(") - 1
          );
        }}
        on:dblclick={(e) => {
          e.preventDefault();
          for (const each of $participantStore) {
            each["selected"] = "un-selected";
          }
          $participantStore[i]["selected"] = "selected";
          participantIndex.set(i);
          localStorage.participantIndex = i;
          currentCombatant = $participantStore[i];
          currentType = currentCombatant.type;
          outgoingCurrentHp = currentCombatant.currentHp;
          outgoingMaxHp = currentCombatant.hp.slice(
            0,
            currentCombatant.hp.indexOf("(") - 1
          );
        }}
      >
        <div class="card-section">
          {participant.name}
        </div>

        <div class="card-section">
          <div>Initiative:</div>
          <!-- <div>{participant.init}</div> -->
          <input
            style="width:40px;"
            type="text"
            value={participant.init}
            on:change={(e) => {
              e.preventDefault();
              let update = participant;
              update["init"] = e.currentTarget.value;
              modifyParticipant(update);
              let participantCopy = $participantStore
              participantCopy = participantCopy.sort((a,b) => b.init - a.init).reverse();
              setParticipants(participantCopy)
            }}
          />
        </div>

        <div class="card-section">
          <div>Armor:</div>
          {#if participant.ac.includes("(")}
            <div>
              {participant.ac.slice(0, participant.ac.indexOf("("))}
            </div>
          {:else}
            <div>{participant.ac}</div>
          {/if}
        </div>

        <div class="card-section">
          <div>HP:</div>
          <div style="display:flex; justify-content:end;">
            <input
              value={participant.currentHp > 0 ? participant.currentHp : 0}
              on:change={(e) => {
                e.preventDefault();
                let update = participant;
                update["currentHp"] = e.currentTarget.value;
                modifyParticipant(update);
              }}
              style="width:20%;margin-right:1em;"
              type="text"
            />
            <div style="margin-right:1em;">/</div>
            {#if participant.hp.includes("(")}
              <div>
                {participant.hp.slice(0, participant.hp.indexOf("(") - 1)}
              </div>
            {:else}
              <div>{participant.hp}</div>
            {/if}
          </div>
        </div>
      </div>
      <div id="lower">
        <div style="margin:auto auto;">
          {#if $participantIndex > -1 && currentCombatant}
            {#if currentCombatant.type === "player"}
              <PlayerCard player={currentCombatant} {modifyParticipant} />
            {:else}
              <MonsterCombatant
                data={currentCombatant}
                currentHp={outgoingCurrentHp}
                maxHp={outgoingMaxHp}
                {modifyParticipant}
              />
            {/if}
          {/if}
        </div>
      </div>
      <!-- if active participant -->
    {:else}
      <div
        id={participant.selected}
        class="card"
        on:click={(e) => {
          // e.preventDefault();
          participantIndex.set(i);
          localStorage.participantIndex = i;
          currentCombatant = $participantStore[i];
          currentType = currentCombatant.type;
          outgoingCurrentHp = currentCombatant.currentHp;
          outgoingMaxHp = currentCombatant.hp.slice(
            0,
            currentCombatant.hp.indexOf("(") - 1
          );
        }}
        on:dblclick={(e) => {
          e.preventDefault();
          for (const each of $participantStore) {
            each["selected"] = "un-selected";
          }
          $participantStore[i]["selected"] = "selected";
          participantIndex.set(i);
          localStorage.participantIndex = i;
          currentCombatant = $participantStore[i];
          currentType = currentCombatant.type;
          outgoingCurrentHp = currentCombatant.currentHp;
          outgoingMaxHp = currentCombatant.hp.slice(
            0,
            currentCombatant.hp.indexOf("(") - 1
          );
        }}
      >
        <div class="card-section">
          {participant.name}
        </div>

        <div class="card-section">
          <div>Initiative:</div>
          <div>{participant.init}</div>
        </div>

        <div class="card-section">
          <div>Armor:</div>
          {#if participant.ac.includes("(")}
            <div>
              {participant.ac.slice(0, participant.ac.indexOf("("))}
            </div>
          {:else}
            <div>{participant.ac}</div>
          {/if}
        </div>

        <div class="card-section">
          <div>HP:</div>
          <div style="display:flex; justify-content:end;">
            <input
              value={participant.currentHp || participant.hp}
              on:change={(e) => {
                e.preventDefault();
                let update = participant;
                update["currentHp"] = e.currentTarget.value;
                modifyParticipant(update);
              }}
              style="width:20%;margin-right:1em;"
              type="text"
            />
            <div style="margin-right:1em;">/</div>
            {#if participant.hp.includes("(")}
              <div>
                {participant.hp.slice(0, participant.hp.indexOf("(") - 1)}
              </div>
            {:else}
              <div>{participant.hp}</div>
            {/if}
          </div>
        </div>
      </div>
      <!-- else not active participant -->
    {/if}
  {/each}
  <!-- upper -->
</div>

<!-- wrap -->

<style>
  #lower {
    display: flex;
    justify-content: center;
    grid-column: 2;
    grid-row: 1/99;
  }
  #selected {
    background-color: rgba(72, 37, 92, 0.726);
  }
  .card {
    border: 1px solid rgb(55, 64, 184);
    border-radius: 1em;
    margin-bottom: 1em;
    max-width: 375px;
    min-width: 235px;
    grid-column: 1;
  }
  .card-section {
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
  }
  .active-card {
    border: 1px solid rgb(55, 64, 184);
    background-color: rgb(40, 42, 66);
    border-radius: 1em;
    margin-bottom: 1em;
    padding: 2em;
    max-width: 375px;
    min-width: 235px;
    grid-column: 1;
  }
  #wrap {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 575px) {
    #wrap {
      display: grid;
      grid-template-columns: 1fr;
    }
    #lower {
      display: flex;
      justify-content: center;
      grid-column: 1;
      grid-row: auto;
    }
    .card {
      border: 1px solid rgb(55, 64, 184);
      border-radius: 1em;
      margin-bottom: 1em;
      max-width: 375px;
      min-width: 235px;
    }
    .active-card {
      border: 1px solid rgb(55, 64, 184);
      background-color: rgb(40, 42, 66);
      border-radius: 1em;
      margin-bottom: 1em;
      padding: 2em;
      max-width: 375px;
      min-width: 235px;
    }
  }
</style>
