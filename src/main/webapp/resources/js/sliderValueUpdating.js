"use strict";

ySlider.onSlide = function () {
    if (yOut.value === undefined) yOut.value = 0;
    ySelected.value = this.getValue() / 10; // Значение Y для обработки бином
    yOut.value = this.getValue();
    yOut.innerText = (this.getValue() / 10).toFixed(1).toString();
};