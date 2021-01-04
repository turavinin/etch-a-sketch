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
const shadingBtn = document.querySelector('.btn-shading');
const lightenBtn = document.querySelector('.btn-lighten');
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

/* ---------------- PAINT CELLS ---------------- */
let paintingStatus = false;

// Target the dynamic cells (divs)
document.addEventListener('mousedown', (e) => {
  if (
    paintingStatus === false &&
    e.target.id == 'div-cell' &&
    eraserStatus === false
  ) {
    paintingStatus = true;
    paintOnMove(paintingStatus);

    // Paint firs cell on click
    e.target.classList.add('painted');
    e.target.style.backgroundColor = `${selectedColor}`;
  }

  // EL PROBLEMA ES QUE EN EL DOM ESTABLECE EL COLOR EN RGB y no en HEX
});

document.addEventListener('mouseup', () => {
  if (paintingStatus === true) {
    paintingStatus = false;
  }
});

// Paint on move
const paintOnMove = (paintingStatus) => {
  if (paintingStatus === true) {
    document.addEventListener('mousemove', paint);
  }
};

// Paint one cell
const paint = (e) => {
  if (e.target.id == 'div-cell' && paintingStatus === true) {
    e.target.classList.add('painted');
    e.target.style.backgroundColor = `${selectedColor}`;
  }
};

/* ------------ LIGTHEN----------- */
let lightenStatus = false;

// Add class active and toggle lighten status
lightenBtn.addEventListener('click', () => {
  lightenBtn.classList.toggle('btn-active');
  lightenStatus === false ? (lightenStatus = true) : (lightenStatus = false);
});

// Method to light the given color
const lightenColor = (color, percent) => {
  let num = parseInt(color.replace('#', ''), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    B = ((num >> 8) & 0x00ff) + amt,
    G = (num >> 0x0000ff) + amt;

  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
      (G < 255 ? (G < 1 ? 0 : G) : 255)
    )
      .toString(16)
      .slice(1)
  );
};

/* ------------ ERASER ----------- */
let eraserStatus = false;

// Eraser & Button Status
eraserBtn.addEventListener('click', () => {
  eraserBtn.classList.toggle('btn-active');
  eraserStatus === false ? (eraserStatus = true) : (eraserStatus = false);
});

// Disable eraser when clicking outside the divs
document.addEventListener('click', (e) => {
  if (
    e.target.id != 'sketch-container' &&
    e.target.id != 'div-cell' &&
    e.target != eraserBtn &&
    eraserBtn.classList.contains('btn-active')
  ) {
    eraserBtn.classList.remove('btn-active');
    eraserStatus = false;
  }
});

// Erase on event
document.addEventListener('mousedown', (e) => {
  if (e.target.id == 'div-cell' && eraserStatus === true) {
    eraseOnMove();

    // Erase on first click
    e.target.classList.remove('painted');
    e.target.style.backgroundColor = `${defaultBg}`;
  }
});

// Disable erase on event
document.addEventListener('mouseup', () => {
  if (eraserBtn.classList.contains('btn-active')) {
    document.removeEventListener('mousemove', erase);
  }
});

// Erase on move
const eraseOnMove = () => {
  document.addEventListener('mousemove', erase);
};

// Erase logic
const erase = (e) => {
  if (e.target.id == 'div-cell' && e.target.classList.contains('painted')) {
    e.target.classList.remove('painted');
    e.target.style.backgroundColor = `${defaultBg}`;
  }
};

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
