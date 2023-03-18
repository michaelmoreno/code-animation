import { Line } from './modules/line.js'
import { Timeline } from './modules/timeline.js'
// import { Rect } from './modules/body.js'

import { container } from './modules/body.js'
console.log(container);

const canvas = document.querySelector("#scene");
const ctx = canvas.getContext("2d");

const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener('resize', resize);


function generateLines() {
    let lines = []
    for (let i = 1; i < 10; i++) {
        lines.push(new Line(i, ctx, 10, 20*i));
    }
    return lines
}

function renderLines(lines) {
    lines.forEach(line => {
        line.render(ctx)
    })
}


let mouse = {x: undefined, y: undefined, down: false}
canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})
document.onmousedown = function(event) {
    mouse.down = true
}


const timeline = new Timeline(0, canvas.height - canvas.height * .25, canvas.width, canvas.height * .25);

let key = null
document.onkeydown = function(event) {
    key = event.key
    if (event.key.length === 1) {
        lines[0].addCharacter(event.key)
    }
    timeline.play = true
    if (event.key === " ") {
        timeline.play = !timeline.play
    }
    if (event.key === 'Backspace') {
        lines[0].content.splice(5, 1)
    }
}

const lines = generateLines();

console.log(container)



function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    renderLines(lines)
    lines.forEach(line => {
        line.cursorDetection(mouse)
    })
    timeline.detectCursor(mouse, key)
    timeline.update()
    timeline.render(ctx)
    key = null
    requestAnimationFrame(render);
}

render()