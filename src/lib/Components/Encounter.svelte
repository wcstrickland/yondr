<script>
  import Carousel from "svelte-carousel";
  import { participantStore, setParticipants } from "../utils/stores.js";
  import MonsterCombatant from "./MonsterCombatant.svelte";
  import PlayerCard from "./PlayerCard.svelte";
  import { toast } from "@zerodevx/svelte-toast";
  let participants = $participantStore;
  participants = participants.sort((a, b) => b.init - a.init);
  let current = 0;
  let max = participants.length - 1;

  function modifyParticipant(newParticipant) {
    for (let i = 0; i < participants.length; i++) {
      if (participants[i].uid === newParticipant.uid) {
        participants.splice(i, 1, newParticipant);
      }
    }
    participants = [...participants]
    setParticipants(participants);
  }
</script>

{#each $participantStore as participant, i}
  {#if i === current}
    {#if participant.numberId}
      <MonsterCombatant data={participant} {modifyParticipant} />
    {:else}
      <PlayerCard player={participant} {modifyParticipant} />
    {/if}
  {/if}
{/each}

<span
  class="arrow is-left"
  id="pre"
  on:click={() => {
    if (current === 0) {
      current = max;
    } else {
      current -= 1;
    }
  }}
/>

<span
  class="arrow is-right"
  id="nxt"
  on:click={() => {
    if (current === max) {
      current = 0;
      toast.push("Starting Next Round!", {duration : 1000})
    } else {
      current += 1;
    }
  }}
/>

<style>
  #pre {
    position: sticky;
    bottom: 50%;
    right: 80%;
  }

  #nxt {
    position: sticky;
    bottom: 50%;
    left: 90%;
  }
  .arrow {
    margin: 25px;
    display: inline-block;
    height: 12px;
    position: relative;
    width: 12px;
  }
  .arrow::after {
    border-bottom-style: solid;
    border-bottom-width: 2px;
    border-right-style: solid;
    border-right-width: 2px;
    content: "";
    display: inline-block;
    height: 12px;
    left: 0;
    position: absolute;
    top: 0;
    width: 12px;
  }
  .arrow.is-right {
    -moz-transform: rotate(315deg);
    -ms-transform: rotate(315deg);
    -webkit-transform: rotate(315deg);
    transform: rotate(315deg);
  }
  .arrow.is-left {
    -moz-transform: rotate(135deg);
    -ms-transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg);
  }
  .arrow::after {
    border-color: rgb(0, 26, 255);
  }
  .arrow::before {
    background-color: rgb(178, 243, 0);
  }
</style>
