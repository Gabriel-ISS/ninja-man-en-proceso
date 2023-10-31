const $ = id => document.getElementById(id)

const $ninja = $('ninja-man')
const $world = $('world')
const $counter = $('counter')

const keyCodes = {
  left: 'ArrowLeft',
  up: 'ArrowUp',
  right: 'ArrowRight',
  down: 'ArrowDown'
}

const ninja = {
  x: 1,
  y: 1
}

const worldCodes = {
  0: 'blank',
  1: 'wall',
  3: 'sushi'
}

const world = [
  [1, 1, 1, 1, 1],
  [1, 0, 0, 3, 1],
  [1, 3, 1, 0, 1],
  [1, 0, 3, 0, 1],
  [1, 1, 1, 1, 1],
]

let counter = 0

updateWorld()
document.onkeydown = e => {
  if (e.key == keyCodes.left) {
    moveNinja({x: -1, y: 0})
  }
  else if (e.key == keyCodes.up) {
    moveNinja({x: 0, y: -1})
  }
  else if (e.key == keyCodes.right) {
    moveNinja({x: 1, y: 0})
  }
  else if (e.key == keyCodes.down) {
    moveNinja({x: 0, y: 1})
  }

  updateNinja()
  updateWorld()
  updateCounter()
}

function moveNinja({ x, y }) {
  const newY = ninja.y + y
  const newX =  ninja.x + x
  const newBlock = world[newY][newX]
  if (newBlock != 1) {
    ninja.y += y
    ninja.x += x

    if (newBlock == 3) {
      counter += 10
      world[newY][newX] = 0
    }
  }
}

function updateWorld() {
  content = ''
  for (const row of world) {
    rowContent = ''
    for (const block of row) {
      rowContent += `<span class="${worldCodes[block]}"></span>`
    }
    content += `<div class="row">${rowContent}</div>`
  }
  $world.innerHTML = content
}

function updateNinja() {
  $ninja.style.top = ninja.y * 50 + 'px'
  $ninja.style.left = ninja.x * 50 + 'px'
}

function updateCounter() {
  $counter.innerHTML = counter + 'pts'
}