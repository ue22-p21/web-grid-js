document.addEventListener("DOMContentLoaded", () => {
  // Initial clean up. DO NOT REMOVE.
  initialCleanup();

  // Hey! Pssst! In here ...
  new App('#grid', '#buttons', '#totals').run()
});

/**
 * Cleans up the document so that the exercise is easier.
 *
 * There are some text and comment nodes that are in the initial DOM, it's nice
 * to clean them up beforehand.
 */
function initialCleanup() {
  const nodesToRemove = [];
  document.getElementById("grid").childNodes.forEach((node, key) => {
    if (node.nodeType !== Node.ELEMENT_NODE) {
      nodesToRemove.push(node);
    }
  });
  for (const node of nodesToRemove) {
    node.remove();
  }
}

const ADD = '#btn-add-line'
const DEL = '#btn-del-line'
const ORIGINAL = '#original'
const CLICKED = '#clicked'
const BLUE = '#blue'
const TOTAL = '#total'


class App {
  constructor(s_grid, s_buttons, s_totals) {
    this.grid = document.querySelector(s_grid)
    this.buttons = document.querySelector(s_buttons)
    this.totals = document.querySelector(s_totals)
    console.log('grid', this.grid)
    console.log('buttons', this.buttons)
    console.log('totals', this.totals)
  }

  run() {
    this.buttons.querySelector(ADD).addEventListener('click', () => this.addLine())
    this.buttons.querySelector(DEL).addEventListener('click', () => this.delLine())
    for (const div of this.grid.querySelectorAll('div')) {
      this.initDiv(div)
    }
    this.updateTotals()
  }

  initDiv(div) {
    div.addEventListener('click',
      () => {this.setRandomColor(div); this.updateTotals(); })
    div.addEventListener('mouseover',
      () => {this.setHoverColor(div); this.updateTotals(); })
  }

  addLine() {
    for (let i = 0; i < 10; i++) {
      let div = document.createElement('div')
      this.grid.append(div)
      this.initDiv(div)
    }
    this.updateTotals()
  }

  delLine() {
    for (let i = 0; i < 10; i++)
      this.grid.childNodes[0].remove()
    this.updateTotals()
  }

  setRandomColor(element) {
    element.style.backgroundColor = this.randomColor()
    element.classList.remove('hovered')
  }

  setHoverColor(element) {
    // clear any local color, so we resort to the hovered class
    element.style.backgroundColor = ''
    element.classList.add('hovered')
  }

  randomColor() {
    // a random (float) number between 0 and 2**24-1
    const F = (1 << 24 - 1) * Math.random()
    // floor it to an int
    const N = Math.floor(F)
    // convert to hexa and build a color
    return `#${N.toString(16)}`
  }

  updateTotals() {
    //  console.log('totals')
    const total = this.grid.querySelectorAll("div").length
    const clicked = this.grid.querySelectorAll('div[style*="background-color"]').length
    const blue = this.grid.querySelectorAll('div.hovered').length
    const original = total - clicked - blue
    this.totals.querySelector(ORIGINAL).innerHTML = original.toString()
    this.totals.querySelector(CLICKED).innerHTML = clicked.toString()
    this.totals.querySelector(BLUE).innerHTML = blue.toString()
    this.totals.querySelector(TOTAL).innerHTML = total.toString()
  }

}
