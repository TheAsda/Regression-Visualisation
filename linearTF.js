class LinearTF {
    constructor() {
        this.m = tf.variable(tf.scalar(Math.random()));
        this.b = tf.variable(tf.scalar(Math.random()));
        this.learningRate = 0.5;
        this.optimizer = tf.train.sgd(this.learningRate);
    }

    loss(predictions, labels) {
        return predictions.sub(labels).square().mean();
    }

    predict(xs) {
        return tf.tensor1d(xs).mul(this.m).add(this.b);
    }

    train() {
        if (getXs().length > 0) {
            tf.tidy(() => {
                const ys = tf.tensor1d(getYs());
                this.optimizer.minimize(() => this.loss(this.predict(getXs()), ys));
            })
        }
    }

    drawLine() {
        const lineX = [0, 1];

        const ys = tf.tidy(() => this.predict(lineX));
        let lineY = ys.dataSync();
        ys.dispose();

        let x1 = map(lineX[0], 0, 1, 0, width);
        let x2 = map(lineX[1], 0, 1, 0, width);

        let y1 = map(lineY[0], 0, 1, height, 0);
        let y2 = map(lineY[1], 0, 1, height, 0);

        strokeWeight(2);
        stroke(200);

        line(x1, y1, x2, y2);
    }
}