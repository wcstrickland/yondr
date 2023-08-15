
import * as fs from "node:fs";

let monsters = JSON.parse(fs.readFileSync("./monsters.json").toString())

for (let i = 0; i < monsters["monsters"].length; i++) {
    if (monsters["monsters"][i].hp.includes("(")) {
        monsters["monsters"][i]["currentHp"] = monsters["monsters"][i].hp.slice(0, monsters["monsters"][i].hp.indexOf("(") - 1)
    }else{
        monsters["monsters"][i]["currentHp"] = monsters["monsters"][i].hp
    }
}

fs.writeFileSync("./new_monsters.json", JSON.stringify(monsters))