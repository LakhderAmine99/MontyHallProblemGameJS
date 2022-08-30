import { MontyHallPack } from '../src/index.js';  

function MontyHallGameDemo(){

    const doorsBlocks = document.querySelectorAll('.game-content .block');
    const doors = document.querySelectorAll('.game-content .door');

    const doorsImages = document.querySelectorAll('.game-content .door-image');

    const playBtn = document.getElementById('play');

    const notification = document.querySelector('.talking');

    const messagePanel = document.querySelector('.message');

    const gameMessages = [
        "<b>Let's make a deal !</b><br>Do you want to keep the door or switch to win your prize !",
        "Alright, you made your choice and the wining door is...",
        "Let's make a new deal, let's try to play the game again !",
        "Ok then, you got your prize, your car !, this all by switching to the other door !",
        "I told you to switch not to loose your beautifull car !"
    ];

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

        MontyHallPack.MontyHall.contestentChoosedDoor = parseInt(targetImage.getAttribute('data-door-number'));

        notification.classList.remove('fadeIn');

        switch(state){

            case 'starting':

                e.target.querySelector('.door').classList.add('selected');

                let hostChoosedDoor = doorsImages[MontyHallPack.MontyHall.hostChoosedDoor];
        
                window.setTimeout(()=>{
        
                    messagePanel.innerHTML = gameMessages[0];
                    notification.classList.add('fadeIn');
                    MontyHallPack.MHUI.openDoor([hostChoosedDoor]);
        
                },1000);

                state = "ending";

            break;

            case 'ending':
                
                window.setTimeout(()=>{
                    
                    messagePanel.innerHTML = gameMessages[1];
                    notification.classList.add('fadeIn');
                    MontyHallPack.MHUI.openDoor(doorsImages);

                    doors[MontyHallPack.MontyHall.contestentChoosedDoor].classList.add('selected-wrong');
                    doors[MontyHallPack.MontyHall.prizeDoor].classList.add('selected-prize');

                },1000);

                state = "playAgain";
            
            break;

            case 'playAgain':

                window.setTimeout(()=>{
                    
                    messagePanel.innerHTML = gameMessages[2];
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

        MontyHallPack.MontyHall.resetState();
        MontyHallPack.MHUI.reset(MontyHallPack.MontyHall.prizeDoor);

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