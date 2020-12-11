// DOM VARIABLES
const sketchContainer = document.querySelector('#sketch-container');
const sliderRange = document.querySelector('#slider-range');
const sliderTextOutput = document.querySelector('.size-value');

// CREATE DIVS IN SKETCH CONTAINER
const createDivs = (size) => {
  // Create a variable to store the total number of divs
  let amountOfDivs = size * size;
  // Loop as many times as required divs
  for (let i = 0; i < amountOfDivs; i++) {
    sketchContainer.innerHTML += `<div class="cell"></div>`;
  }
};

// OUTPUT THE SLIDER RANGE IN THE SPANC
// Initial output text
sliderTextOutput.innerHTML = `${sliderRange.value} x ${sliderRange.value}`;
// Output on slider selection
sliderRange.oninput = function () {
  sliderTextOutput.innerHTML = `${this.value} x ${this.value}`;
};

createDivs(20);
