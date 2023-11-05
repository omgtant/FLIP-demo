

function createDivs(countX, countY, width, height, className, parent, gap=5) {
    const animDivs = {};
    for (let i = 0; i < countY; i++) {
        animDivs[i+1] = {};
    }
    for (let i = 0; i < countY; i++) {
        for (let j = 0; j < countX; j++) {
            const div = document.createElement('div');
            div.className = className;
            div.style.position = 'absolute';
            div.style.width = `${width}px`;
            div.style.height = `${height}px`;
            div.style.top = `${i * (height + gap)}px`;
            div.style.left = `${j * (width + gap)}px`;
            div.draggable = true;
            parent.appendChild(div);
            div.i = i+1;
            div.j = j+1;
            animDivs[j+1][i+1] = div;
        }
    }

    parent.style.width = countX * width + (countX - 1) * gap + 'px';
    parent.style.height = countY * height + (countY - 1) * gap + 'px';
    return animDivs;
}
function getSetFromAnimDivs() {
    const set = new Set();
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            set.add(animDivs[i+1][j+1]);
        }
    }
    return set;
}

/**
 * @type {[[HTMLElement]]}
 */
const animDivs = createDivs(10, 10, 50, 50, 'square', document.querySelector('#div_container'));
animDivs[3][4].style.backgroundColor = 'red';

const divsSet = getSetFromObjs();


/// Anim stuff

function getCurRects() {
    const rects = [];
    for (const div of divsSet) {
        const rect = div.getBoundingClientRect();
        rects.push(rect);
    }
    return rects;
}