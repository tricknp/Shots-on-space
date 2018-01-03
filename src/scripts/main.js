(function(){
    const canv = document.querySelector('canvas');
    const ctx = canv.getContext('2d');


    //sprites
    let sprites = [];
    let assetsToLoad = [];

    let background = new Sprite(0, 56, 400, 500, 0, 0);
    sprites.push(background);

    let defender = new Sprite(0, 0, 30, 50, 185, 450);
    sprites.push(defender);
    
    //img
    let img = new Image();
    img.addEventListener('load', loadHandler, false);
    img.src = 'assets/images/img.png';
    assetsToLoad.push(img);
    

    //recurses count
    let loadAssets = 0;

    //keys
    let LEFT = 37,
          RIGHT = 39,
          ENTER = 13,
          SPACE = 32;

    //directions
    const movLeft = movRight = false;
    
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

    //functions
    function loadHandler() {
        loadAssets++;
        if (loadAssets == assetsToLoad.length) {
            img.removeEventListener('load', loadHandler, false);
            gameState = PAUSED;
        } 
    }

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
        //move left
        if(movLeft && !movRight){
            defender.speedX = -5;
        }

        //move right
        if(movRight && !movLeft){
            defender.speedX = 5;
        }

        //move to nave
        if(!movLeft && !movRight){
            defender.speedX = 0;
        }

        //att position
        defender.speedX = Math.max(0, Math.min(canv.width - defender.width, defender.x + defender.speedX));
    }

    function render(){
     ctx.clearRect(0, 0, canv.width, canv.height);
     if (sprites.length != 0) {
         for(var i in sprites){
             var spr = sprites[i];
             ctx.drawImage(img, spr.sourceX, spr.sourceY, spr.width, spr.height, Math.floor(spr.x), Math.floor(spr.y), spr.width, spr.height);
             }
        } 
    }

    loop();

}());