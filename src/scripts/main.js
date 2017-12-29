(function(){
    const canv = document.querySelector('canvas');
    const ctx = canv.getContext('2d');

    //keys
    let LEFT = 37,
          RIGHT = 39,
          ENTER = 13,
          SPACE = 32;

    //directions
    const movLeft = mvRight = false;
    
    //states
    let LOADING = 0,
        PLAYING = 1,
        PAUSED = 2,
        OVER = 3;

    let gameState = LOADING;

    //listenners
    window.addEventListener('keydown', function(e){
       let key = e.keyCode;
       
       switch (key) {
            case LEFT:
               movLeft = true;
               break;
            case RIGHT:
                movRight = true;
                break;
       }
       
    }, false);

    window.addEventListener('keyup', function(e){
        let key = e.keyCode;
        
        switch (key) {
            case LEFT:
                movLeft = false;
                break;
            case RIGHT:
                movRight = false;
                break;
            case ENTER:
            if (gameState != PLAYING) {
                gameState = PLAYING;
            }else{
                gameState = PAUSED;
            }
        }
        
    }, false);


    function loop(){
        requestAnimationFrame(loop, canv);

        switch (gameState) {
            case LOADING:
                console.log('loading');
                break;
            case PLAYING:
                update();
                break;        
        }
        render();
    }

    function update(){

    }

    function render(){
        
    }

    loop();

}());