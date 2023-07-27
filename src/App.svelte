<script>
  import {SvelteToast} from '@zerodevx/svelte-toast'
  import Router from "svelte-spa-router"
  import Main from './lib/Components/Main.svelte';
  import MonsterSearch from './lib/Components/MonsterSearch.svelte';
  import Monster from './lib/Components/Monster.svelte';
  import Combat from './lib/Components/Combat.svelte';
const routes = {
  '/' : MonsterSearch,
  '/monster/:id' :Monster,
  '/combat' : Combat
}
</script>

  <SvelteToast options={{ reversed: true, intro: { y: 192 } }} />
  <Router {routes}/>

<style>
</style>