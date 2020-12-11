// DOM VARIABLES
const sketchContainer = document.querySelector('#sketch-container');

// Create divs in sketch container
const createDivs = (size) => {
  // Loop as many times as required divs
  for (let i = 0; i < size; i++) {
    sketchContainer.innerHTML += `<div class="cell"></div>`;
  }
};

createDivs(20);
