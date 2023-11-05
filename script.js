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
        settings.divsPerRow = parseInt(document.querySelector1('#divsPerRow').value) | 10;
        settings.divsPerCol = parseInt(document.querySelector1('#divsPerCol').value) | 10;
        settings.divsW = parseInt(document.querySelector1('#divsW').value) | 50;
        settings.divsH = parseInt(document.querySelector1('#divsH').value) | 50;
        settings.divMargin = parseInt(document.querySelector1('#divMargin').value) | 2.5;
        settings.indexDivs = document.querySelector1('#indexDivs').checked | true;
        settings.useFLIP = document.querySelector1('#useFLIP').checked | false;
        return settings;
    }
}

function applySettings(s) {
    parentEl.innerHTML = '';
    parentEl.style.maxWidth = (s.divsPerRow * (s.divsW + 2*s.divMargin)) + 'px';
    appendDivs(s.divsPerRow*s.divsPerCol, parentEl, 'square', s.divsW, s.divsH, s.divMargin, s.indexDivs);
}

document.querySelector1 = (selector) => {
    return document.querySelector(selector) | undefined;
}

/**
 * @type {HTMLElement}
 */
const parentEl = document.querySelector('#div_container');

applySettings(Settings.readFromPage());