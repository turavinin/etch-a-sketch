/* --------------- DOM VARIABLES -------------- */

const sketchContainer = document.querySelector('#sketch-container');
const sliderRange = document.querySelector('#slider-range');
const sliderTextOutput = document.querySelector('.size-value');
const cell = document.querySelectorAll('.cell');
const colorWell = document.querySelector('.color-input');
const bgColorWell = document.querySelector('.bg-color-input');
const clearBtn = document.querySelector('.btn-clear');
const eraserBtn = document.querySelector('.btn-eraser');

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
  oneDiv.classList.add('cell');
  sketchContainer.appendChild(oneDiv);
};

/* -------------- COLOR SELECTION ------------- */
// Update pen color
const updateColor = (e) => {
  selectedColor = e.target.value;
};

// Update to the selected color
colorWell.addEventListener('input', updateColor);

/* ------------ BG SELECTION ----------- */
const changeBg = (e) => {
  let cells = document.querySelectorAll('.cell');
  let newBg = e.target.value;

  cells.forEach((cell) => {
    if (!cell.classList.contains('painted'))
      cell.style.backgroundColor = `${newBg}`;
  });
};

bgColorWell.addEventListener('input', (e) => {
  defaultBg = e.target.value;
  changeBg(e);
  eraserColor(e);
});

/* ---------------- PAINT ON/OFF CELLS---------------- */

// Create a variable to toggle the action of painting
let togglePaint = true;

// Target the dynamic cells (divs)
document.addEventListener('click', (e) => {
  // Check the corresponding target and the state of the toggle
  if (e.target.classList == 'cell' && togglePaint == true) {
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
  if (e.target.classList == 'cell') {
    e.target.classList.add('painted');
    e.target.style.backgroundColor = `${selectedColor}`;
  }
};

// Stop painting when the mouse leaves the sketch
sketchContainer.addEventListener('mouseleave', () => {
  paintOnHover(false);
});

/* ------------ CLEAR ALL THE CELLS ----------- */
/* const newClearColor = (e) => {
  console.log(e.target.value);
  return e.target.value;
}; */

const clearAllCells = () => {
  let cells = document.querySelectorAll('.cell');
  cells.forEach((e) => {
    if (e.classList.contains('painted')) {
      e.classList.remove('painted');
      e.style.backgroundColor = `${defaultBg}`;
    }
  });
};

clearBtn.addEventListener('click', clearAllCells);

/* ------------ ERASER ----------- */
// FALTA HACER ERASER TODO, FIJARSE QUE ESTA ASOCIADO CON ELECCION DE BG
const eraserColor = (e) => {
  return e.target.value;
};

const erase = () => {
  selectedColor = '#e6e6e6';
  /*   cell.forEach((e) => {
    e.addEventListener('mouseover', paint(true));
  }); */
};

eraserBtn.addEventListener('click', erase);

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
