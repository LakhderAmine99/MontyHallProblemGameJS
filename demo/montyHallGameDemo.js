import { MHP } from '../src/index.js';  

function MontyHallGameDemo(){

    const doorsBlocks = document.querySelectorAll('.game-content .block');
    const doors = document.querySelectorAll('.game-content .door');

    const doorsImages = document.querySelectorAll('.game-content .door-image');

    const playBtn = document.getElementById('play');

    const notification = document.querySelector('.talking');

    const messagePanel = document.querySelector('.message');

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

        MHP.MHUI.init(doors,MHP.MontyHall.prizeDoor);
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

        MHP.MontyHall.contestentChoosedDoor = parseInt(targetImage.getAttribute('data-door-number'));

        notification.classList.remove('fadeIn');

        switch(state){

            case 'starting':

                e.target.querySelector('.door').classList.add('selected');

                let hostChoosedDoor = doorsImages[MHP.MontyHall.hostChoosedDoor];
        
                window.setTimeout(()=>{
        
                    messagePanel.innerHTML = MHP.MHUI.gameMessages[0];
                    notification.classList.add('fadeIn');
                    
                    MHP.MHUI.openDoor([hostChoosedDoor]);
        
                },1000);

                state = "ending";

            break;

            case 'ending':
                
                window.setTimeout(()=>{
                    
                    messagePanel.innerHTML = MHP.MHUI.gameMessages[1];
                    notification.classList.add('fadeIn');

                    MHP.MHUI.openDoor(doorsImages);

                    doors[MHP.MontyHall.contestentChoosedDoor].classList.add('selected-wrong');
                    doors[MHP.MontyHall.prizeDoor].classList.add('selected-prize');

                },1000);

                state = "playing_again";
            
            break;

            case 'playing_again':

                window.setTimeout(()=>{
                    
                    messagePanel.innerHTML = MHP.MHUI.gameMessages[2];
                    notification.classList.add('fadeIn');
        
                },1000);
            
            break;
        }
    }

    /**
     * 
     * @param {Event} e 
     */
    function handlePlayGameStart(e){

        state = "starting";

        MHP.MontyHall.resetState();
        MHP.MHUI.reset(MHP.MontyHall.prizeDoor);

        notification.classList.remove('fadeIn');

        doors.forEach(door => {

            if(door.classList.contains('selected')){

                door.classList.remove('selected');
            }
            
            if(door.classList.contains('selected-prize')){
                
                door.classList.remove('selected-prize');
            }

            if(door.classList.contains('selected-wrong')){
                
                door.classList.remove('selected-wrong');
            }
        });
    }
}

const setup = (() => {

    window.onload = () => {

        window.app = new MontyHallGameDemo();
        window.app.run();
    }
    
})();