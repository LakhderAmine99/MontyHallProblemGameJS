export default function MHUI(){

    const ASSETS_PATH = "../../assets/images/";

    /**
     * @type {HTMLElement[]} doors
     */
    this.doors = null;

    /**
     * @type {[]} gameMessages
     */
    this.gameMessages = [

        "<b>Let's make a deal !</b><br>Do you want to keep the door or switch to win your prize !",
        "Alright, you made your choice and the wining door is...",
        "Let's make a new deal, let's try to play the game again !",
        "Ok then, you got your prize, your car !, this all by switching to the other door !",
        "I told you to switch not to loose your beautifull car !"
    ];

    /**
     * 
     * @param {string} fileName 
     * @returns 
     */
    this.loadImage = function(fileName){

        let image = document.createElement('img')

        image.src = ASSETS_PATH+fileName+'.jpg';
        image.classList.add('inside-image');

        return image;
    }

    /**
     * 
     * @param {HTMLElement[]} doors 
     * @param {number} prizeDoor 
     */
    this.init = function(doors,prizeDoor){
        
        this.doors = doors;

        this.initUI(prizeDoor);
    }

    /**
     * 
     * @param {number} prizeDoor 
     */
    this.initUI = function(prizeDoor){

        this.doors.forEach((door,index) => {

            if(index === prizeDoor){

                door.appendChild(this.loadImage("car"));

            }else{

                door.appendChild(this.loadImage("goat"))
            }
        });
    }

    /**
     * 
     * @param {HTMLElement[]} doors 
     */
    this.openDoor = function(doors){

        for(let door of doors){
            
            door.classList.add('opened');
        }
    }

    /**
     * 
     */
    this.closeAllDoors = function(){

        this.doors.forEach(door => {

            door.querySelector('.door-image').classList.remove('opened');
        });
    }

    /**
     * 
     * @param {number} prizeDoor 
     */
    this.reset = function(prizeDoor){

        this.closeAllDoors();
        
        this.doors.forEach(door => {
            
            door.removeChild(door.children[1])
        });

        window.setTimeout(()=>{

            this.initUI(prizeDoor);

        },600);
    }
};