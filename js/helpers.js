'use strict';

function makeShifts(equal = false) {
    const min = CONFIG.minShift;
    const max = CONFIG.maxShift;
    function getRandom() {
        return map(Math.random(), 0, 1, min, max);
    }
    const oneRandom = getRandom();

    function r() {
        return equal ? oneRandom : getRandom();
    }

    return {
        left: {
            top: r(),
            bottom: r(),
        },
        right: {
            top: r(),
            bottom: r(),
        },
        top: {
            left: r(),
            right: r(),
        },
        bottom: {
            left: r(),
            right: r(),
        },
    };
}

function makeShiftsWithTime(shifts, time, maxTime) {
    return {
        left: {
            top: map(time, 0, maxTime, 0, shifts.left.top),
            bottom: map(time, 0, maxTime, 0, shifts.left.bottom),
        },
        right: {
            top: map(time, 0, maxTime, 0, shifts.right.top),
            bottom: map(time, 0, maxTime, 0, shifts.right.bottom),
        },
        top: {
            left: map(time, 0, maxTime, 0, shifts.top.left),
            right: map(time, 0, maxTime, 0, shifts.top.right),
        },
        bottom: {
            left: map(time, 0, maxTime, 0, shifts.bottom.left),
            right: map(time, 0, maxTime, 0, shifts.bottom.right),
        },
    };
}

function map(num, frombottom, fromtop, tobottom, totop) {
    let a = num - frombottom;
    a *= (totop-tobottom)/(fromtop-frombottom);
    a += tobottom;
    return a;
}

function drawText(context) {
    context.font = CONFIG.save.font;
    context.textAlign = 'end';
    context.fillStyle = CONFIG.darkMode ? 'black' : 'white';
    context.strokeStyle = CONFIG.darkMode ? 'white' : 'black';
    context.lineWidth = CONFIG.save.strokeWidth;
    context.strokeText(CONFIG.save.text, CONFIG.canvasWidth - CONFIG.save.right, CONFIG.canvasHeight - CONFIG.save.bottom);
    context.fillText(CONFIG.save.text, CONFIG.canvasWidth - CONFIG.save.right, CONFIG.canvasHeight - CONFIG.save.bottom);
}

function fillBasic() {
    if (CONFIG.darkMode) {
        ctx.fillStyle = CONFIG.basicColors.dark;
    } else {
        ctx.fillStyle = CONFIG.basicColors.light;
    }
    ctx.fillRect(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight);
}

function downloadImgData(imgData) {
    const newCanvas = document.createElement('canvas');
    newCanvas.style.display = 'none';
    newCanvas.style.width = imgData.width + 'px';
    newCanvas.style.height = imgData.height + 'px';
    newCanvas.width = imgData.width;
    newCanvas.height = imgData.height;

    const newCtx = newCanvas.getContext('2d');
    newCtx.putImageData(imgData, 0, 0);
    drawText(newCtx);

    const myImageDataUrl = newCanvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = myImageDataUrl;
    link.download = CONFIG.save.fileName;

    link.click();

    link.remove();
    newCanvas.remove();
}

function getImage(imgData, key) {
    const newCanvas = document.createElement('canvas');
    newCanvas.style.display = 'none';
    newCanvas.style.width = imgData.width + 'px';
    newCanvas.style.height = imgData.height + 'px';
    newCanvas.width = imgData.width;
    newCanvas.height = imgData.height;

    const newCtx = newCanvas.getContext('2d');
    newCtx.putImageData(imgData, 0, 0);
    drawText(newCtx);

    const myImageDataUrl = newCanvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const img = document.createElement('img');
    img.src = myImageDataUrl;
    img.alt = key;
    newCanvas.remove();
    return img;
}

async function imageDataToBlob(imageData) {
    const w = imageData.width;
    const h = imageData.height;
    let canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    ctx.putImageData(imageData, 0, 0);
    drawText(ctx);
  
    return new Promise((resolve) => {
        canvas.toBlob(resolve); // implied image/png format
    });
}
