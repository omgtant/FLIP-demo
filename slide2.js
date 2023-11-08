/**
 * @type {HTMLElement}
 */
const slide2El = document.querySelector('#reflow_square_of_squares');

function insertFlexGrid(side, parent, className, wh, margin) {
    parent.style.width = `${side * (wh + margin * 2) + margin*2}px`;
    parent.style.height = `${side * (wh + margin * 2) + margin*2}px`;
    for (let y = 0; y < side; y++) {
        for (let x = 0; x < side; x++) {
            const div = document.createElement('div');
            div.appendChild(document.createTextNode(`${y*side+x}`));
            div.className = className;
            div.style.width = `${wh}px`;
            div.style.height = `${wh}px`;
            div.style.margin = `${margin}px`;
            parent.appendChild(div);
        }
    }
}

insertFlexGrid(10, slide2El, "square", 25, 2.5); 