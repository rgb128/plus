'use strict';

// const imagesHistory = {
//     imageDatas: [],
//     current: -1,
//     add() {
//         if (this.current !== this.imageDatas.length - 1) {
//             //add after ctrl+z
//             this.imageDatas.length = this.current + 1;
//         }
//         this.current++;
//         this.imageDatas.push(ctx.getImageData(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight));
//     },
//     back() {
//         if (this.current <= 0) {
//             throw new Error('Cannot go back from first position');
//         }
//         this.current--;
//         this.draw();
//     },
//     forward() {
//         if (this.current >= this.imageDatas.length - 1) {
//             throw new Error('Cannot go forward from last position');
//         }
//         this.current++;
//         this.draw();
//     },
//     draw() {
//         const imgData = this.imageDatas[this.current];
//         ctx.putImageData(imgData, CONFIG.canvasWidth - imgData.width, CONFIG.canvasHeight - imgData.height);
//     },
// };

const imagesHistory = {
    imageDatas: [],
    current: -1,

    add() {
        const currentHash = window.location.hash;
        const imgData = ctx.getImageData(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight);
        const parent = (currentHash && currentHash.length > 2) ? currentHash.substring(1) : null;
        this.current++;
        const newHash = 'plus' + this.current;
        this.imageDatas[newHash] = new HistoryItem(imgData, parent);
        window.location.hash = newHash;
    }
};

window.onhashchange = function() {
    const hash = window.location.hash.substring(1);
    console.log(hash);
    const imgData = imagesHistory.imageDatas[hash];
    if (!imgData) return;
    console.log(imgData);
    ctx.putImageData(imgData.imageData, CONFIG.canvasWidth - imgData.imageData.width, CONFIG.canvasHeight - imgData.imageData.height); // this shoudn't be execute every time
}

class HistoryItem {
    /** @type {ImageData} */ imageData;
    /** @type {HistoryItem?} */ parent;
    // /** @type {HistoryItem[]} */ children; // .filter(parent === key);
    /** @type {HTMLElement} */ root;
    /** @type {boolean} */ opened = true;

    constructor (imageData, parent) {
        this.imageData = imageData;
        this.parent = parent;
        // this.children = [];
        this.root = this.render(true);
    }

    render(active) {
        //write later
    }
}
