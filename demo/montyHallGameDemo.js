function MontyHallGameDemo(){

    this.run = function(){

        console.log('MontyHall game is up and running...');
    }
}

const setup = (() => {

    window.onload = () => {

        window.app = new MontyHallGameDemo();
        window.app.run();
    }
    
})();