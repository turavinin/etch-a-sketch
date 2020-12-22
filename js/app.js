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

/* ---------------- MANAGING CELLS ---------------- */
let paintingStatus = true;

// Target the dynamic cells (divs)
document.addEventListener('click', (e) => {
  if (
    e.target.id == 'div-cell' &&
    paintingStatus == true &&
    !sketchContainer.classList.contains('eraserMode')
  ) {
    e.target.style.backgroundColor = `${selectedColor}`;
    e.target.classList.add('painted');
    paintOnHover(true);
    paintingStatus = false;
  } else if (
    e.target.id == 'div-cell' &&
    paintingStatus == false &&
    !sketchContainer.classList.contains('eraserMode')
  ) {
    e.target.style.backgroundColor = `${selectedColor}`;
    e.target.classList.add('painted');
    paintOnHover(false);
    paintingStatus = true;
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
// CAMBIAR A BORRAR MANTENIENDO CLICK, BUSCAR MOUSDOWN EN GOOGLE

document.addEventListener('click', (e) => {
  if (
    e.target.id == 'div-cell' &&
    sketchContainer.classList.contains('eraserMode')
  ) {
    console.log('eraser Mod');
    paintingStatus = false;
    e.target.style.backgroundColor = `${defaultBg}`;
    e.target.classList.remove('painted');
    eraseOnDown(e);
  }
});

eraserBtn.addEventListener('click', () => {
  if (sketchContainer.classList.contains('eraserMode')) {
    sketchContainer.classList.remove('eraserMode');
    eraserBtn.style.backgroundColor = '#1c40424d';
  } else {
    sketchContainer.classList.add('eraserMode');
    eraserBtn.style.backgroundColor = '#59b69f';
  }
});

const erase = (e) => {
  if (e.target.id == 'div-cell') {
    e.target.classList.remove('painted');
    e.target.style.backgroundColor = `${defaultBg}`;
  }
};

const eraseOnDown = (trigger) => {
  if (trigger == true) {
    // Paint
    document.addEventListener('mousedown', erase);
  } else {
    // No paint
    document.removeEventListener('mousedown', erase);
  }
};

// Stop painting when the mouse leaves the sketch
sketchContainer.addEventListener('mouseleave', () => {
  eraseOnDown(false);
});

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
