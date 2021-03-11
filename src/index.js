const elTextGrid = document.querySelector(".text-grid");

function splittingLite(el) {
  let characters = el.innerText
    .split("")
    .filter((char) => char !== " ")
    .map(
      (char, i) =>
        `<span class="char" data-char="${char}" style="--i: ${i}">${char}</span>`
    );
  el.innerHTML = characters.join("");
  el.style.setProperty('--char-total', characters.length);
  return el.querySelectorAll(".char");  
}

splittingLite(elTextGrid); 
console.log('here', 4 + 4);


let elCharacters = elTextGrid.querySelectorAll('*');
console.log(elCharacters);

function getCharMeasurements() {
  return Array.from(elCharacters, elChar => {
    return {
      element: elChar,
      rect: elChar.getBoundingClientRect(),
      distance: 1,
    }
  });  
}

function recalculateDistances(mouseCoords) {
  let containerRect = elTextGrid.getBoundingClientRect();
  let diagonal = Math.hypot(containerRect.width, containerRect.height); // / 2;
  charMeasurements.forEach(m => {
    const distance = Math.hypot(m.rect.left - mouseCoords.x, m.rect.top - mouseCoords.y);
    const normalizedDistance = 1 - distance / diagonal;

    console.log(normalizedDistance);

    m.element.style.setProperty('--distance', Math.max(Math.pow(normalizedDistance, 3), 0));
  });
}  

let charMeasurements = getCharMeasurements();


/* const charMap = new Map(); //Map<Element, {rect: ClientRect, distance: number}>

elCharacters.forEach(elChar => {
  charMap.set(elChar, elChar.getBoundingClientRect())
}); */

document.addEventListener('mousemove', event => {
  const {clientX, clientY} = event.touches ?
    event.touches[0] : event;
  //mouseCoords = {x: clientX, y: clientY};  

  console.log({clientX, clientY});

  recalculateDistances({ x: clientX, y: clientY });
 
});

window.addEventListener("resize", () => {
  charMeasurements = getCharMeasurements();
});