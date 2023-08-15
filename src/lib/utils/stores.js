import { writable } from 'svelte/store';



// create a store that initializes to reflect a section of localstorage or empty object
// export const participantStore = writable([])
export const participantStore = writable(JSON.parse(localStorage.getItem('participants'))||[])
export const participantIndex = writable(parseInt(localStorage.getItem('participantIndex'))|| -1)
export const searchCriteria = writable(JSON.parse(localStorage.getItem('serarchCriteria'))||{
    "type": "all",
    "lowerChallenge": "0",
    "upperChallenge": "30"
})
export const customMonsters = writable(JSON.parse(localStorage.getItem('customMonsters')) || [])

export function clearParticipants(){
    participantStore.set([])
    localStorage.setItem("participants", JSON.stringify([]))
}

export function setParticipants(arr){
    participantStore.set([...arr])
    localStorage.setItem("participants", JSON.stringify([...arr]))
}

export function addParticipant(existingStore, participant){
    participantStore.set([...existingStore, participant])
    localStorage.setItem("participants", JSON.stringify([...existingStore, participant]))
}

export function removeParticipant(existingStore, participant){
    let newStore = existingStore.filter(x => x.uid !== participant.uid)
    setParticipants(newStore)
}

export function updateSearchCriteria(key, val){
    searchCriteria.update(sc => {
        sc[key] = val
        return sc
    })
}

export function clearCustomMonsters(){
    customMonsters.set([])
    localStorage.setItem("customMonsters", JSON.stringify([]))
}

export function setCustomMonsters(arr){
    customMonsters.set([...arr])
    localStorage.setItem("customMonsters", JSON.stringify([...arr]))
}

export function addCustomMonster(existingStore, participant){
    customMonsters.set([...existingStore, participant])
    localStorage.setItem("customMonsters", JSON.stringify([...existingStore, participant]))
}

export function removeCustomMonster(existingStore, customMonster){
    let newStore = existingStore.filter(x => x.uid !== customMonster.uid)
    setCustomMonsters(newStore)
}