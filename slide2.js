/**
 * @type {HTMLElement}
 */
const slide2El = document.querySelector('#reflow_square_of_squares');


const button = document.querySelector('#fs2_animate');

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

insertFlexGrid(40, slide2El, "square", 3, 1.5); 

const slide2El2 = slide2El.cloneNode(true);
slide2El.parentElement.appendChild(slide2El2);
slide2El2.id = "reflow_square_of_squares2";
slide2El2.style.bottom = `${slide2El.parentElement.clientHeight + slide2El.clientHeight}px`;
slide2El2.style.left = "-400px"


button.addEventListener('click', () => {
    slide2El.style.transition = "bottom 1s ease-in-out"
slide2El2.style.transition = "bottom 1s ease-in-out"


    const bot = (+slide2El.style.bottom.slice(0, -2));
    slide2El.style.bottom = `${bot-100}px`;
    
    const bot2 = (+slide2El2.style.bottom.slice(0, -2));
    slide2El2.style.bottom = `${bot2-100}px`;
});

