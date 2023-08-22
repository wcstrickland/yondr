
import * as fs from "node:fs";

// let monsters = JSON.parse(fs.readFileSync("./monsters.json").toString())

// for (let i = 0; i < monsters["monsters"].length; i++) {
//     if (monsters["monsters"][i].hp.includes("(")) {
//         monsters["monsters"][i]["currentHp"] = monsters["monsters"][i].hp.slice(0, monsters["monsters"][i].hp.indexOf("(") - 1)
//     }else{
//         monsters["monsters"][i]["currentHp"] = monsters["monsters"][i].hp
//     }
// }

// fs.writeFileSync("./new_monsters.json", JSON.stringify(monsters))

let spells = JSON.parse(fs.readFileSync("./spells.json").toString())
let spellList = []

for (let i = 0; i < spells["spells"].length; i++) {
    spellList.push(spells["spells"][i].name.toLowerCase())
}

fs.writeFileSync("./spell_list.json", JSON.stringify(spellList))