import { drawLine, drawTriangle } from './drawing.js';

class Timeline {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.duration = 30;
        this.currentTime = 15;
        this.fractional = 0.2;
    }
    dragCurrentTime(mouse) {
        let numberHovering = Math.round(mouse.x / (this.width / this.duration * this.fractional));
        this.currentTime = numberHovering;
    }
    detectCursor(mouse) {
        if (mouse.x > this.x && mouse.x < this.x + this.width && mouse.y > this.y && mouse.y < this.y + this.height) {
            this.dragCurrentTime(mouse)
        }
    }
    drawContainer(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = '#212432';
        ctx.fill();
        ctx.closePath();
    }
    drawCurrentTime(ctx) {
        drawLine(ctx, this.x + this.currentTime * (this.width / this.duration * this.fractional), this.y, this.x + this.currentTime * (this.width / this.duration * this.fractional), this.y + this.height, 3, 'yellow')
        drawTriangle(ctx, this.x + this.currentTime * (this.width / this.duration * this.fractional), this.y, 15, 'yellow')
    }
    drawSeconds(ctx) {
        ctx.font = '10px Arial';
        ctx.fillStyle = '#fff'
        let spacing = this.width / this.duration;
        for (let i = 0; i < this.duration; i++) {
            ctx.fillText(i, this.x + spacing * i, this.y + 10);
        }
    }
    drawFractionalMarks(ctx) {
        let yOffset = 25
        drawLine(ctx, this.x, this.y+yOffset, this.x + this.width, this.y+yOffset, 1, '#fff')
        for (let i = 0; i < this.duration * (1/this.fractional); i++) {
            drawLine(ctx, this.x + i * (this.width / this.duration * this.fractional), this.y+yOffset, this.x + i * (this.width / this.duration * this.fractional), this.y+yOffset*0.60, 1, '#fff')
        }
    }
    render(ctx) {
        this.drawContainer(ctx);
        this.drawCurrentTime(ctx)
        this.drawSeconds(ctx)
        this.drawFractionalMarks(ctx)
    }
}

export { Timeline };