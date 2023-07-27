const modalInstances = [];
const listeners = [];

export const attachListener = (listener) => {
    if( listeners.indexOf(listener) > -1 ) {
        return;
    }
    listeners.push(listener)
}