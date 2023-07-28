<script>
  import {SvelteToast} from '@zerodevx/svelte-toast'
  import Router from "svelte-spa-router"
  import Main from './lib/Components/Main.svelte';
  import MonsterSearch from './lib/Components/MonsterSearch.svelte';
  import Monster from './lib/Components/Monster.svelte';
  import Combat from './lib/Components/Combat.svelte';
  import Builder from './lib/Components/Builder.svelte';
  import Encounter from './lib/Components/Encounter.svelte';
const routes = {
  '/' : MonsterSearch,
  '/monster/:id' :Monster,
  '/combat' : Encounter,
  '/builder' : Builder
}
</script>

  <SvelteToast options={{ reversed: true, intro: { y: 192 } }} />
  <Router {routes}/>

<style>
</style>