'use strict';

const CONFIG = {
    minShift: 5,
    maxShift: 50,
    canvasWidth: document.documentElement.clientWidth,
    canvasHeight: document.documentElement.clientHeight,
    clickPaddings: 2,
    shiftEqual: false,
    animationDuration: 500,
    colors: ['black', 'red', 'white', 'green', 'blue', 'magenta', 'gray'],
    save: {
        text: '#808080 plus',
        fileName: 'plus.png',
        bottom: 15,
        right: 10,
        font: 'bold 30px Arial',
        strokeWidth: 4,
    },
    darkMode: !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches),
};

const canvasElement = document.getElementById('canvas');
const ctx = canvasElement.getContext('2d');

window.onresize = (e) => {
    const imageData = ctx.getImageData(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight);
    const oldWidth = CONFIG.canvasWidth;
    const oldHeight = CONFIG.canvasHeight;
    CONFIG.canvasWidth = document.documentElement.clientWidth;
    CONFIG.canvasHeight = document.documentElement.clientHeight;
    canvasElement.width = CONFIG.canvasWidth;
    canvasElement.height = CONFIG.canvasHeight;
    ctx.putImageData(imageData, CONFIG.canvasWidth - oldWidth, CONFIG.canvasHeight - oldHeight);
}

canvasElement.width = CONFIG.canvasWidth;
canvasElement.height = CONFIG.canvasHeight;
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
    
    const color = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];

    await makePlus(ctx, color, realX, realY);
}


function makePlus(ctx, color, x = 100, y = 100, width = CONFIG.canvasWidth, height = CONFIG.canvasHeight) {
    return new Promise((resolve, reject) => {
        const ANIMATION_DURATION = CONFIG.animationDuration;
        
        const shifts = makeShifts(CONFIG.shiftEqual);

        const topLeftImgData = ctx.getImageData(0, 0, x, y);
        const topRightImgData = ctx.getImageData(x, 0, width - x, y);
        const bottomLeftImgData = ctx.getImageData(0, y, x, height - y);
        const bottomRightImgData = ctx.getImageData(x, y, width - x, height - y);

        let start = 0;
        function stepAction(time) {
            const realShifts = makeShiftsWithTime(shifts, time, ANIMATION_DURATION);
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
            if (elapsed >= ANIMATION_DURATION) {
                stepAction(ANIMATION_DURATION);
                onEnd();
            } else {
                stepAction(elapsed);
                window.requestAnimationFrame(step);
            }
        }

        window.requestAnimationFrame(step);
    });
}

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
    // context.stroke = 'red';
    context.strokeText(CONFIG.save.text, CONFIG.canvasWidth - CONFIG.save.right, CONFIG.canvasHeight - CONFIG.save.bottom);
    context.fillText(CONFIG.save.text, CONFIG.canvasWidth - CONFIG.save.right, CONFIG.canvasHeight - CONFIG.save.bottom);
}
drawText(ctx);

function save() {
    const newCanvas = canvasElement.cloneNode(true);
    newCanvas.style.display = 'none';

    const newCtx = newCanvas.getContext('2d');
    newCtx.putImageData(ctx.getImageData(0, 0, CONFIG.canvasWidth, CONFIG.canvasHeight), 0, 0);
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
