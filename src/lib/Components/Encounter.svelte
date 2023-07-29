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
  let cssClass = "mid"

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

<div class={cssClass}>
  {#each $participantStore as participant, i}
    {#if i === current}
      {#if participant.numberId}
        <MonsterCombatant data={participant} {modifyParticipant} />
      {:else}
        <PlayerCard player={participant} {modifyParticipant} />
      {/if}
    {/if}
  {/each}
</div>

<span
  class="arrow is-left"
  id="pre"
  on:click={() => {
    cssClass = cssClass === "mid" ? "right" : "mid"
    setTimeout(()=>{
      cssClass = cssClass === "mid" ? "right" : "mid"
    },150)
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
    console.log("ha");
    cssClass = cssClass === "mid" ? "left" : "mid"
    setTimeout(()=>{
      cssClass = cssClass === "mid" ? "left" : "mid"
    },150)
    if (current === max) {
      current = 0;
      toast.push("Starting Next Round!", { duration: 1000 });
    } else {
      current += 1;
    }
  }}
/>

<style>
  .mid{
    translate: 5px ;
    transition:all 150ms ease-in-out
  }
  .left{
    translate: -5px ;
    transition:all 150ms ease-in-out
  }
  .right{
    translate: 10px ;
    transition:all 150ms ease-in-out
  }
  #pre {
    position: sticky;
    bottom: 50%;
    right: 75%;
    cursor: pointer;
  }

  #nxt {
    position: sticky;
    bottom: 50%;
    left: 75%;
    cursor: pointer;
    transition: left 150ms ease-in-out;
  }

  @media screen and (max-width: 575px) {
    #pre {
      position: sticky;
      bottom: 10%;
      right: 75%;
    }

    #nxt {
      position: sticky;
      bottom: 10%;
      left: 75%;
    }
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
    border-color: rgb(44, 123, 196);
  }
  .arrow::before {
    background-color: rgb(178, 243, 0);
  }
</style>
