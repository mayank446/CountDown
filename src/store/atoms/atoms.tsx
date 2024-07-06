import { atom } from "recoil";

export const hoursAtom = atom({
    key: 'hoursAtom',
    default: 0
})
export const minutesAtom = atom({
    key: 'minutesAtom',
    default: 10
})
export const secondsAtom = atom({
    key: 'secondsAtom',
    default: 0
})


export const controlsState = atom({
    key: 'controlsState',
    default: true
})
export const timerState = atom({
    key: 'timerState',
    default: false
})


export const timeAtom = atom({
    key: "timeAtom",
    default: false
})


export const formAtom = atom({
    key: "formAtom",
    default: {
        Hour: 0,
        Minute: 10,
        Second: 0
    }
})