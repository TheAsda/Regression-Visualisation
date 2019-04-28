let data = [];
const regression = new LinearTF();

function setup() {
    let canvas = createCanvas(400, 400);
    canvas.mousePressed(addPoint);
}

function draw() {
    background(0);
    fill(255);

    for (var i = 0; i < data.length; i++) {
        var x = map(data[i].x, 0, 1, 0, width);
        var y = map(data[i].y, 0, 1, height, 0);
        ellipse(x, y, 8, 8);
    }

    
    if (data.length > 1) {
        regression.train();
        regression.drawLine();
    }
}

function addPoint() {
    let x = map(mouseX, 0, width, 0, 1);
    let y = map(mouseY, 0, height, 1, 0);
    data.push({
        'x': x,
        'y': y
    });
}

function resetPoints() {
    data = [];
}

function getXs() {
    let result = [];
    for (let i = 0; i < data.length; i++) {
        result.push(data[i].x);
    }
    return result;
}

function getYs() {
    let result = [];
    for (let i = 0; i < data.length; i++) {
        result.push(data[i].y);
    }
    return result;
}