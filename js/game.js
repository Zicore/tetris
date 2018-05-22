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
        this.blockSize = 32;
        this.secondsPerLine = 0.15;
        this.maxRows = 25;
        this.maxColumns = 10;
        this.entities = [];
        this.updateFpsTime = 1.0;
        this.fpsToDraw = 0;
        this.lastCalledTime = performance.now();
        this.currentUpdateFpsTime = 0.0;
        this.deltaTime = 0;
        var tetrimino;

        var playfield = new Playfield(this,320.5, 800.5);
        this.playfields = [playfield];

        // tetrimino = new Tetrimino_I();
        // tetrimino.row = 1;
        // this.entities.push(tetrimino);

        // tetrimino = new Tetrimino_O();
        // tetrimino.column = 4;
        // tetrimino.row = 3;
        // this.entities.push(tetrimino);

        // tetrimino = new Tetrimino_T();
        // tetrimino.column = 4;
        // tetrimino.row = 6;
        // this.entities.push(tetrimino);

        // tetrimino = new Tetrimino_L();
        // tetrimino.column = 6;
        // tetrimino.row = 9;
        // this.entities.push(tetrimino);

        // tetrimino = new Tetrimino_J();
        // tetrimino.column = 3;
        // tetrimino.row = 12;
        // this.entities.push(tetrimino);

        // tetrimino = new Tetrimino_S();
        // tetrimino.column = 4;
        // tetrimino.row = 15;
        // this.entities.push(tetrimino);

        // tetrimino = new Tetrimino_Z();
        // tetrimino.column = 1;
        // tetrimino.row = 18;
        // this.entities.push(tetrimino);
    }

    render(tFrame) {
        this.context.canvas.width = 320;
        this.context.canvas.height = 800;

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (var i = 0; i < this.playfields.length; i++) {
            this.playfields[i].render(this, tFrame);
        }

        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].render(this, tFrame);
        }

        this.context.font = "24px Arial";
        
        this.context.fillStyle = "black";
        this.context.fillText("FPS: " + this.fpsToDraw.toFixed(2),4,22);
        this.context.fillStyle = "red";
        this.context.fillText("FPS: " + this.fpsToDraw.toFixed(2),5,23);
    }

    update(lastTick) {
                
        for (var i = 0; i < this.playfields.length; i++) {
            this.playfields[i].update(this, lastTick);
        }

        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].update(this, lastTick);
        }
    
        this.calculateFps();
        
        this.beginUpdateDelta();   
        this.endUpdateDelta();
    }

    beginUpdateDelta(){
        var delta = (performance.now() - this.lastCalledTime) / 1000.0;
        if(delta == 0){
            console.warn("delta is 0");
        }
        this.deltaTime = delta;     
    }

    endUpdateDelta(){           
        this.lastCalledTime = performance.now();
    }

    calculateFps(){
        this.currentUpdateFpsTime += this.deltaTime;
        if(this.currentUpdateFpsTime >= this.updateFpsTime){
            this.currentUpdateFpsTime = 0.0;
            this.fpsToDraw = this.fps;        
        }

        this.fps = 1/this.deltaTime;
    }

    setInitialState() {

    }

    rowToY(row) {
        return row * this.blockSize;
    }

    colToX(col) {
        return col * this.blockSize;
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
