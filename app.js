'use strict';

// const ctx = document.getElementById('canvas').getContext('2d');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const ctx2 = document.getElementById('canvas2').getContext('2d');

ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
ctx.stroke();

ctx.font = "30px Arial";
ctx.fillText("Hello Worl5", 10, 0);
ctx.fillText("Hello Worl6", 10, 30);
ctx.fillText("Hello Worl7", 10, 60);
ctx.fillText("Hello World", 10, 100);
ctx.fillText("Hello Worl2", 10, 130);
ctx.fillText("Hello Worl3", 10, 160);
ctx.fillText("Hello Worl4", 10, 190);

function drawRotated(canvasCtx, image, degrees){
    // canvasCtx.clearRect(0, 0, 200, 200);
    canvasCtx.save();
    // canvasCtx.translate(canvasCtx.width / 2, canvasCtx.height / 2);
    canvasCtx.rotate(degrees * Math.PI / 180);
    // canvasCtx.drawImage(image, -image.width / 2, -image.width / 2);
    // canvasCtx.drawImage(image, image.width, image.width);
    canvasCtx.drawImage(image, 0, 0, 50, 50, 0, 0, 50, 50);
    canvasCtx.restore();
}

function func2(color = '#ff0000'){
    const imageData = ctx.getImageData(0, 0, 200, 200);
    ctx.clearRect(0, 0, 200, 200);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 200, 200);
    ctx.putImageData(imageData, 20, 0);

    // canvasCtx.restore();
}

function dr2(deg) {
    drawRotated(ctx2, canvas, deg);
}

function btnClick(e) {
    func2('#0000ff');
    func2('#00ff00');
    func2('#ffffff');
    func2('#ff0000');
}

async function dr3(x = 100, y = 100) {
    const colors = [];
    let colorI = 0;
    function getColor() {
        colorI++;
        if (colorI >= colors.length) {
            colorI = 0;
        }
        return color;
    }
    console.log('start');
    await makePlus(ctx, color, x, y);
    console.log('end');
}

function makePlus(ctx, color, x = 100, y = 100, width = 200, height = 200) {
    return new Promise((resolve, reject) => {
        //
    });
}

function map(num, frombottom, fromtop, tobottom, totop) {
    let a = num - frombottom;
    a *= (totop-tobottom)/(fromtop-frombottom);
    a += tobottom;
    return a;
}


let start, previousTimeStamp;
let done = false

function step(timestamp) {
  console.log(timestamp);
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);

