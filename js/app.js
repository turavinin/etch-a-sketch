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

// CHANGE THE PARAMETERS OF THE GRID CONTAINER

// OUTPUT THE SLIDER RANGE IN THE SPANC
// Initial output text
sliderTextOutput.innerHTML = `${sliderRange.value} x ${sliderRange.value}`;
let sliderValue;
// Output on slider selection
sliderRange.oninput = function () {
  sliderTextOutput.innerHTML = `${this.value} x ${this.value}`;

  // Create the divs whit the slider value
  createDivs(this.value);
};

console.log(sliderRange.oninput(this.value));
