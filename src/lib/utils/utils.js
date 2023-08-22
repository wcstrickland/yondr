
export function findToHit(dataString) {
    const pattern = /\+(\d{1,2}) to hit/
    let match = dataString.match(pattern)
    if (match !== null) {
        match = match[1]
    }
    return { "exists": match !== null, "value": parseInt(match) }
}

export function findDamageStrings(dataString) {
    if (typeof dataString === "string") {
        let damageStrings = []
        // const toHitPattern = /\+(\d{1,2}) to hit/
        const toHitPattern = /\+(\d{1,2})/g
        const damagePattern = /\(*(\d{1,2})d(\d{1,2})\s?\+?\s?(\d{0,2})\)*/g
        let damageMatches = dataString.matchAll(damagePattern)
        let toHitMatches = dataString.matchAll(toHitPattern)
        for (let match of toHitMatches) {
            if (toHitMatches !== null) {
                damageStrings.push(match[0])
            }
        }
        for (let match of damageMatches) {
            if (match !== null) {
                damageStrings.push(match[0])
            }
        }
        return damageStrings
    }
    return []
}

export function extractRoll(dataString) {
    const damagePattern = /\(*(\d{1,2})d(\d{1,2})\s?\+?\s?(\d{0,2})\)*/
    const toHitPattern = /\+(\d{1,2})/
    let damageMatch = dataString.match(damagePattern)
    let toHitMatch = dataString.match(toHitPattern)
    if (toHitMatch !== null) {
        return { "num": 1, "sides": 20, "mod": toHitMatch[1] }
    }
    if (damageMatch !== null) {
        return { "num": damageMatch[1], "sides": damageMatch[2], "mod": damageMatch[3] }
    }
}


export function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + 1);
}

export function generateRollText(num, sides, mod) {
    let output = []
    let total = 0
    for (let i = 0; i < num; i++) {
        let roll = randomNumber(1, sides)
        total += roll
        output.push(roll)
        output.push("+")
    }
    output.pop()
    if (mod >= 0 && mod !== "") {
        output.push("+")
        output.push(`(${mod})`)
        total += parseInt(mod) || 0
    } else {
        if (mod !== "") {
            output.push("+")
            output.push(`(${mod})`)
            total += parseInt(mod) || 0
        }
    }
    output.push(` = ${total}`)
    return output.join(" ")
}

export function splitAroundRoll(dataString, patternMatches) {
    let outPut = []
    let currentPosition = 0
    for (let match of patternMatches) {
        let matchLength = match.length
        let matchStartingPosition = dataString.indexOf(match, currentPosition)
        let matchEndingPosition = matchStartingPosition + matchLength
        outPut.push({ "value": dataString.slice(currentPosition, matchStartingPosition), "replace": false })
        currentPosition = matchEndingPosition
        outPut.push({ "value": match, "replace": true })
    }
    outPut.push({ "value": dataString.slice(currentPosition), "replace": false })
    return outPut;
}


export function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}


export function findSpells(traitText, spell_list) {
    let outPutList = [];
    let wordArray = traitText.split(",")
    for (let word of wordArray) {
        if (word.includes(":")) {
            word = word.slice(word.indexOf(":") + 1)
        }
        if (spell_list.includes(word.trim())) {
            outPutList.push(word)
        }
    }
    return outPutList
}

export function addSpellIds(chunks, spell_list) {
    for (let chunk of chunks) {
        if (chunk.replace) {
            if (chunk.value.includes(":")) {
                chunk.value = chunk.value.slice(chunk.value.indexOf(":") + 1)
            }
            chunk["spellId"] = spell_list.indexOf(chunk.value.trim())
        }
    }
    return chunks
}