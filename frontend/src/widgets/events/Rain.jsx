import React, { useEffect, useRef } from 'react';

class RainDrop {
    static defaultOptions = {
        color: '#a4c0e5',  // Light blue color for raindrops
        length: [15, 20],
        speed: [4, 8],  // Faster falling speed to simulate rain
        wind: [0, 0.5],
        opacity: [0.5, 0.9]
    };

    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.options = { ...RainDrop.defaultOptions, ...options };
        this.initialize();
    }

    initialize() {
        this.x = Math.random() * this.canvas.offsetWidth;
        this.y = Math.random() * -this.canvas.offsetHeight;
        this.length = RainDrop.randomBetween(...this.options.length);
        this.speed = RainDrop.randomBetween(...this.options.speed);
        this.wind = RainDrop.randomBetween(...this.options.wind);
        this.opacity = RainDrop.randomBetween(...this.options.opacity);
    }

    static randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    update() {
        this.y += this.speed;
        this.x += this.wind;

        if (this.y > this.canvas.height) {
            this.initialize();
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.wind, this.y + this.length);
        ctx.strokeStyle = `rgba(164, 192, 229, ${this.opacity})`;  // Use RGBA for opacity control
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }
}

const Rain = ({ count = 150 }) => {
    const canvasRef = useRef(null);
    let rainDrops = [];

    const createRain = () => {
        for (let i = 0; i < count; i++) {
            rainDrops.push(new RainDrop(canvasRef.current));
        }
    };

    useEffect(() => {
        createRain();
        const update = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

            rainDrops.forEach(drop => {
                drop.update();
                drop.draw(ctx);
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

    return <canvas ref={canvasRef} className="rain-canvas" />;
};

export default Rain;
