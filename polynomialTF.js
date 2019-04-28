class LinearTF {
    constructor() {
        this.m = 0;
        this.b = 1;
        this.learningRate = 0.05;
    }

    gradientDecent() {
        for (let i = 0; i < data.length; i++) {
            let x = data[i].x;
            let y = data[i].y;

            let guess = this.m * x + this.b;

            let error = y - guess;

            this.m += error * x * this.learningRate;
            this.b += error * this.learningRate;
        }
    }

    drawLine() {
        let x1 = 0;
        let y1 = this.m * x1 + this.b;

        let x2 = 1;
        let y2 = this.m * x2 + this.b;

        x1 = map(x1, 0, 1, 0, width);
        y1 = map(y1, 0, 1, height, 0);

        x2 = map(x2, 0, 1, 0, width);
        y2 = map(y2, 0, 1, height, 0);

        stroke(255);
        strokeWeight(2);
        line(x1, y1, x2, y2);
    }
}