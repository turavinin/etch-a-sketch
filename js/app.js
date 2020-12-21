/* --------------- DOM VARIABLES -------------- */

const sketchContainer = document.querySelector('#sketch-container');
const sketchBorder = document.querySelector('.sketch-border');
const sliderRange = document.querySelector('#slider-range');
const sliderTextOutput = document.querySelector('.size-value');
const cell = document.querySelectorAll('#div-cell');
const colorWell = document.querySelector('.color-input');
const bgColorWell = document.querySelector('.bg-color-input');

/* ------------------ BUTTONS ----------------- */
const allBtn = document.querySelectorAll('.btn');
const clearBtn = document.querySelector('.btn-clear');
const eraserBtn = document.querySelector('.btn-eraser');
const gridBtn = document.querySelector('.btn-grid');
/* ----------------- DEFAULTS ----------------- */

let selectedColor = '#000000';
let defaultBg = bgColorWell.value;

/* -------------- WINDOW ON LOAD -------------- */

// Default grid
window.onload = () => {
  sliderTextOutput.innerHTML = `${sliderRange.value} x ${sliderRange.value}`;
  createDivs(sliderRange.value);
  changeGridParamenter(sliderRange.value);

  // Create one cell (div)
  let oneDiv = document.createElement('div');
  oneDiv.id = 'div-cell';
  sketchContainer.appendChild(oneDiv);
};

/* -------------- BUTTONS EFFECTS ------------- */
allBtn.forEach((e) => {
  e.addEventListener('click', () => {
    e.classList.add('clicked');
    setTimeout(() => {
      e.classList.remove('clicked');
    }, 200);
  });
});

/* -------------- COLOR SELECTION ------------- */
// Update pen color
const updateColor = (e) => {
  selectedColor = e.target.value;
};

// Update to the selected color
colorWell.addEventListener('input', updateColor);

/* ------------ BG SELECTION ----------- */
const changeBg = (e) => {
  let cells = document.querySelectorAll('#div-cell');
  let newBg = e.target.value;

  cells.forEach((cell) => {
    if (!cell.classList.contains('painted'))
      cell.style.backgroundColor = `${newBg}`;
  });
};

bgColorWell.addEventListener('input', (e) => {
  defaultBg = e.target.value;
  changeBg(e);
});

/* ---------------- PAINT ON/OFF CELLS---------------- */

// Create a variable to toggle the action of painting
let togglePaint = true;

// Target the dynamic cells (divs)
document.addEventListener('click', (e) => {
  // Check the corresponding target and the state of the toggle
  if (e.target.id == 'div-cell' && togglePaint == true) {
    // Paint clicked cell
    e.target.style.backgroundColor = `${selectedColor}`;
    e.target.classList.add('painted');
    // Paint cells on hover
    paintOnHover(true);
    // Change the state of the toggle
    togglePaint = false;
  } else if (togglePaint == false) {
    // Paint with the same color the cell when finish painting
    e.target.style.backgroundColor = `${selectedColor}`;
    e.target.classList.add('painted');
    // Remover the action of painting
    paintOnHover(false);
    // Change the state of the toggle
    togglePaint = true;
  } else {
    console.log('no pinta');
  }
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
  if (e.target.id == 'div-cell') {
    e.target.classList.add('painted');
    e.target.style.backgroundColor = `${selectedColor}`;
  } else {
    console.log('no pinta');
  }
};

// Stop painting when the mouse leaves the sketch
sketchContainer.addEventListener('mouseleave', () => {
  paintOnHover(false);
});

/* ------------ CLEAR ALL THE CELLS ----------- */

const clearAllCells = () => {
  let cells = document.querySelectorAll('#div-cell');
  cells.forEach((e) => {
    if (e.classList.contains('painted')) {
      e.classList.remove('painted');
      e.style.backgroundColor = `${defaultBg}`;
    }
  });
};

clearBtn.addEventListener('click', clearAllCells);

/* ------------ ERASER ----------- */

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
  oneDiv.id = 'div-cell';
  oneDiv.classList.add('cell');
  sketchContainer.appendChild(oneDiv);
};

// Delete all the divs
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

/* ------------ GRID TOGGLE ----------- */
gridBtn.addEventListener('click', () => {
  let cells = document.querySelectorAll('#div-cell');
  cells.forEach((cell) => {
    cell.classList.toggle('no-grid');
  });
});
