<script>
  import {
    customMonsters,
    setCustomMonsters,
    addCustomMonster,
  } from "../utils/stores.js";
  import { uuidv4 } from "../utils/utils.js";

  let name = "";
  let size = "";
  let alignment = "";
  let hp = "";
  let ac = "";
  let speed = "";
  let str = "";
  let dex = "";
  let con = "";
  let int = "";
  let wis = "";
  let cha = "";
  let immune = "";
  let resist = "";
  let vulnerable = "";
  let conditionImmune = "";
  let senses = "";
  let save = "";
  let skill = "";
  let languages = "";
  let cr = "";
  let slots = "";
  let reaction = { name: "", text: "" };
  let description = "";
  let action1 = { name: "", text: "" };
  let action2 = { name: "", text: "" };
  let action3 = { name: "", text: "" };
  $: actions = [action1, action2, action3];
  $: reactions = [reaction];

  let newMonster;
</script>

<div style="display:flex;flex-direction:column;align-items:center;">

<h5>Spaces matter</h5>

<div class="instruction">You do not need to provide the modifier for stats such as CHA or INT</div>
<div class="instruction">Important: for skills and saves "skill +8, skill +2" - no space between + and number </div>
<div class="instruction">Important: "to hit" should be written +10 to hit - no space between + and number </div>
<div class="instruction">Important: damage should be written (3d6 + 8)  - spaces only before and after "+"</div>

<form>
  <div class="form-chnk">
    <label for="name" />Name:
    <input type="text" id="name" name="name" bind:value={name} />
  </div>

  <div class="form-chnk">
    <label for="size" />Size:
    <input type="text" id="size" name="size" bind:value={size} />
  </div>

  <div class="form-chnk">
    <label for="alignment" />Alignment:
    <input type="text" id="alignment" name="alignment" bind:value={alignment} />
  </div>

  <div class="form-chnk">
    <label for="hp" />Hp:
    <input type="text" id="hp" name="hp" bind:value={hp} />
  </div>

  <div class="form-chnk">
    <label for="ac" />Ac:
    <input type="text" id="ac" name="ac" bind:value={ac} />
  </div>

  <div class="form-chnk">
    <label for="speed" />speed:
    <input type="text" id="speed" name="speed" bind:value={speed} />
  </div>

  <div class="form-chnk">
    <label for="str" />str:
    <input type="text" id="str" name="str" bind:value={str} />
  </div>

  <div class="form-chnk">
    <label for="dex" />dex:
    <input type="text" id="dex" name="dex" bind:value={dex} />
  </div>

  <div class="form-chnk">
    <label for="con" />con:
    <input type="text" id="con" name="con" bind:value={con} />
  </div>

  <div class="form-chnk">
    <label for="int" />int:
    <input type="text" id="int" name="int" bind:value={int} />
  </div>

  <div class="form-chnk">
    <label for="wis" />wis:
    <input type="text" id="wis" name="wis" bind:value={wis} />
  </div>

  <div class="form-chnk">
    <label for="cha" />cha:
    <input type="text" id="cha" name="cha" bind:value={cha} />
  </div>

  <div class="form-chnk">
    <label for="immune" />immune:
    <input type="text" id="immune" name="immune" bind:value={immune} />
  </div>

  <div class="form-chnk">
    <label for="resist" />resist:
    <input type="text" id="resist" name="resist" bind:value={resist} />
  </div>

  <div class="form-chnk">
    <label for="vulnerable" />vulnerable:
    <input
      type="text"
      id="vulnerable"
      name="vulnerable"
      bind:value={vulnerable}
    />
  </div>

  <div class="form-chnk">
    <label for="conditionImmune" />Condition Immune:
    <input
      type="text"
      id="conditionImmune"
      name="conditionImmune"
      bind:value={conditionImmune}
    />
  </div>

  <div class="form-chnk">
    <label for="senses" />senses:
    <input type="text" id="senses" name="senses" bind:value={senses} />
  </div>

  <div class="form-chnk">
    <label for="save" />save:
    <input
      type="text"
      id="save"
      name="save"
      bind:value={save}
      placeholder="Con +11, Wis +7"
    />
  </div>

  <div class="form-chnk">
    <label for="skill" />skill:
    <input
      type="text"
      id="skill"
      name="skill"
      bind:value={skill}
      placeholder="Perception +7, Stealth +10"
    />
  </div>

  <div class="form-chnk">
    <label for="languages" />languages:
    <input type="text" id="languages" name="languages" bind:value={languages} />
  </div>

  <div class="form-chnk">
    <label for="cr" />cr:
    <input type="text" id="cr" name="cr" bind:value={cr} />
  </div>

  <div class="form-chnk">
    <label for="slots" />slots:
    <input type="text" id="slots" name="slots" bind:value={slots} />
  </div>

  <div class="form-chnk">
    <label for="action1" />Action 1 Name:
    <input
      type="text"
      id="action1"
      name="action1"
      bind:value={action1.name}
      placeholder="Longsword:"
    />
  </div>

  <div class="form-chnk">
    <label for="action1t" />Action 1 Text:
    <input
      type="text"
      id="action1t"
      name="action1t"
      bind:value={action1.text}
      placeholder="Melee weapon +11 to hit one target"
    />
  </div>

  <div class="form-chnk">
    <label for="action2" />Action 2 Name:
    <input
      type="text"
      id="action2"
      name="action2"
      bind:value={action2.name}
      placeholder="(3d8+10)"
    />
  </div>

  <div class="form-chnk">
    <label for="action2t" />Action 2 Text:
    <input
      type="text"
      id="action2t"
      name="action2t"
      bind:value={action2.text}
    />
  </div>

  <div class="form-chnk">
    <label for="action3" />Action 3 Name:
    <input type="text" id="action3" name="action3" bind:value={action3.name} />
  </div>

  <div class="form-chnk">
    <label for="action3t" />Action 3 Text:
    <input
      type="text"
      id="action3t"
      name="action3t"
      bind:value={action3.text}
    />
  </div>

  <div class="form-chnk">
    <label for="reactionName" />Reaction Name:
    <input
      type="text"
      id="reactionName"
      name="reactionName"
      bind:value={reaction.name}
    />
  </div>

  <div class="form-chnk">
    <label for="reactionText" />Reaction Text:
    <input
      type="text"
      id="reactionText"
      name="reactionText"
      bind:value={reaction.text}
    />
  </div>

  <div class="form-chnk">
    <label for="description" />description:
    <input
      type="text"
      id="description"
      name="description"
      bind:value={description}
    />
  </div>

  <button
    on:click={(e) => {
      e.preventDefault();
      newMonster = {
        name: name,
        size: size,
        type: "custom",
        alignment: alignment,
        hp: hp,
        ac: ac,
        speed: speed,
        str: str,
        dex: dex,
        con: con,
        int: int,
        wis: wis,
        cha: cha,
        immune: immune,
        resist: resist,
        vulnerable: vulnerable,
        conditionImmune: conditionImmune,
        senses: senses,
        save: save,
        skill: skill,
        languages: languages,
        cr: cr,
        slots: slots,
        reaction: reactions,
        description: description,
        action: actions,
        uid: uuidv4(),
      };
      addCustomMonster($customMonsters, newMonster);
    }}>Create</button
  >
</form>
</div>

<style>
  .form-chnk {
    display: flex;
    justify-content: space-between;
    width: 17em;
    margin-bottom: 0.5em;
  }
  .instruction{
    margin-bottom:.5em;
  }
</style>
