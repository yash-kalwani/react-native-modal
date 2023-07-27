const modalInstances = [];
const listeners = [];

export const attachListener = (listener) => {
    if( listeners.indexOf(listener) > -1 ) {
        return;
    }
    listeners.push(listener)
}

export const pushInstance = (instance) => {
    if( modalInstances.includes(instance) ) {
        return;
    }
    modalInstances.push(instance);
    notifyInstances( modalInstances.length, modalInstances[0] )
}

