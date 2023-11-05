function appendDivs(count, parent, classname="", w=50, h=50, divMargin=2.5, indexDivs=true) {
    for (let i = 0; i < count; i++) {
        const div = document.createElement('div');
        div.className = classname;
        div.style.width = `${w}px`;
        div.style.height = `${h}px`;
        div.style.margin = `${divMargin}px`;
        div.draggable = true;
        div.appendChild(document.createTextNode(indexDivs ? i : ''));
        parent.appendChild(div);
    }   
}

class Settings {
    constructor() {
        this.divsPerRow = 10;
        this.divsPerCol = 10;
        this.divsW = 50;
        this.divsH = 50;
        this.divMargin = 2.5;
        this.indexDivs = true;
        this.useFLIP = false;
    }

    static readFromPage() {
        const settings = new Settings();
        settings.divsPerRow = Number.parseFloat(document.querySelector('#divsPerRow')?.value) || 10;
        settings.divsPerCol = Number.parseFloat(document.querySelector('#divsPerCol')?.value) || 10;
        settings.divsW = Number.parseFloat(document.querySelector('#divsW')?.value) || 50;
        settings.divsH = Number.parseFloat(document.querySelector('#divsH')?.value) || 50;
        settings.divMargin = Number.parseFloat(document.querySelector('#divMargin')?.value) || 2.5;
        settings.indexDivs = document.querySelector('#indexDivs')?.checked || true;
        settings.useFLIP = document.querySelector('#useFLIP')?.checked || false;
        return settings;
    }
}

function applyPageSettings() {
    const settings = Settings.readFromPage();
    applySettings(settings);
}

function applySettings(s) {
    parentEl.innerHTML = '';
    parentEl.style.maxWidth = (s.divsPerRow * (s.divsW + 2*s.divMargin)) + 'px';
    appendDivs(s.divsPerRow*s.divsPerCol, parentEl, 'square', s.divsW, s.divsH, s.divMargin, s.indexDivs);
}
function getCurRects() {
    const rects = [];
    for (const div of divs) {
        const rect = div.getBoundingClientRect();
        rects.push(rect);
    }
    return rects;
}

/**
 * @type {HTMLElement}
 */
const parentEl = document.querySelector('#div_container');
console.log(parentEl);
applyPageSettings();

/**
 * @type {[HTMLElement]}
 */

const divs = [];
orderDivs();

console.log(divs);
const div = (x, y) => divs[(y-1)*10 + (x-1)];

// Let's define some animations!
class fa {
    static animate(applyChange) {
        // For every element, get the current rect, then move it to the next position
        const curRects = getCurRects().map(r => ({x: r.x, y: r.y}));
        // Prepend last div to the front
        applyChange();
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

    static moveToNext() {
        parentEl.prepend(divs[divs.length-1]);    
    }

    static moveToRandom() {
        const rand = Math.floor(Math.random() * divs.length);
        parentEl.prepend(divs[rand]);
    }

    static shuffle() {
        for (let i = 0; i < divs.length; i++) {
            const rand = Math.floor(Math.random() * divs.length);
            parentEl.prepend(divs[rand]);
        }
    }
}
function orderDivs() {
    for (let i = 0; i < parentEl.children.length; i++) {
        divs.push(parentEl.children[i]);
    }
}

// Queue of animations
const animQueue = [fa.moveToNext, fa.moveToRandom, fa.shuffle];
let i = 0;

setInterval(() => {

    fa.animate(animQueue[i]);
    i = (i+1) % animQueue.length;

}, 750)
