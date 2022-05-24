'use strict';

fillBasic();
drawText(ctx);
imagesHistory.add();

canvasElement.onclick = async (e) => {
    const x = e.offsetX;
    const y = e.offsetY;

    const realX = 
        x < CONFIG.clickPaddings ? CONFIG.clickPaddings :
        x > (CONFIG.canvasWidth - CONFIG.clickPaddings) ? (CONFIG.canvasWidth - CONFIG.clickPaddings) :
        x;
    const realY = 
        y < CONFIG.clickPaddings ? CONFIG.clickPaddings :
        y > (CONFIG.canvasHeight - CONFIG.clickPaddings) ? (CONFIG.canvasHeight - CONFIG.clickPaddings) :
        y;
    
    const color = nextColor(CONFIG.colors);

    await makePlus(ctx, color, realX, realY);
    imagesHistory.add();
}

function makePlus(ctx, color, x = CONFIG.canvasWidth / 2, y = CONFIG.canvasHeight / 2, width = CONFIG.canvasWidth, height = CONFIG.canvasHeight) {
    return new Promise((resolve, reject) => {
        const shifts = makeShifts(CONFIG.shiftEqual);

        const topLeftImgData = ctx.getImageData(0, 0, x, y);
        const topRightImgData = ctx.getImageData(x, 0, width - x, y);
        const bottomLeftImgData = ctx.getImageData(0, y, x, height - y);
        const bottomRightImgData = ctx.getImageData(x, y, width - x, height - y);

        let start = 0;
        function stepAction(time) {
            const realShifts = makeShiftsWithTime(shifts, time, CONFIG.animationDuration);
            ctx.clearRect(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight);
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, width, height);
            ctx.putImageData(topLeftImgData, -realShifts.top.left, -realShifts.left.top);
            ctx.putImageData(topRightImgData, x + realShifts.top.right, -realShifts.right.top);
            ctx.putImageData(bottomLeftImgData, -realShifts.bottom.left, y + realShifts.left.bottom);
            ctx.putImageData(bottomRightImgData, x + realShifts.bottom.right, y + realShifts.right.bottom);
        }
        function onEnd() {
            resolve(true);
        }

        function step(timestamp) {
            if (!start) {
                start = timestamp;
            }
            const elapsed = timestamp - start;
            if (elapsed >= CONFIG.animationDuration) {
                stepAction(CONFIG.animationDuration);
                onEnd();
            } else {
                stepAction(elapsed);
                window.requestAnimationFrame(step);
            }
        }

        window.requestAnimationFrame(step);
    });
}

// function save() {
//     const newCanvas = canvasElement.cloneNode(true);
//     newCanvas.style.display = 'none';

//     const newCtx = newCanvas.getContext('2d');
//     newCtx.putImageData(ctx.getImageData(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight), 0, 0);
//     drawText(newCtx);

//     const myImageDataUrl = newCanvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
//     const link = document.createElement('a');
//     link.style.display = 'none';
//     link.href = myImageDataUrl;
//     link.download = CONFIG.save.fileName;

//     link.click();

//     link.remove();
//     newCanvas.remove();
// }
