function drawLine(c, startX, startY, endX, endY, lineWidth, strokeColor) {
    c.beginPath();
    c.moveTo(startX, startY);
    c.lineTo(endX, endY);
    c.lineWidth = lineWidth;
    c.strokeStyle = strokeColor;
    c.stroke();
    c.closePath();
}


function drawTriangle(c, x, y, size, fillColor) {
    c.beginPath();
    c.moveTo(x - size/2, y);
    c.lineTo(x + size/2, y);
    c.lineTo(x, y + size);
    c.fillStyle = fillColor;
    c.fill();
    c.closePath();
}


export { drawLine, drawTriangle }