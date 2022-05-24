'use strict';

function nextColor(colorPalette) {
    let colors = colorPalette.filter(c => c.currentBool == colorPalette.currentBool);
    // console.log(colorPalette.currentBool ? '1' : '0', colorPalette.colors.map(c => c.currentBool ? '1' : '0').join());

    if (!colors.length) {
        colorPalette.currentBool = !colorPalette.currentBool;
        colors = colorPalette.filter(c => c.value !== colorPalette.previousColor);
        // console.log('flip');
    }

    const colorIndex = randomInt(colors.length);
    colorPalette.previousColor = colors[colorIndex].value;
    colors[colorIndex].currentBool = !colors[colorIndex].currentBool;
    return colors[colorIndex].value;
}

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

function randomEntity(arr) {
    return arr[randomInt(arr.length)];
}
