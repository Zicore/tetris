class Player extends Entity {
    constructor(game, playfield) {
        super();
        this.game = game;
        this.playfield = playfield;
        this.requireGravityUpdate = false;

        this.tetrimino = null;
        this.timeToUpdate = 0.0;
        this.locking = false;
        this.lockTime = 0.0;
        this.lockTimeMax = 0.5;

        this.movementTime = 0.0;
        this.movementTimeMax = 0.02;
        this.isSoftDropping = false;

        this.startedMoving = false;
        this.autoRepeat = false;
        this.autoRepeatTime = 0.0;
        this.autoRepeatTimeMax = 0.2;

        this.tetriminoBag = [0,1,2,3,4,5,6];
        var s = 1 / 7.0;
        this.spawnTable = [s,s,s,s,s,s,s];

        this.tetriminos = [];

        for(var i = 0; i < this.tetriminoBag.length; i++){
            this.tetriminos.push(this.getTetriminoByIndex(this.tetriminoBag[i]));
        }

        this.history = [];

        this.rotating = false;
        this.nextQueue = [];
        this.initializeNextQueue();
    }

    render(game, tFrame) {
        super.render(game, tFrame);

        if (this.tetrimino !== null && !this.tetrimino.locked) {
            this.tetrimino.renderOffset(this.playfield.x, this.playfield.y,game, tFrame);
        }
    }

    update(game, lastTick) {
        super.update(game, lastTick);

        if (!this.playfield.matrix.isAnimating) {
            var secondsPerLine = game.secondsPerLine;
            if (this.isSoftDropping) {
                secondsPerLine = secondsPerLine / 10.0;
            }
            
            if (this.tetrimino != null) {
                this.timeToUpdate += game.deltaTime;
                if (this.timeToUpdate >= secondsPerLine) {
                    this.timeToUpdate = 0.0;
                    if (!this.tetrimino.isTouchingGround() && !this.tetrimino.isTouchingCells()) {
                        this.locking = false;
                        this.lockTime = 0.0;
                        this.tetrimino.translateRaw(1, 0);
                    } else {
                        this.locking = true;
                    }
                }

                if (this.locking) {
                    this.lockTime += game.deltaTime;
                    if (this.lockTime >= this.lockTimeMax) {
                        if(this.tetrimino.isTouchingGround() || this.tetrimino.isTouchingCells()){
                            this.playfield.matrix.add(this.tetrimino);
                            this.spawnNextTetrimono();
                        }                        
                        this.locking = false;
                        this.lockTime = 0.0;
                    }
                }
            }
        }
    }

    initializeNextQueue(){
        for(var i = 0; i < 7; i++){
            var tetrimino = this.getNextTetrimino(this.game, this.playfield);
            this.nextQueue.push(tetrimino);
        }
    }

    start() {
        this.spawnNextTetrimono();
    }

    spawnNextTetrimono() {
        var tetrimino = this.getNextTetrimino(this.game, this.playfield);
        this.nextQueue.push(tetrimino);

        this.tetrimino = this.nextQueue.shift();
        this.tetrimino.column = 3;
        this.tetrimino.row = -2;
    }

    // shuffle(array) {
    //     var currentIndex = array.length, temporaryValue, randomIndex;
      
    //     // While there remain elements to shuffle...
    //     while (0 !== currentIndex) {
      
    //       // Pick a remaining element...
    //       randomIndex = Math.floor(Math.random() * currentIndex);
    //       currentIndex -= 1;
      
    //       // And swap it with the current element.
    //       temporaryValue = array[currentIndex];
    //       array[currentIndex] = array[randomIndex];
    //       array[randomIndex] = temporaryValue;
    //     }
      
    //     return array;
    // }

    // shuffleBag(){
    //     this.shuffle(this.tetriminoBag);
    // }

    draw(){
        var index = 0;
        var rnd = Math.random();
        var currentRate = 0.0;
        var oldRate = 0.0;
        for(var i = 0; i < this.spawnTable.length; i++){
            currentRate += this.spawnTable[i];
            if(rnd <= currentRate && rnd >= oldRate){
                index = i;
            }
            oldRate = currentRate;
        }        
        // this.history.push(index);
        this.modifyRate(index, 0.75); // lower rate of currently spawned tetromino
        return index;
    }

    sumChance(){
        var sum = 0.0;
        for(var i = 0; i < this.spawnTable.length; i++){
           sum += this.spawnTable[i];
        }
        return sum;
    }

    modifyRate(index,rate){

        // if(i == 1){
        //     rate =  rate * 0.3; // more I ?
        // }

        var rateDiff = this.spawnTable[index] * rate;
        
        var currentRate = this.spawnTable[index];
        var part = rateDiff / 6.0;
        for(var i = 0; i < this.spawnTable.length; i++){
            if(i != index){
                this.spawnTable[i] = this.spawnTable[i] + (rateDiff / 6);
            }
        }
        this.spawnTable[index] = this.spawnTable[index] - rateDiff;
    }

    getTetriminoByIndex(index){
        switch (index) {
            case 0: return new Tetrimino_O(this.game, this.playfield);
            case 1: return new Tetrimino_I(this.game, this.playfield);
            case 2: return new Tetrimino_T(this.game, this.playfield);
            case 3: return new Tetrimino_L(this.game, this.playfield);
            case 4: return new Tetrimino_J(this.game, this.playfield);
            case 5: return new Tetrimino_S(this.game, this.playfield);
            case 6: return new Tetrimino_Z(this.game, this.playfield);
        }
    }

    getNextTetrimino(game, playfield) {        
        var index = this.draw();
        return this.getTetriminoByIndex(index);
    }

    static getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    autoRepeatTimer() {
        this.autoRepeatTime += game.deltaTime;
        if (this.autoRepeatTime >= this.autoRepeatTimeMax) {
            this.autoRepeatTime = 0.0;
            this.autoRepeat = true;
        }

        this.movementTime += game.deltaTime;
        if (this.movementTime >= this.movementTimeMax) {
            this.movementTime = 0.0;
            this.allowAutoRepeatMovement = true;
        }
    }

    stopMovement() {
        this.startedMoving = false;
        this.autoRepeat = false;
        this.autoRepeatTime = 0.0;
    }

    moveLeft() {
        this.autoRepeatTimer();

        var allowMovement = !this.startedMoving || (this.autoRepeat && this.allowAutoRepeatMovement);
        if (allowMovement) {
            if (this.tetrimino != null && !this.tetrimino.isTranslationInvalid(0, -1) && !this.tetrimino.isMatrixTranslationInvalid(0, 1)) {
                this.tetrimino.translateRaw(0, -1);
                this.startedMoving = true;
                this.allowAutoRepeatMovement = false;
            }
        }
    }

    moveRight() {
        this.autoRepeatTimer();

        var allowMovement = !this.startedMoving || (this.autoRepeat && this.allowAutoRepeatMovement);
        if (allowMovement) {
            if (this.tetrimino != null && !this.tetrimino.isTranslationInvalid(0, 1) && !this.tetrimino.isMatrixTranslationInvalid(0, 1)) {
                this.tetrimino.translateRaw(0, 1);
                this.startedMoving = true;
                this.allowAutoRepeatMovement = false;
            }
        }
    }

    startSoftDrop() {
        this.isSoftDropping = true;
    }

    endSoftDrop() {
        this.isSoftDropping = false;
    }

    rotateClockwise() {
        if (!this.rotating) {
            this.tetrimino.rotateClockwise();
            this.rotating = true;
        }
    }

    rotateCounterClockwise() {
        if (!this.rotating) {
            this.tetrimino.rotateCounterClockwise();
            this.rotating = true;
        }
    }

    endRotate() {
        this.rotating = false;
    }
}