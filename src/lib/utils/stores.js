import { writable } from 'svelte/store';



// create a store that initializes to reflect a section of localstorage or empty object
export const participantStore = writable([])

export function clearParticipants(){
    participantStore.set([])
}

export function setParticipants(arr){
    participantStore.set([...arr])
}