'use strict';

const CONFIG = {
    minShift: -Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight) / 4,
    maxShift: Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight) / 4,
    canvasWidth: document.documentElement.clientWidth,
    canvasHeight: document.documentElement.clientHeight,
    clickPaddings: 2,
    shiftEqual: false,
    animationDuration: 300,
    colors: ['red', 'yellow', 'black', 'white'],
    // colors: getColorPalette(),
    basicColors: {
        // light: 'white',
        // dark: 'black',
        light: 'gray',
        dark: 'gray',
    },
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
    CONFIG.minShift = -Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight) / 4;
    CONFIG.maxShift = Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight) / 4;
    canvasElement.width = CONFIG.canvasWidth;
    canvasElement.height = CONFIG.canvasHeight;
    fillBasic();
    ctx.putImageData(imageData, CONFIG.canvasWidth - oldWidth, CONFIG.canvasHeight - oldHeight);
}

canvasElement.width = CONFIG.canvasWidth;
canvasElement.height = CONFIG.canvasHeight;
