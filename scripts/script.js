'use strict';

const squareBody = document.querySelector('.square-body');
const blocks = squareBody.querySelectorAll('.block');
const blocksArray = [...blocks];
const resetButton = document.querySelector('.btn-reset');

const swapBlocks = (block, direction) => {
  const blockNumber = block.querySelector('.block-number');
  const currentIndex = blocksArray.indexOf(block);
  let newIndex;

  switch (direction) {
    case 'left':
      newIndex = currentIndex - 1;
      break;
    case 'right':
      newIndex = currentIndex + 1;
      break;
    case 'top':
      newIndex = currentIndex - 5;
      break;
    case 'bottom':
      newIndex = currentIndex + 5;
      break;
  }

  if (newIndex >= 0 && newIndex <= 24) {
    const newBlock = blocks[newIndex];
    const newBlockNumber = newBlock.querySelector('.block-number');
    const temp = blockNumber.textContent;
    blockNumber.textContent = newBlockNumber.textContent;
    newBlockNumber.textContent = temp;
  }
}

squareBody.addEventListener('click', (e) => {
  if (e.target.closest('.left')) {
    const block = e.target.closest('.block');
   swapBlocks(block, 'left')
  } else if (e.target.closest('.right')) {
    const block = e.target.closest('.block');
    swapBlocks(block, 'right')
  } else if (e.target.closest('.top')) {
    const block = e.target.closest('.block');
    swapBlocks(block, 'top')
  } else if (e.target.closest('.bottom')) {
    const block = e.target.closest('.block');
    swapBlocks(block, 'bottom')
  }
});

resetButton.addEventListener('click', () => {
  blocks.forEach((block, index) => {
    block.querySelector('.block-number').textContent = index + 1;
  });
});
