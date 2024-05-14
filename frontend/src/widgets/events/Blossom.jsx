import React, { useEffect, useRef } from 'react';

class BlossomItem {
    static defaultOptions = {
        color: '#ffc0cb',
        radius: [3.0, 5.0],
        speed: [1, 2],
        wind: [-1.5, 1.5],
        blur: 2
    };

    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.options = { ...BlossomItem.defaultOptions, ...options };
        this.initialize();
    }

    initialize() {
        this.x = Math.random() * this.canvas.offsetWidth;
        this.y = Math.random() * -this.canvas.offsetHeight;
        this.radiusX = BlossomItem.randomBetween(...this.options.radius);
        this.radiusY = this.radiusX * 0.6;
        this.speed = BlossomItem.randomBetween(...this.options.speed);
        this.wind = BlossomItem.randomBetween(...this.options.wind);
    }

    static randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    update() {
        this.y += this.speed;
        this.x += this.wind;

        if (this.y > this.canvas.height) {
            this.initialize(); // 입자 재설정
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, Math.PI / 4, 0, 2 * Math.PI);
        ctx.fillStyle = this.options.color;
        ctx.shadowBlur = this.options.blur;
        ctx.shadowColor = this.options.color;
        ctx.fill();
        ctx.closePath();
    }
}
const Blossom = ({ count = 150 }) => {
    const canvasRef = useRef(null);
    let blossoms = [];

    const createBlossoms = () => {
        for (let i = 0; i < count; i++) {
            blossoms.push(new BlossomItem(canvasRef.current));
        }
    };

    useEffect(() => {
        createBlossoms();
        const update = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

            blossoms.forEach(blossom => {
                blossom.update();
                blossom.draw(ctx);
            });

            requestAnimationFrame(update);
        };
        update();

        const resize = () => {
            const canvas = canvasRef.current;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas ref={canvasRef} className="blossom-canvas" />;
};

export default Blossom;