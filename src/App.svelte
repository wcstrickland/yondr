<script>
  import {SvelteToast} from '@zerodevx/svelte-toast'
  import Router from "svelte-spa-router"
  import MonsterSearch from './lib/Components/MonsterSearch.svelte';
  import Monster from './lib/Components/Monster.svelte';
  import Builder from './lib/Components/Builder.svelte';
  import Encounter from './lib/Components/Encounter.svelte';
  import DiceButton from './lib/Components/DiceButton.svelte';
  import ToggleButton from './lib/Components/ToggleButton.svelte';
const routes = {
  '/' : MonsterSearch,
  '/monster/:id' :Monster,
  '/combat' : Encounter,
  '/builder' : Builder,
  "/test": DiceButton
}
</script>

<div id="main">
  <SvelteToast options={{ reversed: true, intro: { y: 192 } }} />
  <Router {routes}/>
  <ToggleButton imgSrc={"d20.png"}/>
</div>

<style>
</style>