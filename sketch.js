let allUniqueHabitats = new Set();
let allUniqueColors = new Set();
let allUniqueLegs = new Set();

let selectedHabitats = [];
let selectedColors = [];
let selectedLegs = [];
let mybutton;
function setup() {
  noCanvas();

  // Populate unique sets (allUniqueHabitats, allUniqueColors, allUniqueLegs)
  for (const animal of animals) {
    if (animal.habitat) {
      allUniqueHabitats.add(animal.habitat);
    }
    if (animal.appearance && animal.appearance.color) {
      allUniqueColors.add(animal.appearance.color);
    }
    if (animal.appearance && animal.appearance.legs) {
      allUniqueLegs.add(animal.appearance.legs);
    }
  }

  // Create checkboxes for unique habitats
  createCheckboxOptions(allUniqueHabitats, selectedHabitats, "Habitats");

  // Create checkboxes for unique colors
  createCheckboxOptions(allUniqueColors, selectedColors, "Colors");

  // Create checkboxes for unique legs
  createCheckboxOptions(allUniqueLegs, selectedLegs, "Legs");
  mybutton = createButton("click for all matches")
  mybutton.mouseClicked(createList)
  
}

function createCheckboxOptions(options, selected, label) {
  let checkboxDiv = createDiv();
  let heading = createElement('h4', label);
  heading.parent(checkboxDiv);

  for (let option of options) {
    let checkbox = createCheckbox(option);
    checkbox.parent(checkboxDiv);
    checkbox.changed(() => {
      if (checkbox.checked()) {
        selected.push(option);
        console.log(selectedHabitats,selectedLegs,selectedColors)
      } else {
        selected = selected.filter(item => item !== option);
      }
    });
  }

  // Add the checkboxDiv to the HTML body
  checkboxDiv.parent(document.body);
}

function createList() {
  // Create an array to store animals that match the selected criteria
  let matchingAnimals = [];

  // Filter the animals based on selected habitats, colors, and legs
  for (const animal of animals) {
    if (
      (selectedHabitats.length === 0 || selectedHabitats.includes(animal.habitat)) && // chage to and for exclusive
      (selectedColors.length === 0 || selectedColors.includes(animal.appearance.color)) && //change to and for exclusive
      (selectedLegs.length === 0 || selectedLegs.includes(animal.appearance.legs))
    ) {
      matchingAnimals.push(animal);
    }
  }

  // Display the list of matching animals
  if (matchingAnimals.length > 0) {
    let animalList = createElement('ul');
    for (const animal of matchingAnimals) {
      let listItem = createElement('li', animal.personalInformation.name);
      listItem.parent(animalList);
    }
  } else {
    // If no animals match the selected criteria
    let noMatchMessage = createElement('p', 'No animals match the selected criteria.');
    noMatchMessage.parent(document.body);
  }
  console.log(matchingAnimals)
}

