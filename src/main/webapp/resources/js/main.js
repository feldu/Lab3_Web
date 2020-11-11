"use strict";

let xSelected = document.getElementById('frm:x_selected'),
    ySlider = ice.ace.instance('frm:y_slider'),
    yOut = document.getElementById('frm:y_outText'),
    ySelected = document.getElementById("frm:y_selected"),
    rSelector = document.getElementById("frm:r_select");


let points = [];

class Point {
    constructor(x, y, r, result) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = result;
    }
}

window.onload = function () {
    xSelected.value = "";
    ySelected.value = 0;
    rSelector.value = 1;
    window['getPointsForCanvas']();
};

xSelected.onfocus = function () {
    if (xSelected.classList.contains("input_err"))
        xSelected.classList.remove("input_err");
};

rSelector.onchange = function () {
    window['getPointsForCanvas']();
};

function addPointCallback(xhr, status, args) {
    if (args.points) {
        if (xSelected.classList.contains("input_err"))
            xSelected.classList.remove('input_err');
        points = args.points.points.map(point => new Point(point.x, point.y, point.r, point.result));
        repaint();

    } else if (args.validationFailed) {
        xSelected.classList.add('input_err');
    }
}