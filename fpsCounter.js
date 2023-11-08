const times = [];
export let fps;
let callbacks = [];

export function registerCallback(callback) {
    callbacks.push(callback);
}

function refreshLoop() {
    window.requestAnimationFrame(() => {
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) {
            times.shift();
        }
        times.push(now);
        fps = times.length;
        refreshLoop();
    });
    for (const callback of callbacks) {
        callback(fps);
    }
}

refreshLoop();