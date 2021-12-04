var canvas = document.getElementById("paintingCanvas");
var ctx = canvas.getContext("2d")
var h = canvas.height
var w = canvas.width

function resizeCanvas() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}

function drawCircle(x, y, r, sAngle, eAngle, color, width = 1, counterclockwise = false) {
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = width
    ctx.arc(x, y, r, sAngle, eAngle, counterclockwise)
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

function drawPainting() {
    drawLine(w * 0.5, h * 0.5, w * 0.25, h * 0.3, "#00ff00", 12)
    drawCircle(400, 75, 50, 0*Math.PI, 1.5*Math.PI, "#ff0000", 12)
    drawStrokedPolygon(
        [w * 0.5, w * 0.25, w * 0.25, w * 0.5],
        [h * 0.25, h * 0.5, h * 0.75, h * 0.25],
    2, "#00ff00")
}

function canvasDraw() {
    ctx.clearRect(0, 0, w, h)
    drawPainting()
    ctx.stroke()
}

function canvasLoop() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    h = canvas.height
    w = canvas.width
    

    canvasDraw()
}

window.addEventListener("resize", resizeCanvas)
