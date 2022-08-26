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

    constructor(){

        this.#probabilities = [1/3,1/3,1/3];
        this.#prizeDoor = Randomize.random(2);
        this.#takenDoors = [0,0,0];
    }

    updateProbabilities(){
        
        this.#probabilities[this.#hostOpenedDoor-1] = 0;
        this.#probabilities[this.#switchingDoor-1] = 2/3;
    }
    
    /**
     * @param {number} value
     */
    set contestentChoosedDoor(value){

        this.#contestentChoice = value;
        this.#takenDoors[value-1] = 1;
    }

    /**
     * @param {number} value
     */
    set hostOpenedDoor(value){

        this.#hostOpenedDoor = value;
        this.#takenDoors[value-1] = 1;

        this.#switchingDoor = this.#takenDoors.indexOf(0)+1;
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
    get prizeDoorNumber(){

        return this.#prizeDoorNumber;
    }
}

export default MontyHall;