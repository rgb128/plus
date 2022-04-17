'use strict';

const imagesHistory = {
    imageDatas: [],
    current: -1,
    add() {
        if (this.current !== this.imageDatas.length - 1) {
            //add after ctrl+z
            this.imageDatas.length = this.current + 1;
        }
        this.current++;
        this.imageDatas.push(ctx.getImageData(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight));
    },
    back() {
        if (this.current <= 0) {
            throw new Error('Cannot go back from first position');
        }
        this.current--;
        this.draw();
    },
    forward() {
        if (this.current >= this.imageDatas.length - 1) {
            throw new Error('Cannot go forward from last position');
        }
        this.current++;
        this.draw();
    },
    draw() {
        const imgData = this.imageDatas[this.current];
        ctx.putImageData(imgData, CONFIG.canvasWidth - imgData.width, CONFIG.canvasHeight - imgData.height);
    },
};
