let HOLE_HEIGHT = 250
let PIPE_WIDTH = 100
let PIPE_INTERVAL = 1600
let PIPE_SPEED = 0.5
let pipes = []
let timeSinceLastPipe
let passedPipeCount
let score_val = document.querySelector('.score_val')
let score_title = document.querySelector('.score_title')
export function setupPipes(diffLevel) {
    score_title.innerHTML = 'Score : ';
    score_val.innerHTML = '0';
    if (diffLevel === "Medium") {
        PIPE_SPEED = 0.6
        PIPE_INTERVAL = 1400
        HOLE_HEIGHT = 200
    }
    else if (diffLevel === "Hard") {
        PIPE_SPEED = 0.6
        PIPE_WIDTH = Math.random() * (3000 - 100) + 100
        PIPE_INTERVAL = PIPE_WIDTH / PIPE_SPEED + 500
    }
    else {
        HOLE_HEIGHT = 250
        PIPE_WIDTH = 100
        PIPE_INTERVAL = 1600
        PIPE_SPEED = 0.5
    }
    document.documentElement.style.setProperty("--pipe-width", PIPE_WIDTH)
    document.documentElement.style.setProperty("--hole-height", HOLE_HEIGHT)
    pipes.forEach(pipe => pipe.remove())
    timeSinceLastPipe = PIPE_INTERVAL
    passedPipeCount = 0
}

export function updatePipes(delta) {
  timeSinceLastPipe += delta
  if (timeSinceLastPipe > PIPE_INTERVAL) {
    timeSinceLastPipe -= PIPE_INTERVAL
    createPipe()
  }

  pipes.forEach(pipe => {
    if (pipe.left + PIPE_WIDTH < 0) {
      passedPipeCount++
      score_val.innerHTML =+ score_val.innerHTML + 1;
      return pipe.remove()
    }
    pipe.left = pipe.left - delta * PIPE_SPEED
  })
}

export function getPassedPipesCount() {
  return passedPipeCount
}

export function getPipeRects() {
  return pipes.flatMap(pipe => pipe.rects())
}

function createPipe() {
  const pipeElem = document.createElement("div")
  const topElem = createPipeSegment("top")
  const bottomElem = createPipeSegment("bottom")
  pipeElem.append(topElem)
  pipeElem.append(bottomElem)
  pipeElem.classList.add("pipe")
  pipeElem.style.setProperty(
    "--hole-top",
    randomNumberBetween(
      HOLE_HEIGHT * 1.5,
      window.innerHeight - HOLE_HEIGHT * 0.5
    )
  )
  const pipe = {
    get left() {
      return parseFloat(
        getComputedStyle(pipeElem).getPropertyValue("--pipe-left")
      )
    },
    set left(value) {
      pipeElem.style.setProperty("--pipe-left", value)
    },
    remove() {
      pipes = pipes.filter(p => p !== pipe)
      pipeElem.remove()
    },
    rects() {
      return [
        topElem.getBoundingClientRect(),
        bottomElem.getBoundingClientRect(),
      ]
    },
  }
  pipe.left = window.innerWidth
  document.body.append(pipeElem)
  pipes.push(pipe)
}

function createPipeSegment(position) {
  const segment = document.createElement("div")
  segment.classList.add("segment", position)
  return segment
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}