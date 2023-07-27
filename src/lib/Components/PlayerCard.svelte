<script>
  export let player;
  let currentHp = player.hp;
  let maxHp = player.hp;
</script>

<article>
  <h1>{player.name}</h1>

  <div style="display: flex; justify-content:center; align-items:center;">
  <h1 style="margin-right:30px;">
    HP : 
  </h1>
    <h2 style="color:darkgray;" contenteditable="true"> {currentHp} </h2>
    <h2>/ {maxHp}</h2>
  </div>

  <h1>AC: {player.ac}</h1>
  <h1>Initiative: {player.init}</h1>
</article>

<style>
</style>
