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
        this.movementTimeMax = 0.1;
        this.isSoftDropping = false;

        this.startedMoving = false;
        this.autoRepeat = false;
        this.autoRepeatTime = 0.0;
        this.autoRepeatTimeMax = 0.2;

        this.rotating = false;
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
                        this.spawnNextTetrimono();
                        this.locking = false;
                    }
                }
            }
        }
    }

    start() {
        this.spawnNextTetrimono();
    }

    spawnNextTetrimono() {
        this.tetrimino = this.getNextTetrimino(this.game, this.playfield);
        this.tetrimino.column = 3;
    }

    getNextTetrimino(game, playfield) {
        // return new Tetrimino_I(game, playfield);
        var index = Player.getRandomInteger(0, 6);
        switch (index) {
            case 0: return new Tetrimino_O(game, playfield);
            case 1: return new Tetrimino_I(game, playfield);
            case 2: return new Tetrimino_T(game, playfield);
            case 3: return new Tetrimino_L(game, playfield);
            case 4: return new Tetrimino_J(game, playfield);
            case 5: return new Tetrimino_S(game, playfield);
            case 6: return new Tetrimino_Z(game, playfield);
        }
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