
import * as fs from "node:fs";

let spells = JSON.parse(fs.readFileSync("./all_Spells.json").toString())

for(let i =0; i<spells["spells"].length;i++){
    spells["spells"][i]["numberId"] = i.toString()
}

fs.writeFileSync("./spells.json", JSON.stringify(spells))