/**
 * @type {HTMLSelectElement}
 */
const animationSelect = document.querySelector('#animationFunc');

/**
 * @type {HTMDElement}
 */
const parentEl = document.querySelector('#div_container');

/**
 * @type {[HTMLElement]}
 */

let divs = [];
orderDivs();

const div = (x, y) => divs[(y-1)*settings.divsPerRow + (x-1)];


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

// Let's define some animations!
class fa {
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

    static swap() {
        swapElements(divs[0], divs[37])
    }

    static omga() {
        let rectWidth = settings.divsPerRow;
        let rectHeight = settings.divsPerCol;
        let x = 0;
        let y = 0;
        let dir = true;
        const changeDir = true;
        while (1 < rectWidth && 1 < rectHeight) {
            // ######
            // #    #
            // ######
            // iterate through the rectangle as through a cycle
            // swap every element with (x, y), except for (x, y) itself
            
            let curX = x+1;
            let curY = y;
            const w = rectWidth;
            const h = rectHeight;
            let dx = 1, dy = 0; 
            if (!dir) {
                dx = 0; dy = 1; curX = x; curY = y+1;
            }
            while (curX != x || curY != y) {
                swapElements(div(x+1, y+1), div(curX+1, curY+1));

                // Move to the next position
                curX += dx;
                curY += dy;
                if (dir) {
                    // Change direction if necessary
                    if (curX === w+x) {
                        dx = 0;
                        dy = 1;
                        curX--;
                        curY++;
                    } else if (curX === -1+x) {
                        dx = 0;
                        dy = -1;
                        curX++;
                        curY--;
                    } else if (curY === h+y) {
                        dx = -1;
                        dy = 0;
                        curX--;
                        curY--;
                    } else if (curY === -1+y) {
                        dx = 1;
                        dy = 0;
                        curX++;
                        curY++;
                    }
                } else {
                    // Change direction if necessary
                    if (curX === w+x) {
                        dx = 0;
                        dy = -1;
                        curX--;
                        curY--;
                    } else if (curX === -1+x) {
                        dx = 0;
                        dy = 1;
                        curX++;
                        curY++;
                    } else if (curY === h+y) {
                        dx = 1;
                        dy = 0;
                        curX++;
                        curY--;
                    } else if (curY === -1+y) {
                        dx = -1;
                        dy = 0;
                        curX--;
                        curY++;
                    }
                }
            }


            x++;
            y++;
            rectWidth -= 2;
            rectHeight -= 2;
            if (changeDir) dir = !dir;

        }

    }  
    static omga_reverse() {
        let rectWidth = settings.divsPerRow;
        let rectHeight = settings.divsPerCol;
        let x = 0;
        let y = 0;
        let dir = false;
        const changeDir = true;
        while (1 < rectWidth && 1 < rectHeight) {
            // ######
            // #    #
            // ######
            // iterate through the rectangle as through a cycle
            // swap every element with (x, y), except for (x, y) itself
            
            let curX = x+1;
            let curY = y;
            const w = rectWidth;
            const h = rectHeight;
            let dx = 1, dy = 0; 
            if (!dir) {
                dx = 0; dy = 1; curX = x; curY = y+1;
            }
            while (curX != x || curY != y) {
                swapElements(div(x+1, y+1), div(curX+1, curY+1));

                // Move to the next position
                curX += dx;
                curY += dy;
                if (dir) {
                    // Change direction if necessary
                    if (curX === w+x) {
                        dx = 0;
                        dy = 1;
                        curX--;
                        curY++;
                    } else if (curX === -1+x) {
                        dx = 0;
                        dy = -1;
                        curX++;
                        curY--;
                    } else if (curY === h+y) {
                        dx = -1;
                        dy = 0;
                        curX--;
                        curY--;
                    } else if (curY === -1+y) {
                        dx = 1;
                        dy = 0;
                        curX++;
                        curY++;
                    }
                } else {
                    // Change direction if necessary
                    if (curX === w+x) {
                        dx = 0;
                        dy = -1;
                        curX--;
                        curY--;
                    } else if (curX === -1+x) {
                        dx = 0;
                        dy = 1;
                        curX++;
                        curY++;
                    } else if (curY === h+y) {
                        dx = 1;
                        dy = 0;
                        curX++;
                        curY--;
                    } else if (curY === -1+y) {
                        dx = -1;
                        dy = 0;
                        curX--;
                        curY++;
                    }
                }
            }


            x++;
            y++;
            rectWidth -= 2;
            rectHeight -= 2;
            if (changeDir) dir = !dir;

        }

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
        this.animation = fa.moveToNext;
    }

    static readFromPage() {
        const settings = new Settings();
        settings.divsPerRow = Number.parseFloat(document.querySelector('#divsPerRow')?.value) ?? 10;
        settings.divsPerCol = Number.parseFloat(document.querySelector('#divsPerCol')?.value) ?? 10;
        settings.divsW = Number.parseFloat(document.querySelector('#divsW')?.value) ?? 50;
        settings.divsH = Number.parseFloat(document.querySelector('#divsH')?.value) ?? 50;
        settings.divMargin = Number.parseFloat(document.querySelector('#divMargin')?.value) ?? 2.5;
        settings.indexDivs = document.querySelector('#indexDivs')?.checked ?? true;
        settings.useFLIP = document.querySelector('#useFLIP')?.checked ?? false;
        settings.animation = fa[animationSelect.value];
        return settings;
    }
}

let settings = applyPageSettings();

function applyPageSettings() {
    const settings = Settings.readFromPage();
    applySettings(settings);
    return settings;
}

function applySettings(s) {
    divs = [];
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

function camelCaseToPhrase(str) {
    const words = str.match(/[A-Za-z][a-z]*/g) || [];
    const phrase = words.join(' ');
    return phrase.charAt(0).toUpperCase() + phrase.slice(1).toLowerCase();
}

const animations = Object.getOwnPropertyNames(fa).filter(prop => typeof fa[prop] === 'function');
animations.forEach(a => {
    const option = document.createElement('option');
    option.value = a;
    option.textContent = camelCaseToPhrase(a);
    animationSelect.append(option);
})

function orderDivs() {
    divs = [];
    for (let i = 0; i < parentEl.children.length; i++) {
        divs.push(parentEl.children[i]);
    }
}
function swapElements(el1, el2) {
    if (parentEl.firstChild === el1) {
        el2.previousSibling.after(el1);
        parentEl.prepend(el2);
        return;
    }
    if (parentEl.firstChild === el2) {
        el1.previousSibling.after(el2);
        parentEl.prepend(el1);
        return;
    }

    let prev1 = el1.previousSibling;
    let prev2 = el2.previousSibling;

    prev1.after(el2);
    prev2.after(el1);
}

setInterval(() => {
    animate(settings.animation);
}, 750)
