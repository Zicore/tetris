/*
* width: 320px;
* height: 800px;
* size: 8
*/

class Game {
    constructor() {
        this.frames = 0;
        this.fps = 0;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        this.index = 0;
        this.blockSize = 26;
        this.secondsPerLine = 0.25;
        this.maxRows = 25;
        this.maxColumns = 10;
        this.updateFpsTime = 1.0;
        this.fpsToDraw = 0;
        this.lastCalledTime = performance.now();
        this.currentUpdateFpsTime = 0.0;
        this.score = 0;
        this.deltaTime = 0;
        this.keysDown = [];        
        this.bag = [];

        this.paused = false;

        this.infoScreenWidth = 40;

        this.playfieldWidth = this.blockSize * this.maxColumns;
        this.playfieldHeight = this.blockSize * this.maxRows;

        this.canvasWidth = 500;
        this.canvasHeight = 702;

        this.playfieldOffsetY = 50;

        var playfield = new Playfield(this, 0, this.playfieldOffsetY, this.playfieldWidth, this.playfieldHeight);
        this.playfields = [playfield];
        
        playfield.player.start();
        // this.scenario1();
    }

    render(tFrame) {
        this.context.canvas.width = this.canvasWidth;
        this.context.canvas.height = this.canvasHeight;

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.fillStyle = "#F3F3F3";
        this.context.fillRect(0,0, this.canvas.width, this.canvas.height);

        for (var i = 0; i < this.playfields.length; i++) {
            this.playfields[i].render(this, tFrame);
        }


        var infoString = "FPS: " + this.fpsToDraw.toFixed(2);

        if(this.paused){
            infoString = infoString + " (Paused)";
        }
        
        this.context.font = "16px Arial";
        this.context.fillStyle = "black";
        this.context.fillText(infoString, 416, 20);

        var scoreString = "Score: " + this.score;
        this.context.font = "20px Arial";
        this.context.fillStyle = "black";
        this.context.fillText(scoreString, 4, 20);
    }

    update(lastTick) {

        if(!this.paused){
            for (var i = 0; i < this.playfields.length; i++) {
                this.playfields[i].update(this, lastTick);
            }
            if(this.keysDown['ArrowLeft']){                
                this.playfields[0].player.moveLeft();
            }else if(this.keysDown['ArrowRight']){
                this.playfields[0].player.moveRight();
            }else if(this.keysDown['ArrowDown']){
                this.playfields[0].player.startSoftDrop();
            }else if(this.keysDown['Control']){
                this.playfields[0].player.rotateCounterClockwise();
            }else if(this.keysDown['x']){
                this.playfields[0].player.rotateClockwise();
            }
        }

        this.calculateFps();
        this.beginUpdateDelta();
        this.endUpdateDelta();
    }

    beginUpdateDelta() {
        var delta = (performance.now() - this.lastCalledTime) / 1000.0;
        if (delta == 0) {
            console.warn("delta is 0");
        }
        this.deltaTime = delta;
    }

    endUpdateDelta() {
        this.lastCalledTime = performance.now();
    }

    calculateFps() {
        this.currentUpdateFpsTime += this.deltaTime;
        if (this.currentUpdateFpsTime >= this.updateFpsTime) {
            this.currentUpdateFpsTime = 0.0;
            this.fpsToDraw = this.fps;
        }

        this.fps = 1 / this.deltaTime;
    }

    setInitialState() {
        this.initializeControls();
    }

    rowToY(row) {
        return row * this.blockSize;
    }

    colToX(col) {
        return col * this.blockSize;
    }

    togglePause(){
        this.paused = !this.paused;
    }
    
    scenario1(){
        var matrix = this.playfields[0].matrix;

        matrix.cells[20][0].block.visible = true;
        matrix.cells[20][1].block.visible = true;
        matrix.cells[20][2].block.visible = true;
        matrix.cells[20][3].block.visible = true;
        matrix.cells[20][4].block.visible = true;
        matrix.cells[20][5].block.visible = true;
        matrix.cells[20][6].block.visible = true;
        matrix.cells[20][7].block.visible = true;
        matrix.cells[20][8].block.visible = true;

        matrix.cells[21][0].block.visible = true;
        matrix.cells[21][1].block.visible = true;
        matrix.cells[21][2].block.visible = true;
        matrix.cells[21][3].block.visible = true;
        matrix.cells[21][4].block.visible = true;
        matrix.cells[21][5].block.visible = true;
        matrix.cells[21][6].block.visible = true;
        matrix.cells[21][7].block.visible = true;
        matrix.cells[21][8].block.visible = true;

        matrix.cells[22][0].block.visible = true;
        matrix.cells[22][1].block.visible = true;
        matrix.cells[22][2].block.visible = true;
        matrix.cells[22][3].block.visible = true;
        matrix.cells[22][4].block.visible = false;
        matrix.cells[22][5].block.visible = true;
        matrix.cells[22][6].block.visible = true;
        matrix.cells[22][7].block.visible = true;
        matrix.cells[22][8].block.visible = true;

        matrix.cells[23][0].block.visible = true;
        matrix.cells[23][1].block.visible = true;
        matrix.cells[23][2].block.visible = true;
        matrix.cells[23][3].block.visible = true;
        matrix.cells[23][4].block.visible = true;
        matrix.cells[23][5].block.visible = true;
        matrix.cells[23][6].block.visible = true;
        matrix.cells[23][7].block.visible = true;
        matrix.cells[23][8].block.visible = true;

        this.playfields[0].player.tetrimino.column = 8;
        this.playfields[0].player.tetrimino.facing = Tetrimino.FACING_WEST;
        this.playfields[0].player.tetrimino.setMatrixByFacing(this.playfields[0].player.tetrimino.facing);        
    }

    initializeControls() {
        document.addEventListener('keydown', (event) => {
            const keyName = event.key;

            // if (keyName === 'Control') {
            //     // not alert when only Control key is pressed.
            //     return;
            // }

            // if (event.ctrlKey) {
            //     // Even though event.key is not 'Control' (i.e. 'a' is pressed),
            //     // event.ctrlKey may be true if Ctrl key is pressed at the time.
            //     alert(`Combination of ctrlKey + ${keyName}`);
            // } else {
            //     alert(`Key pressed ${keyName}`);
            // }

            this.keysDown[keyName] = true;
        }, false);

        document.addEventListener('keyup', (event) => {
            const keyName = event.key;

            if(keyName === 'ArrowLeft'){
                this.playfields[0].player.stopMovement();
            }else if(keyName === 'ArrowRight'){
                this.playfields[0].player.stopMovement();
            }
            else if(keyName === 'ArrowDown'){
                this.playfields[0].player.endSoftDrop();
            }else if(keyName === 'Control'){
                this.playfields[0].player.endRotate();
            }else if(keyName === 'x'){
                this.playfields[0].player.endRotate();
            }else if(keyName === 'p'){
                this.togglePause();
            }

            console.info("Code: " + event.keyCode + " KeyName: " + event.key);

            this.keysDown[keyName] = false;
        }, false);
    }
    /*
    * Starting with the semicolon is in case whatever line of code above this example
    * relied on automatic semicolon insertion (ASI). The browser could accidentally
    * think this whole example continues from the previous line. The leading semicolon
    * marks the beginning of our new line if the previous one was not empty or terminated.
    *
    * Let us also assume that Game is previously defined.
    *
    * Game.lastRender keeps track of the last provided requestAnimationFrame timestamp.
    * Game.lastTick keeps track of the last update time. Always increments by tickLength.
    * Game.tickLength is how frequently the game state updates. It is 20 Hz (50ms) here.
    *
    * timeSinceTick is the time between requestAnimationFrame callback and last update.
    * numTicks is how many updates should have happened between these two rendered frames.
    *
    * render() is passed tFrame because it is assumed that the render method will calculate
    *          how long it has been since the most recently passed update tick for 
    *          extrapolation (purely cosmetic for fast devices). It draws the scene.
    *
    * update() calculates the game state as of a given point in time. It should always
    *          increment by tickLength. It is the authority for game state. It is passed 
    *          the DOMHighResTimeStamp for the time it represents (which, again, is always 
    *          last update + Game.tickLength unless a pause feature is added, etc.)
    *
    * setInitialState() Performs whatever tasks are leftover before the mainloop must run.
    *                   It is just a generic example function that you might have added.
    */
    run() {
        function main(tFrame) {
            game = window.game;
            game.stopMain = window.requestAnimationFrame(main);
            var nextTick = game.lastTick + game.tickLength;
            var numTicks = 0;

            //If tFrame < nextTick then 0 ticks need to be updated (0 is default for numTicks).
            //If tFrame = nextTick then 1 tick needs to be updated (and so forth).
            //Note: As we mention in summary, you should keep track of how large numTicks is.
            //If it is large, then either your game was asleep, or the machine cannot keep up.
            if (tFrame > nextTick) {
                var timeSinceTick = tFrame - game.lastTick;
                numTicks = Math.floor(timeSinceTick / game.tickLength);
            }

            queueUpdates(game, numTicks);
            game.render(tFrame);
            game.lastRender = tFrame;
        }

        function queueUpdates(game, numTicks) {
            for (var i = 0; i < numTicks; i++) {
                game.lastTick = game.lastTick + game.tickLength; //Now lastTick is this tick.
                game.update(game.lastTick);
            }
        }

        this.lastTick = performance.now();
        this.lastRender = this.lastTick; //Pretend the first draw was on first update.
        this.tickLength = 20; //This sets your simulation to run at 20Hz (50ms)

        this.setInitialState();

        this.time_start = performance.now();
        main(performance.now()); // Start the cycle
    }
}
