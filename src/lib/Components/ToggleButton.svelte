<script>
  import DiceBar from "./DiceBar.svelte";
  export let imgSrc;
  let sourcePath = "src/assets/";
  let isVisible = false;
</script>

<button
  class="dice-button"
  on:click={() => {
    isVisible = !isVisible;
  }}><img src="{sourcePath}{imgSrc}" class="dice-icon" /></button
>
{#if isVisible}
  <DiceBar />
{/if}

<style>
  .dice-button {
    background-color: white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 10px;
    right: 10px;
    max-width: 40px;
    max-height: 40px;
  }

  .dice-icon {
    max-width: 25px;
    max-height: 25px;
  }
</style>
