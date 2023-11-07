import { settings, applyPageSettings } from './settings.js';

/**
 * @type {HTMDElement}
 */
export const parentEl = document.querySelector('#div_container');

/**
 * @type {[HTMLElement]}
 */

export let divs = [];

export function clearDivs() { divs = [];}

export function orderDivs() {
    clearDivs();
    for (let i = 0; i < parentEl.children.length; i++) {
        divs.push(parentEl.children[i]);
    }
}
orderDivs();

function getCurRects() {
    const rects = [];
    for (const div of divs) {
        const rect = div.getBoundingClientRect();
        rects.push(rect);
    }
    return rects;
}

function animate(applyChange) {
    // For every element, get the current rect, then move it to the next position
    const curRects = getCurRects().map(r => ({x: r.x, y: r.y}));
    // Prepend last div to the front
    if (applyChange) applyChange();
    const newRects = getCurRects().map(r => ({x: r.x, y: r.y}))
    // Now, animate!
    for (let i = 0; i < divs.length; i++) {
        const div = divs[i];
        const curRect = curRects[i];
        const newRect = newRects[i];
        const dx = curRect.x - newRect.x;
        const dy = curRect.y - newRect.y;
        div.animate([
            {
                transform: `translate(${dx}px, ${dy}px)`
            },
            {
                transform: 'none'
            }
        ], {
            duration: 500,
            easing: 'ease-in-out'
        });
    }

    orderDivs();  
}

orderDivs();
setInterval(() => {
    animate(settings?.animation);
}, 750);

function applyChange(input) {
    let value = +input.value;
    if (input.step < 1)
        value = value.toFixed(2);

    input.nextElementSibling.value = value;
}

const inputs = document.querySelectorAll('input:has(+ output)');
inputs.forEach(i => {
    i.addEventListener('input', _ => {
        applyChange(i);
    });
    applyChange(i);
});

document.forms[0]?.addEventListener('submit', e => {
    e.preventDefault();
    applyPageSettings();
});
applyPageSettings();