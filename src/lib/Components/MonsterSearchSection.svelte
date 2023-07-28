<script>
  export let monster;
  export let updateParticipants;
  let init = "";
</script>

<div style="margin-top:1em;">
  <a
    style="font-size:21px;"
    href={`#/monster/${monster.numberId}`}
   >{monster.name}</a
  >
  <br />
  cr {monster.cr}
  {monster.type}
  <br />
  <div>
  </div>
</div>

<style>
</style>
