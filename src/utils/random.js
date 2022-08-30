/**
 * @module 
 * 
 */
function Randomize(){

    /**
     * 
     * @param {number} range 
     * @returns 
     */
    this.random = (range) => {

        return Math.round(Math.random()*range);
    }
}

export default new Randomize();