const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.focus();
putWallsAround(0, 0, canvas.clientWidth, canvas.clientHeight);
const xTargetInput = document.querySelector('#xtargetinput')
const yTargetInput = document.querySelector('#ytargetinput')
const sizeTargetInput = document.querySelector('#sizetargetinput')
const starterButton = document.querySelector('#relaunch')
const nextGenButton = document.querySelector('#nextGen')
const genDataField = document.querySelector('#genData')
const addButton = document.querySelector('#add')
const xStartingPointInput = document.querySelector('#xStartingPoint')
const yStartingPointInput = document.querySelector('#yStartingPoint')
const sizeStartingPointInput = document.querySelector('#sizeStartingPoint')
const popSizeInput = document.querySelector('#popSize')
const autoInput = document.querySelector('#auto')
let counter = 0
let stepCounter = 0 
let smartCapsPop
let targetUpdata = true
let xTarget
let yTarget
let sizeTarget
let xStartingPoint
let yStartingPoint
let sizeStartingPoint
let popSize
let auto = false
// ilość komurek

const create = (xTarget, yTarget, sizeTarget, xStartingPoint, yStartingPoint, sizeStartingPoint, popSize) => {
  if(targetUpdata){
    smartCapsPop = new SmartCapsPop(popSize, xTarget, yTarget,xStartingPoint, yStartingPoint)
    let startingSign = new Ball(xStartingPoint, yStartingPoint, sizeStartingPoint, 5)
    startingSign.layer = -1
    startingSign.setColor('green')
  
    let targetSign = new Ball(smartCapsPop.targetPoint.x, smartCapsPop.targetPoint.y, sizeTarget, 5)
    targetSign.layer = -2
    targetSign.setColor("red")
    targetUpdata = false
    add.disabled = true

  }return

}

autoInput.onclick = () => {
  auto = !auto
}

addButton.onclick = () => {
  xTarget = Number(xTargetInput.value)
  yTarget = Number(yTargetInput.value)
  sizeTarget = Number(sizeTargetInput.value)
  xStartingPoint = Number(xStartingPointInput.value)
  yStartingPoint = Number(yStartingPointInput.value)
  sizeStartingPoint = Number(sizeStartingPointInput.value)
  popSize = Number(popSizeInput.value)


  create(xTarget, yTarget, sizeTarget, xStartingPoint, yStartingPoint, sizeStartingPoint, popSize)

  starterButton.disabled = false

}

let capsAreMoving = false
// funkcja przycisku


starterButton.disabled = true
nextGenButton.disabled = true

starterButton.onclick = () => {
  starterButton.disabled = true
  nextGenButton.disabled = true
  genDataField.innerHTML = ``
  smartCapsPop.generation = 1
  
  smartCapsPop.init()
  capsAreMoving = true
  counter = 0
  stepCounter = 0
}

const start = () => {
  smartCapsPop.replaceNextGen()
  counter = 0 
  stepCounter = -1
  capsAreMoving = true

}

nextGenButton.onclick = () => {
  smartCapsPop.replaceNextGen()
  counter = 0
  stepCounter = 0
  capsAreMoving = true
  starterButton.disabled = true
  nextGenButton.disabled = true
}

// loginka wystkich komurek 
function gameLogic() {
  if (capsAreMoving) {
    if (counter % 3 === 0) {
      smartCapsPop.caps.forEach(caps => {
        if (stepCounter < caps.brain.length) {
          caps.makeMove(stepCounter)
        } else {
          caps.stop()
        }
      })
      if (smartCapsPop.velocitySum() < 0.01 && stepCounter > 0) {
        starterButton.disabled = false
        nextGenButton.disabled = false
        capsAreMoving = false
        smartCapsPop.setFitness()
        smartCapsPop.creatNextGen()
        genDataField.innerHTML += `<br /> <p>Gen ${smartCapsPop.generation} - Avg dist: ${Math.floor(smartCapsPop.targetDistanceAvg())}</p>`
        nextGenButton.textContent = `next Gen ${smartCapsPop.generation}`
        if(auto){
          start()
        }else{
          console.log('auto off')
        }

      }
      stepCounter++
      counter = 0
    }
    counter++
  }
}

// handling the user input and the game loop
requestAnimationFrame(mainLoop);