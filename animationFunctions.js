import { divs, parentEl } from "./script.js";
import  { settings } from "./settings.js";

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

function div(x, y) {
    return divs[(y-1)*settings.divsPerRow + (x-1)];
}

export function moveToNext() {
    parentEl.prepend(divs[divs.length-1]);    
}

export function moveRandom() {
    const rand = Math.floor(Math.random() * divs.length);
    parentEl.prepend(divs[rand]);
}

export function shuffle() {
    for (let i = 0; i < divs.length; i++) {
        const rand = Math.floor(Math.random() * divs.length);
        parentEl.prepend(divs[rand]);
    }
}

export function swap() {
    const a = Math.floor(Math.random() * divs.length);
    const b = Math.floor(Math.random() * (divs.length - 1));    
    swapElements(divs[a], divs[b+(b>=a)])
}

export function omga() {
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
export function omga_reverse() {
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