import { drawLine, drawRect, drawTriangle } from './drawing.js';
// import { Rect } from './body.js'; 
import { Rectangle } from './body.js';

// class Playhead extends 

class Timeline extends Rectangle {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.duration = 10;
        this.FPS = 100;
        this.currentFrame = 0;
        this.fractional = 5;
        this.currentMarker = 0;
        this.frames = new Array(this.duration * this.FPS);
        this.play = false;

        this.controller = {
            x: this.x + 25,
            y: this.y - 25,
            width: this.width,
            height: 25,

        }
        this.buttons = {
            x: this.controller.x + this.controller.width/2,
            y: this.controller.y + this.controller.height/2,
            padding: 25,
        }
        this.toggle = {
            x: this.buttons.x,
            y: this.buttons.y
        },
        this.forward = {
            x: this.buttons.x + this.buttons.padding,
            y: this.buttons.y
        },
        this.backward = {
            x: this.buttons.x - this.buttons.padding,
            y: this.buttons.y
        }
    }
     update() {
        if (!this.play) 
            return
        let marker = (this.currentFrame / this.FPS);
        this.currentMarker = marker * this.fractional;
        this.currentFrame += 1;
        if (this.currentFrame >= this.frames.length) {
            this.currentFrame = 0;
            this.play = false;
        }
    }


    dragCurrentTime(mouse) {
        let numberHovering = Math.round(mouse.x / (this.width / this.duration / this.fractional));
        this.currentMarker = numberHovering;
    }
    detectKeypress(key) {
        console.log(this.play);
        if (key === ' ') {
            this.play = !this.play; // need to figure out why this stays true
        }
    }
    detectCursor(mouse, key) {
        if (mouse.x > this.x && mouse.x < this.x + this.width && mouse.y > this.y && mouse.y < this.y + this.height) {
            this.detectKeypress(key)
            if (!this.play) {
                this.dragCurrentTime(mouse)
            }
        }
    }
    drawToggle(ctx) {
        if (!this.play) {
            drawTriangle(ctx, this.toggle.x, this.toggle.y - 5, 13, '#fff')
        } else {
            drawRect(ctx, this.toggle.x, this.toggle.y-5, 12, 12, '#fff')
        }
    }
    drawForward(ctx) {
        drawRect(ctx, this.forward.x, this.forward.y-5, 10, 10, '#fff')
    }
    drawBackward(ctx) {
        drawRect(ctx, this.backward.x, this.backward.y-5, 10, 10, '#fff')
    }
    drawButtons(ctx) {
        this.drawToggle(ctx)
        this.drawForward(ctx)
        this.drawBackward(ctx)
    }
    drawController(ctx) {
        drawRect(ctx, this.controller.x, this.controller.y, this.controller.width, this.controller.height, '#31364a')
        this.drawButtons(ctx)
    }

    drawContainer(ctx) {
        drawRect(ctx, this.x, this.y, this.width, this.height, '#212432')
    }

    drawCurrentTime(ctx) {
        drawLine(ctx, this.x + this.currentMarker * (this.width / this.duration / this.fractional), this.y, this.x + this.currentMarker * (this.width / this.duration / this.fractional), this.y + this.height, 3, 'yellow')
        drawTriangle(ctx, this.x + this.currentMarker * (this.width / this.duration / this.fractional), this.y, 15, 'yellow')
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


        for (let i = 0; i < this.duration * this.fractional; i++) {
            drawLine(ctx, this.x + i * (this.width / this.duration / this.fractional), this.y+yOffset, this.x + i * (this.width / this.duration / this.fractional), this.y+yOffset*0.60, 1, '#fff')
        }
    }
    render(ctx) {
        this.drawController(ctx)
        this.drawContainer(ctx);
        this.drawCurrentTime(ctx)
        this.drawSeconds(ctx)
        this.drawFractionalMarks(ctx)
    }
}

export { Timeline };