import React, { useEffect, useRef } from 'react';

class Snowflake {
    static defaultOptions = {
        color: '#FFFFFF',  // White color for snowflakes
        size: [2, 5],      // Snowflakes vary in size for a realistic look
        speed: [1, 3],     // Varied speeds for a gentle snowfall effect
        wind: [-0.5, 0.5]  // Light wind effect
    };

    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.options = { ...Snowflake.defaultOptions, ...options };
        this.initialize();
    }

    initialize() {
        this.x = Math.random() * this.canvas.offsetWidth;
        this.y = Math.random() * -this.canvas.offsetHeight;
        this.size = Snowflake.randomBetween(...this.options.size);
        this.speed = Snowflake.randomBetween(...this.options.speed);
        this.wind = Snowflake.randomBetween(...this.options.wind);
    }

    static randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    update() {
        this.y += this.speed;
        this.x += this.wind;

        if (this.y > this.canvas.height) {
            this.initialize(); // Reset snowflake when it falls out of view
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = this.options.color;
        ctx.fill();
        ctx.closePath();
    }
}

const Snow = ({ count = 300 }) => {
    const canvasRef = useRef(null);
    let snowflakes = [];

    const createSnowflakes = () => {
        for (let i = 0; i < count; i++) {
            snowflakes.push(new Snowflake(canvasRef.current));
        }
    };

    useEffect(() => {
        createSnowflakes();
        const update = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

            snowflakes.forEach(snowflake => {
                snowflake.update();
                snowflake.draw(ctx);
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

    return <canvas ref={canvasRef} className="snow-canvas" />;
};

export default Snow;
