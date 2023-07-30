<script>
  import DiceButton from "./DiceButton.svelte";
  import RollButton from "./RollButton.svelte";
  import { randomNumber } from "../utils/utils";
  import { toast } from "@zerodevx/svelte-toast";

  let diceObject = {
    4: 0,
    6: 0,
    8: 0,
    10: 0,
    12: 0,
    20: 0,
  };

  function clear() {
    diceObject = {
      4: 0,
      6: 0,
      8: 0,
      10: 0,
      12: 0,
      20: 0,
    };
  }

  function roll(){
    let rolls = []
    let total = 0;
    for(let key of Object.keys(diceObject)){
        for(let roll of Array(diceObject[key])){
            let numberOutPut = randomNumber(1,key)
            rolls.push(numberOutPut)
            total += numberOutPut
            rolls.push(" + ")
        }
    }
    rolls.pop()
    rolls.push(` = ${total}`)
    console.log(rolls.join(" "))
    toast.push(rolls.join(" "))
  }

  function incrementer(target) {
    diceObject[target] = diceObject[target] + 1;
  }
  function decrementer(target) {
    if(diceObject[target]>0){
        diceObject[target] = diceObject[target] - 1;
    }
  }
</script>

<div class="dice-bar" on:click={(e)=>e.preventDefault()} on:contextmenu={(e)=>e.preventDefault()}>
  <RollButton rollFunc={()=> roll()} clearFunc={()=>clear()}/>
  <DiceButton
    number={diceObject[20]}
    incrementer={() => incrementer(20)}
    decrementer={() => decrementer(20)}
    imgSrc={"d20.png"}
  />
  <DiceButton
    number={diceObject[4]}
    incrementer={() => incrementer(4)}
    decrementer={() => decrementer(4)}
    imgSrc={"d4.png"}
  />
  <DiceButton
    number={diceObject[6]}
    incrementer={() => incrementer(6)}
    decrementer={() => decrementer(6)}
    imgSrc={"d6.png"}
  />
  <DiceButton
    number={diceObject[8]}
    incrementer={() => incrementer(8)}
    decrementer={() => decrementer(8)}
    imgSrc={"d8.png"}
  />
  <DiceButton
    number={diceObject[10]}
    incrementer={() => incrementer(10)}
    decrementer={() => decrementer(10)}
    imgSrc={"d10.png"}
  />
  <DiceButton
    number={diceObject[12]}
    incrementer={() => incrementer(12)}
    decrementer={() => decrementer(12)}
    imgSrc={"d12.png"}
  />
</div>

<style>
  .dice-bar {
    display: flex;
    flex-direction: column-reverse;
    position: fixed;
    bottom: 55px;
    right: 10px;
  }
</style>
