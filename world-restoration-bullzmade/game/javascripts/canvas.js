var canvas = document.getElementById("paintingCanvas");
var ctx = canvas.getContext("2d")
var h = canvas.height
var w = canvas.width
let canvasTime = 0
let stars = []
let timesStarsPushed = 0
let starRadius = 3

class Star {
    constructor(timeElapsedStart, yMult, radius, color, speed, distance) {
        this.distance = distance ? distance : 1
        this.yMultiplier = yMult ? yMult : Math.random()
        this.speed = speed ? speed : 0.01
        this.timeElapsed = timeElapsedStart ? timeElapsedStart/this.speed : 0
        this.radius = radius ? radius : 1
        this.color = color ? color : "rgba(" + ((Math.random() * 206)+50) + ", " + ((Math.random() * 206)+50) + ", 255, 1)"
        
    }

    starTick(diff) {
        this.timeElapsed += (Math.min(diff, 0.15)/this.distance)
    }

    getStarOffset() {
        return (this.radius/this.distance)/w
    }

    getY() {
        return h * this.yMultiplier
    }

    remove() {
        if (this.timeElapsed * this.speed > (1+this.getStarOffset()*2)) {
            stars = stars.filter(s => s !== this)
        }
    }

    render() {
        drawFilledCircle(w*((1+this.getStarOffset())-((this.timeElapsed)*this.speed % (1+this.getStarOffset()*2))), this.getY(), this.radius/this.distance, 0 * Math.PI, 2 * Math.PI, this.color, this.color, 0, false)
    }
}

function randomlyPushStars() {
    if (Math.random() < 0.1) {
        stars.push(new Star(0, Math.random(), undefined, undefined, undefined, 1))
        stars.push(new Star(0, Math.random(), undefined, undefined, undefined, 2))
        
    }/*
    if (Math.random() < 0.001) {
        stars.push(new Star(0, Math.random(), 15*4, undefined, undefined, 4))
    }*/
    
}

function quadraticSize() {
    return Math.min(h, w) / Math
}

function sizeLimit(n, limit) {
    return n / Math.max(Math.min(h, w)/limit, 1)
}

function resizeCanvas() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}

function drawFilledCircle(x, y, r, startAngle, endAngle, color, fillColor, width = 1, counterclockwise = false) {
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.arc(x, y, r, startAngle, endAngle, counterclockwise)
    ctx.stroke()
    ctx.fillStyle = fillColor
    ctx.fill()
}

function drawCircle(x, y, r, startAngle, endAngle, color, width = 1, counterclockwise = false) {
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.arc(x, y, r, startAngle, endAngle, counterclockwise)
    ctx.stroke()
}

function drawStrokedPolygon(xarray, yarray, lineWidth, color) {
    let arrLength = xarray.length
    ctx.strokeStyle = color
    ctx.lineWidth = lineWidth
    ctx.beginPath()
    for (i = 0; i < arrLength; i++) {
        if (i == 0) {
            ctx.moveTo(xarray[i], yarray[i])
        } else {
            ctx.lineTo(xarray[i], yarray[i])
        }
    }
    ctx.closePath()
    ctx.stroke()
    if (xarray.length != yarray.length) {
        throw Error("Sorry! :( The array length of x and y should be the same")
    }
}

function drawLine(x1, y1, x2, y2, color, width = 1) {
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke()
}
//Math.cos(canvasTime*Math.PI/2)/4+0.75
function drawPainting() {
    for (i = 0; i < stars.length; i++) {
        stars[i].render()
        stars[i].remove()
    }
}

//(Math.cos((canvasTime+0)*Math.PI/2)/4+0.5)

function canvasDraw() {
    ctx.clearRect(0, 0, w, h)
    if (player.options.backgroundAnimation) {
        drawPainting()
    }
    
    ctx.stroke()
}

function canvasLoop() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    h = canvas.height
    w = canvas.width
    if (player.options.backgroundAnimation) {
        randomlyPushStars()
    }

    canvasDraw()
}

for (i = 0; i < 200; i++) {
    stars.push(new Star(Math.random(), Math.random(), undefined, undefined, undefined, 1))
    stars.push(new Star(Math.random(), Math.random(), undefined, undefined, undefined, 2))
}

function canvasTimeTick(diff) {
    canvasTime += diff
}

window.addEventListener("resize", resizeCanvas)