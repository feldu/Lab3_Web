"use strict";

let canvas = document.getElementById("areas");
let ctx = canvas.getContext("2d");
let canvasXField = document.getElementById("canvasFrm:c_inputX");
let canvasYField = document.getElementById("canvasFrm:c_inputY");
let canvasRField = document.getElementById("canvasFrm:c_inputR");

const AXES_PADDING = 10;
const MAX_AXE_LENGTH = 12;
const MAX_MARK_COORDINATE = canvas.width - (AXES_PADDING + canvas.width / MAX_AXE_LENGTH),
    MIN_MARK_COORDINATE = (AXES_PADDING + canvas.width / MAX_AXE_LENGTH);

const AREAS_COLOR = "rgba(255, 146, 0, 0.85)",
    AXES_COLOR = "white";

function repaint() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAreas();
    drawAxes();
    drawPoints();
}


canvas.addEventListener("click", function (e) {
    let canvasX = (e.pageX - this.offsetLeft) - canvas.width / 2,
        canvasY = canvas.height / 2 - (e.pageY - this.offsetTop);
    sendData(canvasX, canvasY);
});

function sendData(canvasX, canvasY) {
    canvasRField.value = rSelector.value;
    canvasXField.value = (canvasX / (MAX_MARK_COORDINATE - canvas.width / 2) * rSelector.value).toFixed(3);
    canvasYField.value = (canvasY / (canvas.height / 2 - MIN_MARK_COORDINATE) * rSelector.value).toFixed(3);
    window["canvasSend"]();
}

function drawPoints() {
    for (let point of points) {
        ctx.beginPath();
        let x = point.x * (MAX_MARK_COORDINATE - canvas.width / 2) / rSelector.value + canvas.width / 2,
            y = canvas.height / 2 - point.y * (canvas.height / 2 - MIN_MARK_COORDINATE) / rSelector.value;
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        point.result === "Попала" ? ctx.fillStyle = "#67E300" : ctx.fillStyle = "#E40045";
        ctx.fill();
        ctx.closePath();
    }
}

function drawAxes() {
    ctx.strokeStyle = AXES_COLOR;
    ctx.fillStyle = AXES_COLOR;
    ctx.beginPath();
    //arrow X
    ctx.moveTo(AXES_PADDING, canvas.height / 2);
    ctx.lineTo(canvas.width - AXES_PADDING, canvas.height / 2);
    ctx.lineTo(canvas.width - AXES_PADDING - 10, canvas.height / 2 + 5);
    ctx.moveTo(canvas.width - AXES_PADDING, canvas.height / 2);
    ctx.lineTo(canvas.width - AXES_PADDING - 10, canvas.height / 2 - 5);
    //arrow Y
    ctx.moveTo(canvas.width / 2, canvas.height - AXES_PADDING);
    ctx.lineTo(canvas.width / 2, AXES_PADDING);
    ctx.lineTo(canvas.width / 2 + 5, AXES_PADDING + 10);
    ctx.moveTo(canvas.width / 2, AXES_PADDING);
    ctx.lineTo(canvas.width / 2 - 5, AXES_PADDING + 10);
    let xMarkCoordinate,
        yMarkCoordinate;
    ctx.fillText("0", canvas.width / 2 - 10, canvas.height / 2 + 15);
    for (let i = 1; i <= rSelector.value; i++) {
        xMarkCoordinate = canvas.width / 2 + i * (MAX_MARK_COORDINATE - canvas.width / 2) / rSelector.value;
        //positive x axe marks
        ctx.moveTo(xMarkCoordinate, canvas.height / 2 + 3);
        ctx.lineTo(xMarkCoordinate, canvas.height / 2 - 3);
        ctx.fillText(i.toString(), xMarkCoordinate - 3, canvas.height / 2 + 15);
        //negative x axe marks
        xMarkCoordinate = canvas.width / 2 - i * (canvas.width / 2 - MIN_MARK_COORDINATE) / rSelector.value;
        ctx.moveTo(xMarkCoordinate, canvas.height / 2 + 3);
        ctx.lineTo(xMarkCoordinate, canvas.height / 2 - 3);
        ctx.fillText((-i).toString(), xMarkCoordinate - 5, canvas.height / 2 + 15);
        //negative y axe marks
        yMarkCoordinate = canvas.height / 2 + i * (MAX_MARK_COORDINATE - canvas.height / 2) / rSelector.value;
        ctx.moveTo(canvas.width / 2 - 3, yMarkCoordinate);
        ctx.lineTo(canvas.width / 2 + 3, yMarkCoordinate);
        ctx.fillText((-i).toString(), canvas.width / 2 + 5, yMarkCoordinate + 3);
        //positive y axe marks
        yMarkCoordinate = canvas.height / 2 - i * (canvas.height / 2 - MIN_MARK_COORDINATE) / rSelector.value;
        ctx.moveTo(canvas.width / 2 - 3, yMarkCoordinate);
        ctx.lineTo(canvas.width / 2 + 3, yMarkCoordinate);
        ctx.fillText(i.toString(), canvas.width / 2 + 5, yMarkCoordinate + 3);
    }
    ctx.stroke();
    ctx.closePath();
}

function drawAreas() {
    ctx.fillStyle = AREAS_COLOR;
    ctx.beginPath();
    //rectangle
    ctx.fillRect(MIN_MARK_COORDINATE, canvas.height / 2, canvas.width / 2 - MIN_MARK_COORDINATE, (MIN_MARK_COORDINATE - canvas.height / 2) / 2);
    //triangle
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(canvas.width / 2, canvas.height / 2 - (MAX_MARK_COORDINATE - canvas.height / 2) / 2);
    ctx.lineTo(MAX_MARK_COORDINATE, canvas.height / 2);
    //circle
    ctx.arc(canvas.width / 2, canvas.height / 2, (MAX_MARK_COORDINATE - canvas.width / 2) / 2, 0, Math.PI / 2);
    ctx.fill();
    ctx.closePath();
}