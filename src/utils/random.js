/**
 * @module 
 * 
 */
function Randomize(){

    this.random = (range) => {

        return Math.round(Math.random()*range);
    }
}

export default new Randomize();