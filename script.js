'use strict';

const DomElement = function (
  selector,
  height,
  width,
  bg,
  fontSize,
  position,
  top,
  left,
  text
) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
  this.position = position;
  this.top = top;
  this.left = left;
  this.text = text;
};

DomElement.prototype.createElement = function () {
  let elem;
  if (this.selector.startsWith('.')) {
    elem = document.createElement('div');
    elem.className = this.selector.slice(1);
    elem.textContent = this.text;
    document.body.append(elem);
  } else if (this.selector.startsWith('#')) {
    elem = document.createElement('div');
    elem.id = this.selector.slice(1);
    elem.textContent = this.text;
    document.body.append(elem);
  }
  if (elem) {
    elem.style.cssText += `
      height: ${this.height};
      width: ${this.width};
      background: ${this.bg};
      font-size: ${this.fontSize};
      position: ${this.position};
      top: ${+this.top};
      left: ${+this.left};
    `;
  }
  return elem;
};

document.addEventListener('DOMContentLoaded', function () {
  const element = new DomElement(
    '.block',
    '100px',
    '100px',
    'green',
    '',
    'absolute',
    '0',
    '0',
    ''
  );
  const elem = element.createElement();

  document.addEventListener('keydown', (event) => {
    console.log(event);

    if (event.code === 'ArrowRight') {
      elem.style.left = `${parseInt(elem.style.left, 10) + 10}px`;; 
    } else if (event.code === 'ArrowLeft') {
      elem.style.left = `${parseInt(elem.style.left, 10) - 10}px`;
    } else if (event.code === 'ArrowUp') {
      elem.style.top = `${parseInt(elem.style.top, 10) - 10}px`;
    } else if (event.code === 'ArrowDown') {
      elem.style.top = `${parseInt(elem.style.top, 10) + 10}px`;
    }
  });
});
