<script>
  import MonsterCombatant from "./MonsterCombatant.svelte";
  import { participantStore, setParticipants } from "../utils/stores.js";
  export let participant;
  let participants = $participantStore;
  participants = participants.sort((a, b) => b.init - a.init);

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

<MonsterCombatant data={participant} {modifyParticipant}/>

<style>

</style>