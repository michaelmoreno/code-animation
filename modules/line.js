class Line {
    constructor(lineNumber, ctx, x, y) {
        this.lineNumber = lineNumber;
        this.ctx = ctx
        this.x = x;
        this.y = y;
        this.fontSize = 24;
        this.width = this.fontSize;
        this.height = this.fontSize;
        this.content = [];
        this.selected = false;
    }
    updateWidth(scalar) {
        this.width += scalar
    }
    addCharacter(char) {
        this.ctx.font = `${this.fontSize}px Arial`;
        let width = this.ctx.measureText(char).width
        this.content.push({
            char: char,
            width: width
        })
        this.updateWidth(width)
    }
    render(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        if (this.selected) {
            ctx.rect(this.x, this.y, this.width, -this.height);
            ctx.fillStyle = '#212432';
            ctx.fill();
        }
        ctx.font = `${this.fontSize}px Arial`;
        ctx.fillStyle = '#bfc7d5';
        ctx.fillText(this.lineNumber, this.x, this.y);

        let x = this.x + this.fontSize;
        this.content.forEach(char => {
            ctx.fillText(char.char, x, this.y);
            x += char.width;
        })
        ctx.closePath();
    }
    getCharacterRanges() {
        let charRanges = []
        let lastX = this.x+this.fontSize;
        this.content.forEach(char => {
            let range = {char: char.char, fromX: lastX, toX: lastX + char.width}
            charRanges.push(range)
            lastX += char.width
        })
        return charRanges
    }
    getCursorSelection(mousePosition) {
        let charRanges = this.getCharacterRanges()
        if (charRanges.length === 0) {
            return null
        }
        charRanges.forEach(range => {
            if (mousePosition.x > range.fromX && mousePosition.x < range.toX && mousePosition.y < this.y && mousePosition.y > this.y - this.fontSize) {
                console.log(range);
                return range
            }
        })
    }
    cursorDetection(MousePosition) {
        if (MousePosition.x > this.x && MousePosition.x < this.x + this.width && MousePosition.y < this.y && MousePosition.y > this.y - this.height) {
            this.getCursorSelection(MousePosition)
            this.selected = true
        } else {
            this.selected = false
        }
    }
}    



export { Line };