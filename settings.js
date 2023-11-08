import * as fa from './animationFunctions.js';
import { divs, clearDivs, orderDivs, parentEl } from './script.js';

export let settings = undefined;

/**
 * @type {HTMLSelectElement}
 */
const animationSelect = document.querySelector('#animationFunc');

export function appendDivs(count, parent, classname="", w=50, h=50, divMargin=2.5, indexDivs=true) {
    for (let i = 0; i < count; i++) {
        const div = document.createElement('div');
        div.className = classname;
        div.style.width = `${w}px`;
        div.style.height = `${h}px`;
        div.style.margin = `${divMargin}px`;
        div.draggable = true;
        div.appendChild(document.createTextNode(indexDivs ? i : ''));
        parent.appendChild(div);
        div.dataset.i = i;
    }   
}

function camelCaseToPhrase(str) {
    const words = str.match(/[A-Za-z][a-z]*/g) || [];
    const phrase = words.join(' ');
    return phrase.charAt(0).toUpperCase() + phrase.slice(1).toLowerCase();
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

export function applyPageSettings() {
    /**
     * @type {Settings}
     */
    const _old_settings = settings;
    const _settings = Settings.readFromPage();


    if (_old_settings === undefined || _old_settings.divsPerCol != _settings.divsPerCol || _old_settings.divsPerRow != _settings.divsPerRow) {
        applySettings(_settings);
        orderDivs();
    } else {
        for (let i = 0; i < divs.length; i++) {
            const div = divs[i];
            div.style.width = `${_settings.divsW}px`;
            div.style.height = `${_settings.divsH}px`;
            div.style.margin = `${_settings.divMargin}px`;
            div.textContent = _settings.indexDivs ? div.dataset.i : '';
            settings.animation = fa[animationSelect.value];
        }
    }
    settings = _settings;
}

function applySettings(s) {
    clearDivs();
    parentEl.innerHTML = '';
    parentEl.style.maxWidth = (s.divsPerRow * (s.divsW + 2*s.divMargin)) + 'px';
    appendDivs(s.divsPerRow*s.divsPerCol, parentEl, 'square', s.divsW, s.divsH, s.divMargin, s.indexDivs);
}

const animations = Object.keys(fa).filter(prop => typeof fa[prop] === 'function');
animations.forEach(a => {
    const option = document.createElement('option');
    option.value = a;
    option.textContent = camelCaseToPhrase(a);
    animationSelect.append(option);
});
animationSelect.selectedIndex = 0;