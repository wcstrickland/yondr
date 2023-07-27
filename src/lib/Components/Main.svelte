
<script>
  import {SvelteToast} from '@zerodevx/svelte-toast'
  import MonsterSearch from './MonsterSearch.svelte';
</script>

<div >
  <SvelteToast options={{ reversed: true, intro: { y: 192 } }} />
  <MonsterSearch/>
</div>

<style>
</style>