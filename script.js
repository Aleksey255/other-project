'use strict';

const btn = document.getElementById('btn');
const inputText = document.getElementById('text');
const inputRange = document.getElementById('range');
const square = document.getElementById('square');
const circle = document.getElementById('circle');
const circleBtn = document.getElementById('e_btn');

circleBtn.style.display = 'none';

const bgColor = function () {
  square.style.backgroundColor = inputText.value;
};

const changeCircleSize = function (event) {
  circle.style.width = event.target.value + '%';
  circle.style.height = event.target.value + '%';
};

btn.addEventListener('click', bgColor);
inputRange.addEventListener('input', changeCircleSize);
