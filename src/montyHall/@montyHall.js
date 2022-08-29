import Randomize from '../utils/random.js';

/**
 * @class
 * @module MontyHall
 * @description The montyhall module contains all the logic of the montyhall game.
 * 
 */
class MontyHall {

    #probabilities = null;

    #contestentChoosedDoor = null;
    #hostOpenedDoor = null;
    #prizeDoor = null;
    #switchingDoor = null;

    #takenDoors = null;

    #winsBySwitching = 0;
    #winsByKeeping = 0;

    constructor(){

        this.#initState();
    }

    /**
     * 
     */
    #initState(){

        this.#probabilities = [1/3,1/3,1/3];
        this.#prizeDoor = Randomize.random(2);
        this.#takenDoors = [0,0,0];

        this.#takenDoors[this.#prizeDoor] = 1;
    }

    /**
     * 
     */
    updateProbabilities(){
        
        this.#probabilities[this.#hostOpenedDoor-1] = 0;
        this.#probabilities[this.#switchingDoor-1] = 2/3;
    }

    /**
     * 
     */
    keepTheDoor(){

        if(this.#contestentChoosedDoor == this.#prizeDoor){
            this.#winsByKeeping++;
        }
    }

    /**
     * 
     */
    switchTheDoor(){

        this.contestentChoosedDoor = this.switchToDoor;

        if(this.#contestentChoosedDoor == this.#prizeDoor){
            this.#winsBySwitching++;
        }
    }

    /**
     * 
     */
    resetState(){

        this.#initState();
    }
    
    /**
     * @param {number} value
     */
    set contestentChoosedDoor(value){

        this.#contestentChoosedDoor = value;
        this.#takenDoors[value-1] = 1;

        this.#takenDoors.forEach((door,index) => {

            if(index != this.hostChoosedDoor && index != this.contestentChoosedDoor){

                this.#switchingDoor = index;
            }
        });
    }

    /**
     * 
     */
    get probabilities(){

        return this.#probabilities;
    }

    /**
     * 
     */
    get contestentChoosedDoor(){

        return this.#contestentChoosedDoor-1;
    }

    /**
     * 
     */
    get hostChoosedDoor(){

        return this.#takenDoors.indexOf(0);
    }

    /**
     * 
     */
    get switchToDoor(){

        return this.#switchingDoor;
    }

    /**
     * 
     */
    get prizeDoor(){

        return this.#prizeDoor;
    }
}

export default MontyHall;