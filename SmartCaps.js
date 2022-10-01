// tu będziemy tworzyć muzg naszej kapsułki

class SmartCaps extends Capsule{
    constructor(x1, y1, x2, y2, r, m){
        super(x1, y1, x2, y2, r, m)
        this.brain = []
        this.layer = -1
        this.friction = 0.06
        this.angFriction = 0.05
        this.maxSpeed = 5
        this.setColor('rgb(207, 255, 135)')
        this.comp[2].color = 'greenyellow'
        this.fitness = 0
    }

    /**
     * @pragma stworzenie movmentu dla każdej komurki
     */
    createSteps(size){
        for(let i = 0; i < size; i++){
            this.brain[i] = randInt(0, 15).toString(2).padStart(4, "0")
        }
    }

    // sterowanie każdą poszczególna komurką za pomoćą klawiszy
    makeMove(currentStep){
        this.left = false
        this.right = false
        this.down = false
        this.up = false
    
        if(parseInt(this.brain[currentStep][0], 2)){
            this.left = true
        }
        if(parseInt(this.brain[currentStep][1], 2)){
            this.right = true
        }
        if(parseInt(this.brain[currentStep][2], 2)){
            this.up = true
        }
        if(parseInt(this.brain[currentStep][3], 2)){
            this.down = true
        }

    }

    // odległość
    distance(vec){
        return this.pos.subtr(vec).mag()
    }

    // zaczymanie wsystkich komurek 
    stop(){
        this.left = false
        this.right = false
        this.up = false
        this.down = false
        this.acc.set(0,0)
    }
}

