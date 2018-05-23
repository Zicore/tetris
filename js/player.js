class Player extends Entity {
    constructor(game, playfield) {
        super();
        this.game = game;
        this.playfield = playfield;
        this.tetrimino = new Tetrimino_O(game, playfield);
        this.requireGravityUpdate = false;

        this.timeToUpdate = 0.0;
        this.locking = false;
        this.lockTime = 0.0;
        this.lockTimeMax = 0.25;

        this.movementTime = 0.0;
        this.movementTimeMax = 0.1;
        this.isSoftDropping = false;

        this.startedMoving = false;
        this.autoRepeat = false;
        this.autoRepeatTime = 0.0;
        this.autoRepeatTimeMax = 0.2;
    }

    render(game, tFrame) {
        super.render(game, tFrame);

        if (this.tetrimino !== null && !this.tetrimino.locked) {
            this.tetrimino.render(game, tFrame);
        }
    }

    update(game, lastTick) {
        super.update(game, lastTick);

        if (!this.playfield.matrix.isAnimating) {
            var secondsPerLine = game.secondsPerLine;
            if (this.isSoftDropping) {
                secondsPerLine = secondsPerLine / 20.0;
            }
            //this.tetrimino.translate(0,0);
            if (this.tetrimino != null) {
                this.timeToUpdate += game.deltaTime;
                if (this.timeToUpdate >= secondsPerLine) {
                    this.timeToUpdate = 0.0;
                    if (!this.tetrimino.isTouchingGround() && !this.tetrimino.isTouchingCells()) {
                        this.locking = false;
                        this.tetrimino.translateRaw(1, 0);
                    } else {
                        this.locking = true;
                    }
                }

                if (this.locking) {
                    this.lockTime += game.deltaTime;
                    if (this.lockTime >= this.lockTimeMax) {
                        this.lockTime = 0.0;
                        this.playfield.matrix.add(this.tetrimino);
                        this.tetrimino = new Tetrimino_I(this.game, this.playfield);
                        this.tetrimino.column = 3;
                        this.locking = false;
                    }
                }
            }

                      
        }
    }

    autoRepeatTimer(){
        this.autoRepeatTime += game.deltaTime;
        if(this.autoRepeatTime >= this.autoRepeatTimeMax){
            this.autoRepeatTime = 0.0;
            this.autoRepeat = true;
        }

        this.movementTime += game.deltaTime;
        if (this.movementTime >= this.movementTimeMax) {
            this.movementTime = 0.0;
            this.allowAutoRepeatMovement = true;
        }  
    }

    stopMovement(){
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

        var allowMovement = !this.startedMoving || (this.autoRepeat&& this.allowAutoRepeatMovement);
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
}