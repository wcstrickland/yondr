<script>
  export let imgSrc;
  export let incrementer;
  export let decrementer;
  export let number;
  let sourcePath = "src/assets/";
</script>

<div>
  <button
    on:click={(e) => {
      e.preventDefault();
      incrementer();
    }}
    on:contextmenu={(e) => {
      e.preventDefault();
      decrementer();
    }}
    class="dice-button"
    ><img src="{sourcePath}{imgSrc}" class="dice-icon" /><span
      class="dice-number">{number}</span
    ></button
  >
</div>

<style>
  .dice-button {
    background-color: white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 40px;
    max-height: 40px;
    margin: 3px 0;
  }

  .dice-icon {
    max-width: 25px;
    max-height: 25px;
  }
  .dice-number {
    color: black;
    font-size: 12px;
  }
</style>
