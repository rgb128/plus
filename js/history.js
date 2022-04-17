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
        this.imageDatas[newHash].root.contentDiv.classList.add('active');
        window.location.hash = newHash;

        for (const key in imagesHistory.imageDatas) {
            imagesHistory.imageDatas[key].redrawLinkToParent();
        }
    }
};

window.onhashchange = function() {
    for (const key in imagesHistory.imageDatas) {
        imagesHistory.imageDatas[key].root.contentDiv.classList.remove('active');
    }
    const hash = window.location.hash.substring(1);
    const imgData = imagesHistory.imageDatas[hash];
    imgData.root.contentDiv.classList.add('active');
    if (!imgData) return;
    ctx.putImageData(imgData.imageData, CONFIG.canvasWidth - imgData.imageData.width, CONFIG.canvasHeight - imgData.imageData.height); // this shoudn't be execute every time

    const scrollX = imgData.root.offsetLeft - ((document.getElementById('history').offsetWidth - imgData.root.contentDiv.offsetWidth) / 2);
    const scrollY = imgData.root.offsetTop - ((document.getElementById('history').offsetHeight - imgData.root.offsetHeight) / 2);
    document.getElementById('history').scrollTo(scrollX, scrollY);
}

class HistoryItem {
    /** @type {string} */ key;
    /** @type {ImageData} */ imageData;
    /** @type {HistoryItem?} */ parent;
    /** @type {HTMLElement} */ root;
    /** @type {HTMLElement} */ linkToParent;
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
        
        const img = getImage(this.imageData, this.key);
        img.onclick = () => {
            window.location.hash = this.key;
        }
        const downloadBtn = document.createElement('button');
        downloadBtn.innerText = 'save';
        downloadBtn.onclick = () => {
            downloadImgData(this.imageData);
        };
        const copyBtn = document.createElement('button');
        copyBtn.innerText = 'copy';
        copyBtn.onclick = async () => {
            copyBtn.innerText = 'copying';
            const blob = await imageDataToBlob(this.imageData);
            try {
                await navigator.clipboard.write([
                    new ClipboardItem({
                        'image/png': blob
                    })
                ]);
                copyBtn.innerText = 'copied';
            } catch (ex) {
                console.error(ex);
                copyBtn.innerText = 'failed';
            }
            setTimeout(() => {
                copyBtn.innerText = 'copy';
            }, 2000);
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

        this.drawLinkToParent();
    }
    drawLinkToParent(padding = 5) {
        if (!this.parent) return;
        const div = document.createElement('div');
        div.classList.add('link');
        this.linkToParent = div;
        this.redrawLinkToParent(padding);
        document.querySelector('#history > div').appendChild(div);
    }

    redrawLinkToParent(padding = 5) {
        if (!this.parent) return;
        const thisCnt = this.root.contentDiv;
        const parentCnt = imagesHistory.imageDatas[this.parent].root.contentDiv;
        const pX = parentCnt.offsetLeft + parentCnt.offsetWidth + padding;
        const pY = parentCnt.offsetTop + parentCnt.offsetHeight / 2;
        const tX = thisCnt.offsetLeft - padding;
        const tY = thisCnt.offsetTop + thisCnt.offsetHeight / 2;

        const hypotenuse = Math.sqrt(Math.pow(pX - tX, 2) + Math.pow(pY - tY, 2));
        this.linkToParent.style.width = hypotenuse + 'px';
        this.linkToParent.style.top = pY + 'px';
        this.linkToParent.style.left = pX + 'px';
        const angle = Math.atan((tY - pY) / (tX - pX));
        this.linkToParent.style.transform = `rotate(${angle}rad)`;
    }
}
