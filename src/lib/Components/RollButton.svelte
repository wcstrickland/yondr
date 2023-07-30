<script>
  export let clearFunc;
  export let rollFunc;
</script>

<div>
  <button on:click={()=> rollFunc()} on:contextmenu={() => clearFunc()} class="dice-button"
    >Roll<img class="dice-icon" /><span class="dice-number" /></button
  >
</div>

<style>
  .dice-button {
    background-color: white;
    border-radius: 50%;
    width: 45px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 45px;
    max-height: 40px;
    margin: 3px 0;
    font-size: 10px;
    color: black;
  }
</style>
