'use strict';

const CONFIG = {
    minShift: 5,
    maxShift: 50,
    canvasWidth: document.documentElement.clientWidth,
    canvasHeight: document.documentElement.clientHeight,
    clickPaddings: 2,
    shiftEqual: false,
    animationDuration: 500,
    colors: ['red', 'green', 'blue', 'magenta', 'gray', 'aqua', 'sienna'],
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

