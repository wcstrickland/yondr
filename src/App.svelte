<script>
  import {SvelteToast} from '@zerodevx/svelte-toast'
  import Router from "svelte-spa-router"
  import MonsterSearch from './lib/Components/MonsterSearch.svelte';
  import Monster from './lib/Components/Monster.svelte';
  import MonsterSheet from './lib/Components/MonsterSheet.svelte';
  import Builder from './lib/Components/Builder.svelte';
  import Encounter from './lib/Components/Encounter.svelte';
  import ToggleButton from './lib/Components/ToggleButton.svelte';
  import CustomMonsterBuilder from './lib/Components/CustomMonsterBuilder.svelte';
  import SpellSearch from './lib/Components/SpellSearch.svelte';
  import Spell from './lib/Components/Spell.svelte';
  import Combat from './lib/Components/Combat.svelte';
  import Combat1 from './lib/Components/Combat1.svelte';

const routes = {
  '/' : MonsterSearch,
  '/monster/:id' :MonsterSheet,
  // '/monster/:id' :Monster,
  '/builder' : Builder,
  "/createmonster": CustomMonsterBuilder,
  "/spells": SpellSearch,
  "/spell/:id": Spell,
  "/encounter" : Encounter,
  '/combat' : Combat1,
}
</script>

<div id="main">
  <SvelteToast options={{ reversed: true, intro: { y: 192 } }} />
  <Router {routes}/>
  <ToggleButton imgSrc={"d20.png"}/>
</div>

<style>
</style>