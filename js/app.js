/* ------------------------------ DOM VARIABLES ----------------------------- */

const sketchContainer = document.querySelector('#sketch-container');
const sliderRange = document.querySelector('#slider-range');
const sliderTextOutput = document.querySelector('.size-value');

/* ----------------------------- WINDOW ON LOAD ----------------------------- */

window.onload = () => {
  sliderTextOutput.innerHTML = `${sliderRange.value} x ${sliderRange.value}`;
  createDivs(sliderRange.value);
};

/* ------------------------------ SLIDER OUTPUT / DIV CREATION ----------------------------- */

// Output the selected slider range in span
sliderRange.oninput = function () {
  sliderTextOutput.innerHTML = `${this.value} x ${this.value}`;
};

// On mouse up create the coresponding divs and aplly grid parameters
sliderRange.onmouseup = function () {
  deleteAllDivs();
  createDivs(this.value);
  changeGridParamenter(this.value);
};

/* ------------------------------- CREATE / DELETE DIVS ------------------------------ */

// Create the wanted amount of divs
const createDivs = (sizeOfGrid) => {
  let amountOfDivs = sizeOfGrid * sizeOfGrid;
  for (let i = 0; i < amountOfDivs; i++) {
    createOneDiv();
  }
};

// Create One Div
const createOneDiv = () => {
  let oneDiv = document.createElement('div');
  oneDiv.classList.add('cell');
  sketchContainer.appendChild(oneDiv);
};

const deleteAllDivs = () => {
  while (sketchContainer.firstChild) {
    sketchContainer.removeChild(sketchContainer.firstChild);
  }
};

/* ----------------- CHANGE THE GRID PARAMETERS ON SLIDER OUTPUT ---------------- */

const changeGridParamenter = (newParameter) => {
  sketchContainer.style.gridTemplateColumns = `repeat(${newParameter}, 1fr)`;
  sketchContainer.style.gridTemplateRows = `repeat(${newParameter}, 1fr)`;
};
