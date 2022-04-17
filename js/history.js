'use strict';

const imagesHistory = {
    imageDatas: [],
    current: -1,

    add() {
        const currentHash = window.location.hash;
        const imgData = ctx.getImageData(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight);
        const parent = (currentHash && currentHash.length > 2 && this.imageDatas[currentHash.substring(1)]) ? currentHash.substring(1) : null;
        this.current++;
        const newHash = 'plus' + this.current;
        this.imageDatas[newHash] = new HistoryItem(newHash, imgData, parent);
        window.location.hash = newHash;
    }
};

window.onhashchange = function() {
    for (const key in imagesHistory.imageDatas) {
        imagesHistory.imageDatas[key].root.contentDiv.classList.remove('active');
    }
    const hash = window.location.hash.substring(1);
    console.log(hash);
    const imgData = imagesHistory.imageDatas[hash];
    imgData.root.contentDiv.classList.add('active');
    if (!imgData) return;
    console.log(imgData);
    ctx.putImageData(imgData.imageData, CONFIG.canvasWidth - imgData.imageData.width, CONFIG.canvasHeight - imgData.imageData.height); // this shoudn't be execute every time
}

class HistoryItem {
    /** @type {string} */ key;
    /** @type {ImageData} */ imageData;
    /** @type {HistoryItem?} */ parent;
    // /** @type {HistoryItem[]} */ children; // .filter(parent === key);
    /** @type {HTMLElement} */ root;
    /** @type {boolean} */ opened = true;

    constructor (key, imageData, parent) {
        this.key = key;
        this.imageData = imageData;
        this.parent = parent;
        this.render();
    }

    render() {
        const mainDiv = document.createElement('div');
        mainDiv.classList.add('item');
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content');
        const childrenDiv = document.createElement('div');
        childrenDiv.classList.add('children');
        mainDiv.appendChild(contentDiv);
        mainDiv.appendChild(childrenDiv);
        mainDiv.contentDiv = contentDiv;
        mainDiv.childrenDiv = childrenDiv;
        this.root = mainDiv;
        
        console.log(this.imageData);
        const img = getImage(this.imageData, this.key);
        img.onclick = () => {
            window.location.hash = this.key;
        }
        const downloadBtn = document.createElement('button');
        downloadBtn.innerText = 'download';
        downloadBtn.onclick = () => {
            console.log(this.imageData);
            downloadImgData(this.imageData);
        };
        const copyBtn = document.createElement('button');
        copyBtn.innerText = 'copy';
        copyBtn.onclick = () => {
            console.log('copy', this.imageData);
        };
        contentDiv.appendChild(img);
        contentDiv.appendChild(downloadBtn);
        contentDiv.appendChild(copyBtn);

        if (this.parent) {
            const parentEl = imagesHistory.imageDatas[this.parent];
            parentEl.root.childrenDiv.appendChild(this.root);
        } else {
            document.querySelector('#history > div').appendChild(this.root);
        }
    }
}
