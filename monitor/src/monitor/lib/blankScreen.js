import tracker from '../utils/tracker.js';

export function blankScreen() {
    let wrapperElements = ['html', 'body', '#container', '.content'];
    let emptyPoints = 0;
    function isWrapper(element) {
        let selector = getSelector(element);
        if (wrapperElements.indexOf(element) != -1) {
            emptyPoints++;
        }
    }
    for (let i = 0; i <= 9; i++) {
        let xElements = document.elementsFromPoint(window.innerWidth * i / 10, window.innerHeight / 2);
        let yElements = document.elementsFromPoint(window.innerWidth / 2, window.innerHeight * i / 10);
        isWrapper(xElements);
        isWrapper(yElements);
    }
}