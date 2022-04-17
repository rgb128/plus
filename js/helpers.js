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
