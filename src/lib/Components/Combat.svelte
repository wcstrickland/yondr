<script>
  import Carousel from "svelte-carousel";
  import { participantStore } from "../utils/stores.js";
  import MonsterCombatant from "./MonsterCombatant.svelte";
  import PlayerCard from "./PlayerCard.svelte";
  let participants = $participantStore;
  participants = participants.sort((a, b) => b.init - a.init);
</script>

<div class="wrp">
  <Carousel>
    <div
      slot="dots"
      let:currentPageIndex
      let:pagesCount
      let:showPage
      style="display: flex;"
    >
      {#each Array(participants.length) as _, pageIndex}
        {#if currentPageIndex === pageIndex}
          <button
            class="custom-dot active"
            on:click={() => showPage(pageIndex)}
          >
            {pageIndex + 1}
          </button>
        {:else}
          <button class="custom-dot" on:click={() => showPage(pageIndex)}>
            {pageIndex + 1}
          </button>
        {/if}
      {/each}
    </div>
    {#each participants as participant}
      {#if participant.numberId}
        <MonsterCombatant id={participant.numberId} init={participant.init} />
        {:else}
        <PlayerCard player={participant}/>
      {/if}
    {/each}
  </Carousel>
</div>

<style>
  .wrp{
    /* margin-right:3em; */
  }
  @media screen and (max-width: 575px) {
    .wrp {
      height: 100vh;
      width: 90vw;
      margin-left:3em;
      margin-right:3em;
    }
  }
  .custom-dot {
    margin: 0 0.5em;
  }
  .active {
    color: rgb(23, 39, 184);
  }
</style>
