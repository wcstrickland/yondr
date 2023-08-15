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

<div style="margin-top:1em;">
  {#each $participantStore as participant, i}
    {#if i == $participantIndex}
      <div
        class="active-card"
        on:click={(e) => {
          e.preventDefault();
          participantIndex.set(i);
          localStorage.participantIndex = i;
          currentCombatant = $participantStore[i];
          currentType = currentCombatant.type
          outgoingCurrentHp = currentCombatant.currentHp;
          outgoingMaxHp = currentCombatant.hp.slice(
            0,
            currentCombatant.hp.indexOf("(") - 1
          );
          console.log(currentCombatant.type)
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
            <div>{participant.ac.slice(0, participant.ac.indexOf("("))}</div>
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
    {:else}
      <div
        class="card"
        on:click={(e) => {
          e.preventDefault();
          participantIndex.set(i);
          localStorage.participantIndex = i;
          currentCombatant = $participantStore[i];
          currentType = currentCombatant.type
          console.log(currentType)
          outgoingCurrentHp = currentCombatant.currentHp;
          outgoingMaxHp = currentCombatant.hp.slice(
            0,
            currentCombatant.hp.indexOf("(") - 1
          );
        }}
      >
        <div class="card-section">
          {participant.name}
          <a
            style="margin-left:2em;cursor:pointer;"
            on:click={() => {
              removeParticipant($participantStore, participant);
              location.reload();
            }}>X</a
          >
        </div>

        <div class="card-section">
          <div>Initiative:</div>
          <div>{participant.init}</div>
        </div>

        <div class="card-section">
          <div>Armor:</div>
          {#if participant.ac.includes("(")}
            <div>{participant.ac.slice(0, participant.ac.indexOf("("))}</div>
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
    {/if}
  {/each}
</div>
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

<style>
  .card {
    border: 1px solid rgb(55, 64, 184);
    border-radius: 1em;
    margin-bottom: 1em;
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
  }
</style>
