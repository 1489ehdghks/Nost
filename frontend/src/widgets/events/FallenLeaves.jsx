import React, { useEffect, useRef } from 'react';

class Leaf {
    static defaultOptions = {
        colors: ['#FFA07A', '#FF6347', '#FF4500', '#CD853F', '#F4A460'], // Array of leaf colors
        size: [5, 10],
        speed: [1, 3],
        wind: [-0.5, 1],
        spin: [-0.02, 0.02] // Leaves can spin slightly while falling
    };

    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.options = { ...Leaf.defaultOptions, ...options };
        this.initialize();
    }

    initialize() {
        this.x = Math.random() * this.canvas.offsetWidth;
        this.y = Math.random() * -this.canvas.offsetHeight;
        this.size = Leaf.randomBetween(...this.options.size);
        this.speed = Leaf.randomBetween(...this.options.speed);
        this.wind = Leaf.randomBetween(...this.options.wind);
        this.spin = Leaf.randomBetween(...this.options.spin);
        this.color = this.options.colors[Math.floor(Math.random() * this.options.colors.length)];
        this.angle = Math.random() * Math.PI * 2; // Full circle for initial random rotation
    }

    static randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    update() {
        this.y += this.speed;
        this.x += this.wind;
        this.angle += this.spin;

        if (this.y > this.canvas.height) {
            this.initialize(); // Reset leaf when it falls out of view
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.size, this.size / 2, this.angle, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

const FallenLeaves = ({ count = 100 }) => {
    const canvasRef = useRef(null);
    let leaves = [];

    const createLeaves = () => {
        for (let i = 0; i < count; i++) {
            leaves.push(new Leaf(canvasRef.current));
        }
    };

    useEffect(() => {
        createLeaves();
        const update = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

            leaves.forEach(leaf => {
                leaf.update();
                leaf.draw(ctx);
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

    return <canvas ref={canvasRef} className="fallen-leaves-canvas" />;
};

export default FallenLeaves;
