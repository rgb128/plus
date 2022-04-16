'use strict';

const CONFIG = {
    minShift: 5,
    maxShift: 50,
    shiftEqual: false,
    animationDuration: 500,
    colors: ['black', 'red', 'white', 'green', 'blue', 'magenta', 'gray'],
};

const ctx = document.getElementById('canvas').getContext('2d');

ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
ctx.stroke();

ctx.font = '30px Arial';
ctx.fillText('Hello Worl5', 10, 0);
ctx.fillText('Hello Worl6', 10, 30);
ctx.fillText('Hello Worl7', 10, 60);
ctx.fillText('Hello World', 10, 100);
ctx.fillText('Hello Worl2', 10, 130);
ctx.fillText('Hello Worl3', 10, 160);
ctx.fillText('Hello Worl4', 10, 190);

let colorI = 0;
async function btnClick(e) {
    function getColor() {
        colorI++;
        if (colorI >= CONFIG.colors.length) {
            colorI = 0;
        }
        return CONFIG.colors[colorI];
    }

    const x = map(Math.random(), 0, 1, 2, 198);
    const y = map(Math.random(), 0, 1, 2, 198);

    await makePlus(ctx, getColor(), x, y);
}

function makePlus(ctx, color, x = 100, y = 100, width = 200, height = 200) {
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
            console.log(realShifts);
            ctx.clearRect(0, 0, 200, 200);
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

function save() {
    const canvas = document.getElementById('canvas');
    const newCanvas = canvas.cloneNode(true);
    // newCanvas.style.display = 'none';

    const newCtx = newCanvas.getContext('2d');
    newCtx.putImageData(ctx.getImageData(0, 0, 200, 200), 0, 0);
    newCtx.font = '30px Arial';
    newCtx.textAlign = 'end';
    newCtx.fillText('#808080 plus', 190, 190);

    const myImageDataUrl = newCanvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = myImageDataUrl;
    link.download = 'img.png';

    link.click();

    link.remove();
    newCanvas.remove();
}
