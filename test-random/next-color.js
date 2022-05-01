function nextColor(colorPalette) {
    const colors = colorPalette.colors;
    let colorIndex = randomInt(colors.length - 1);
    if (colorIndex === colorPalette.previousColor) {
        colorIndex = colors.length - 1;
    }
    colorPalette.previousColor = colorIndex;
    return colors[colorIndex];
}

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

function randomEntity(arr) {
    return arr[randomInt(arr.length)];
}
