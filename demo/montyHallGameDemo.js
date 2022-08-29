import { MontyHallPack } from '../src/index.js';  

function MontyHallGameDemo(){

    const doorsBlocks = document.querySelectorAll('.game-content .block');
    const doors = document.querySelectorAll('.game-content .door');

    const doorsImages = document.querySelectorAll('.game-content .door-image');

    const playBtn = document.getElementById('play');

    const mhAvatar = document.querySelector('.mh-avatar');

    let state = "starting";

    /**
     * 
     */
    this.run = function(){

        console.log('MontyHall game is up and running...');

        init();
    }

    /**
     * 
     */
    function init(){

        initEventListeners();

        MontyHallPack.MHUI.init(doors,MontyHallPack.MontyHall.prizeDoor);
    }

    /**
     * 
     */
    function initEventListeners(){

        doorsBlocks.forEach(door => door.addEventListener('click',handleDoorOpening));

        playBtn.addEventListener('click',handlePlayGameStart);
    }

    /**
     * 
     * @param {Event} e 
     */
    function handleDoorOpening(e){

        let targetImage = e.target.querySelector('.door-image');

        e.target.querySelector('.door').classList.add('selected');

        MontyHallPack.MontyHall.contestentChoosedDoor = parseInt(targetImage.getAttribute('data-door-number'));

        switch(state){

            case 'starting':

                let hostChoosedDoor = doorsImages[MontyHallPack.MontyHall.hostChoosedDoor];
        
                window.setTimeout(()=>{
        
                    mhAvatar.classList.add('fadeIn');
                
                    MontyHallPack.MHUI.openDoor([hostChoosedDoor]);
        
                },1000);

                state = "ending";

            break;

            case 'ending':

                MontyHallPack.MHUI.openDoor(doorsImages);
            
            break;
        }
    }

    /**
     * 
     * @param {Event} e 
     */
    function handlePlayGameStart(e){

        state = "starting";

        MontyHallPack.MontyHall.resetState();
        MontyHallPack.MHUI.reset(MontyHallPack.MontyHall.prizeDoor);

        mhAvatar.classList.remove('fadeIn');
    }
}

const setup = (() => {

    window.onload = () => {

        window.app = new MontyHallGameDemo();
        window.app.run();
    }
    
})();