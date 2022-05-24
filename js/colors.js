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
    {
        name: 'Солярис 1972',
        colors: ['#E1150D','#DCCF15','#B0A816','#64A6CE','#2467A4','#962620','#E6DAD2','#1E3254','#100709','#445B52'],
    },
    {
        name: 'Pulp Fiction',
        colors: ['#E6BA45','#DF302F','#905B3A','#4E76A3','#D2D1D7','#542C20','#99A994','#363F57','#5C5D50','#141210'],
    },
    {
        name: 'Бутерброд',
        colors: ['#3C6C04','#BAC8DC','#A5B3D3','#552F18','#D9D7D5','#615C2C','#B7B0A9','#A0A6AA','#7C7771','#2F261C'],
    },
]
.map(cp => { return { ...cp, colors: cp.colors.map(c => { return { value: c }; }) }; });

function getColorPalette() {
    function normalize(x) {
        x = +x;
        return x < 0 ? 0 : x > colorPalettes.length - 1 ? 0 : x;
    }
    const currentPalette = normalize(window.localStorage['colorPalette'] || 0);
    const newPalette = normalize(currentPalette + 1);
    window.localStorage['colorPalette'] = newPalette;
    return colorPalettes[currentPalette].colors;
}
