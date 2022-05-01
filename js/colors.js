'use strict';

const colorPalettes = [
    {
        name: 'Голова крестьянина',
        colors: ['#C64104','#D4A918','#2481AD','#0A3D4E','#A85333','#135221','#A8BBAF'],
    },
    {
        name: 'Der Wanderer über dem Nebelmeer',
        colors: ['#DAE4EE','#EDEBE8','#B9BECB','#4C6C74','#6D7984','#868285','#646057'],
    },
    {
        name: 'Future of Life Institute',
        colors: ['#A5B9CB','#81AE54','#5151ec','#5290C6','#A24C84'],
    },
    
    {
        name: 'Mezzodetto',
        colors: ['#F5B512','#6B59C4','#008855','#F4A2BC','#DFD8C7','#DFD8C7'],
    },
];

function getColorPalette() {
    function normalize(x) {
        x = +x;
        return x < 0 ? 0 : x > colorPalettes.length - 1 ? 0 : x;
    }
    const currentPalette = normalize(window.localStorage['colorPalette'] || 0);
    const newPalette = normalize(currentPalette + 1);
    console.log(currentPalette, newPalette);
    window.localStorage['colorPalette'] = newPalette;
    return colorPalettes[currentPalette].colors;
}
