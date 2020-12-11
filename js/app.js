// DOM VARIABLES
const sketchContainer = document.querySelector('#sketch-container');

// Create divs in sketch container
const createDivs = (size) => {
  // Create a variable to store the total number of divs
  let amountOfDivs = size * size;
  // Loop as many times as required divs
  for (let i = 0; i < amountOfDivs; i++) {
    sketchContainer.innerHTML += `<div class="cell"></div>`;
  }
};

createDivs(20);
