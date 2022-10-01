class SmartCapsPop {
    // gówne parametry
    constructor(popSize, x1, y1, x2, y2){
        this.caps = []
        this.popSize = popSize
        this.mutationRate = 0.01

        this.targetPoint = new Vector(x1, y1)
        this.startingPoint = new Vector(x2, y2)
        
        this.generation = 1
        this.nextGenBrains = []
    }

    // tworznie komurek  
    init(){
        for(let i = 0; i <this.popSize; i++){
            if(this.caps[i]){
                this.caps[i].remove()
              }
            this.caps[i] = new SmartCaps(this.startingPoint.x, this.startingPoint.y+10, this.startingPoint.x, this.startingPoint.y-10, 10, 50)
            this.caps[i].createSteps(100)
        }
    }
    
    // suma prędkości 
    velocitySum(){
        let vSum = 0
        this.caps.forEach(caps => {
            vSum += caps.vel.mag()
        })
        return vSum
    }

    targetDistanceAvg(){
        let dSum = 0 
        this.caps.forEach(caps => {
            dSum += caps.distance(this.targetPoint)
        })
        return dSum / this.popSize
    }

// obliczanie dla każdej komurki odległości od punktu Y
    setFitness(){
        this.caps.forEach(caps => {
            caps.fitness = (1000 / caps.distance(this.targetPoint))**5
            console.log(caps.fitness)
        })
    }

    fitnessSum(){
        let fSum = 0 
        this.caps.forEach(caps => {
            fSum += caps.fitness
        })
        return fSum
    }

    pickCaps(){
        let picker = Math.random()
        let fitnessSum = this.fitnessSum()
        let currentSum = 0
        for(let i = 0; i < this.caps.length; i++){
            currentSum += this.caps[i].fitness / fitnessSum
            if(picker < currentSum){
                this.caps[i].comp[1].color = "orange"
                return this.caps[i]
            }
        }
    }

    crossover(parent1, parent2){
        let newBrain = []
        for(let i=0; i<parent1.brain.length; i++){
            newBrain[i] = Math.round(Math.random()) ? parent1.brain[i] : parent2.brain[i]
        }

        return newBrain
    }

    mutation(brain){
        for(let i=0; i< brain.length; i++){
            if(this.mutationRate > Math.random()){
                brain[i] = randInt(0, 15).toString(2).padStart(4, "0")
            }
        }
    }
    creatNextGen(){
        for(let i=0; i < this.popSize; i++){
            let parent1 = this.pickCaps()
            let parent2 = this.pickCaps()
            let newBrain = this.crossover(parent1, parent2)
            this.mutation(newBrain)
            this.nextGenBrains.push(newBrain)
        }
    }

    replaceNextGen(){
        for(let i=0; i< this.popSize; i++){
            this.caps[i].brain = this.nextGenBrains[i]
            this.caps[i].setPosition(this.startingPoint.x, this.startingPoint.y, 0)
            this.caps[i].setColor('lightgreen')
            this.caps[i].comp[1].color = 'yellowgreen'
        }
        this.nextGenBrains = []
        this.generation++
    }
}