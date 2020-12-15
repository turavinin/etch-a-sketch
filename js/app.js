/* --------------- DOM VARIABLES -------------- */

const sketchContainer = document.querySelector('#sketch-container');
const sliderRange = document.querySelector('#slider-range');
const sliderTextOutput = document.querySelector('.size-value');
const cell = document.querySelectorAll('.cell');
const colorWell = document.querySelector('.color-input');
const clearBtn = document.querySelector('.btn-clear');

/* -------------- WINDOW ON LOAD -------------- */

// Default grid
window.onload = () => {
  sliderTextOutput.innerHTML = `${sliderRange.value} x ${sliderRange.value}`;
  createDivs(sliderRange.value);
  changeGridParamenter(sliderRange.value);

  // Create one cell (div)
  let oneDiv = document.createElement('div');
  oneDiv.classList.add('cell');
  sketchContainer.appendChild(oneDiv);
};

/* -------------- COLOR SELECTION ------------- */

// Default Color
let selectedColor = '#000000';

// Update pen color
const updateColor = (e) => {
  selectedColor = e.target.value;
};

// Update to the selected color
colorWell.addEventListener('input', updateColor);

/* ---------------- PAINT ON/OFF CELLS---------------- */

// Create a variable to toggle the action of painting
let togglePaint = true;

// Target the dynamic cells (divs)
document.addEventListener('click', (e) => {
  // Check the corresponding target and the state of the toggle
  if (e.target.classList == 'cell' && togglePaint == true) {
    // Paint clicked cell
    e.target.style.backgroundColor = `${selectedColor}`;
    // Paint cells on hover
    paintOnHover(true);
    // Change the state of the toggle
    togglePaint = false;
  } else if (togglePaint == false) {
    // Paint with the same color the cell when finish painting
    e.target.style.backgroundColor = `${selectedColor}`;
    // Remover the action of painting
    paintOnHover(false);
    // Change the state of the toggle
    togglePaint = true;
  }
});

// Stop painting when the mouse leaves the sketch
sketchContainer.addEventListener('mouseleave', () => {
  paintOnHover(false);
});

// Paint on hover
const paintOnHover = (trigger) => {
  if (trigger == true) {
    // Paint
    document.addEventListener('mouseover', paint);
  } else {
    // No paint
    document.removeEventListener('mouseover', paint);
  }
};

// Paint one cell
const paint = (e) => {
  if (e.target.classList == 'cell') {
    e.target.style.backgroundColor = `${selectedColor}`;
  }
};

/* ------------ CLEAR ALL THE CELLS ----------- */

const clearAllCells = () => {
  let cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.style.backgroundColor = '#e6e6e6';
  });
};

clearBtn.addEventListener('click', clearAllCells);

/* ------- SLIDER OUTPUT / DIV CREATION ------- */

// Output the selected slider range in span
sliderRange.oninput = function () {
  sliderTextOutput.innerHTML = `${this.value} x ${this.value}`;
};

// On mouse up create the correspondent divs and aplly grid parameters
sliderRange.onmouseup = function () {
  deleteAllDivs();
  createDivs(this.value);
  changeGridParamenter(this.value);
};

/* ----------- CREATE / DELETE DIVS ----------- */

// Create the wanted amount of divs
const createDivs = (oneSide) => {
  let amountOfDivs = oneSide * oneSide;
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

/* -------------- GRID PARAMETERS ON SLIDER OUTPUT ------------- */

const changeGridParamenter = (newParameter) => {
  sketchContainer.style.gridTemplateColumns = `repeat(${newParameter}, 1fr)`;
  sketchContainer.style.gridTemplateRows = `repeat(${newParameter}, 1fr)`;
};
