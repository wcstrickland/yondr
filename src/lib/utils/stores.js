import { writable } from 'svelte/store';



// create a store that initializes to reflect a section of localstorage or empty object
// export const participantStore = writable([])
export const participantStore = writable(JSON.parse(localStorage.getItem('participants'))||[])

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