class PolynomialTF {
    constructor(n) {
        this.power = n;
        this.muls = new Array(n + 1);
        for (let i = 0; i < this.muls.length; i++)
            this.muls[i] = tf.variable(tf.scalar(Math.random()));
        this.learningRate = 0.1;
        this.optimizer = tf.train.adam(this.learningRate);
    }

    loss(predictions, labels) {
        return predictions.sub(labels).square().mean();
    }

    predict(xs) {
        let tfXs = tf.tensor1d(xs);
        let result = this.muls[0];
        for (let i = 1; i < this.power + 1; i++) {
            let temp = tfXs.pow(tf.scalar(i)).mul(this.muls[i]);
            result = result.add(temp);
        }
        return result;
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
        const curveX = [];
        for (let i = 0; i <= 1; i += 0.01)
            curveX.push(i);

        const ys = tf.tidy(() => this.predict(curveX));
        let curveY = ys.dataSync();
        ys.dispose();

        beginShape();
        strokeWeight(2);
        stroke(200);
        noFill();

        for (let i = 0; i < curveX.length; i++) {
            let x = map(curveX[i], 0, 1, 0, width);
            let y = map(curveY[i], 0, 1, height, 0);
            vertex(x, y);
        }
        endShape();
    }
}