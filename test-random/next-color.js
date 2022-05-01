function nextColor(colorPalette) {
    return randomEntity(colorPalette.colors);
}

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

function randomEntity(arr) {
    return arr[randomInt(arr.length)];
}
