export default function MHUI(){

    const ASSETS_PATH = "../../assets/images/";

    /**
     * @type {HTMLElement[]} doors
     */
    this.doors = null;

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
     * @param {string} message 
     * @param {HTMLElement} wrapper 
     */
    this.notify = function(message,wrapper){

        let messageElement = document.createElement('div');
        messageElement.innerHTML = message;

        messageElement.style = "text-align:center;"

        wrapper.appendElement(messageElement);
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