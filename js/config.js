'use strict';

const colorPalettes = [
    {
        name: 'Голова крестьянина',
        colors: ['#C64104','#D4A918','#2481AD','#0A3D4E','#E7DAD4','#A85333','#135221','#2B7D70','#A8BBAF','#080A08'],
    },
    {
        name: 'Le fils de l\'homme',
        colors: ['#447414','#E2D9D0','#733021','#B5957A','#ADC1C6','#91774B','#9F8069','#6D7A7F','#44545C','#191318'],
    },
    {
        name: 'Mona Lisa, La Gioconda',
        colors: ['#C8A85B','#AC5444','#897848','#9AA16B','#60442F','#988F9F','#66724B','#615667','#22151F','#434738'],
    },
    {
        name: 'Shrek Meme Face',
        colors: ['#CCC252','#E3DCCC','#AC8443','#9EA840','#8B8634','#64702F','#5A5527','#A0988E','#2D2F1E','#546056'],
    },
    {
        name: 'Der Wanderer über dem Nebelmeer',
        colors: ['#DAE4EE','#EDEBE8','#B9BECB','#4C6C74','#939288','#6D7984','#868285','#646057','#574F4E','#1B1A1F'],
    },
];

const CONFIG = {
    minShift: -Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight) / 4,
    maxShift: Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight) / 4,
    canvasWidth: document.documentElement.clientWidth,
    canvasHeight: document.documentElement.clientHeight,
    clickPaddings: 2,
    shiftEqual: false,
    animationDuration: 300,
    colors: colorPalettes[Math.floor(Math.random() * colorPalettes.length)].colors,
    basicColors: {
        light: 'white',
        dark: 'black',
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
