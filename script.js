import { updateBird, updateBirdd, setupBird, getBirdRect } from "./bird.js"
import {
  updatePipes,
  setupPipes,
  getPassedPipesCount,
  getPipeRects,
} from "./pipes.js"

document.addEventListener("keydown", function(event) {
    if (!event.repeat) {
        if (event.key == "e" || event.key == "E") {
            handleStart("Easy");
        }
        else if (event.key == "m" || event.key == "M") {
            handleStart("Medium");
        }
        else if (event.key == "h" || event.key == "H") {
            handleStart("Hard");
        }
        else {
            handleStart("Easy");
        }
    }
}, { once: true })
const title = document.querySelector("[data-title]")
const subtitle = document.querySelector("[data-subtitle]")

let lastTime
function updateLoop(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(updateLoop)
    return
  }
  const delta = time - lastTime
  updateBird(delta)
  updatePipes(delta)
  if (checkLose()) return handleLose()
  lastTime = time
  window.requestAnimationFrame(updateLoop)
}

function updateLoopp(time) {
    if (lastTime == null) {
      lastTime = time
      window.requestAnimationFrame(updateLoopp)
      return
    }
    const delta = time - lastTime
    updateBirdd(delta)
    updatePipes(delta)
    if (checkLose()) return handleLose()
    lastTime = time
    window.requestAnimationFrame(updateLoopp)
}

function checkLose() {
  const birdRect = getBirdRect()
  const insidePipe = getPipeRects().some(rect => isCollision(birdRect, rect))
  const outsideWorld = birdRect.top < 0 || birdRect.bottom > window.innerHeight
  return outsideWorld || insidePipe
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  )
}

function handleStart(diffLevel) {
  title.classList.add("hide")
  if (diffLevel === "Easy") {
    setupPipes("Easy")
  }
  else if (diffLevel === "Medium") {
    setupPipes("Medium")
  }
  else {
    setupPipes("Hard")
  }
  setupBird(diffLevel)
  lastTime = null
  if (diffLevel === "Medium" || diffLevel === "Hard")
    window.requestAnimationFrame(updateLoopp)
  else
    window.requestAnimationFrame(updateLoop)
}

function handleLose() {
  setTimeout(() => {
    title.classList.remove("hide")
    subtitle.classList.remove("hide")
    subtitle.textContent = `Score: ${getPassedPipesCount()}`
    document.addEventListener("keydown", function(event) {
        if (!event.repeat) {
            if (event.key == "e" || event.key == "E") {
                handleStart("Easy");
            }
            else if (event.key == "m" || event.key == "M") {
                handleStart("Medium");
            }
            else if (event.key == "h" || event.key == "H") {
                handleStart("Hard");
            }
            else {
                handleStart("Easy");
            }
        }
    }, { once: true })
  }, 100)
}