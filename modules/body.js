import { drawRect } from './drawing.js';

class Body {
    constructor(x, y, children) {
        this.x = x;
        this.y = y;
        this.children = children;
        if (children) {
            this.adopt();
        }
    }
    adopt() {
        this.children.forEach(child => {
            child.parent = this;
            child.x = child.parent.x + this.x
            child.y = child.parent.y + this.y
        });
    }
    render(ctx) {
        this.children.forEach(child => {
            child.render(ctx);
        });
    }

}

class Rectangle extends Body {
    constructor(x, y, width, height, fillColor, strokeColor, children) {
        super(x, y, children);
        this.width = width;
        this.height = height
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
    }
    render(ctx) {
        super.render(ctx)
        drawRect(ctx, this.x, this.y, this.width, this.height, this.fillColor, this.strokeColor);
    }
}



const container = new Body(150, 150, [
    new Rectangle(5, 5, 100, 100, 'blue', 'red', [
        new Rectangle(0, 0, 50, 50, 'green', 'red', []),
    ])
])

const b1 = new Body(0, 0)
const b2 = new Body(0, 0)
b1.adopt(b2) // this will push b2 into b1.children and



export { Rectangle }
export {container}