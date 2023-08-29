<script>
  let sourcePath = "src/assets/";
  let sourceTarget = "back-button.png";
  let isMobile =
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/Blackberry/i);
</script>

{#if !isMobile}
  <img
    class="back-icon"
    on:click={() => history.back()}
    src="{sourcePath}{sourceTarget}"
  />
{/if}

<style>
  .back-icon {
    position: fixed;
    bottom: 10px;
    left: 10px;
    width: 40px;
    height: 40px;
    max-width: 40px;
    max-height: 40px;
    cursor: pointer;
  }
</style>
