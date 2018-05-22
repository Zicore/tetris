class Player extends Entity {
    constructor(game, playfield) {
        super();
        this.game = game;
        this.playfield = playfield;
        this.tetrimino = new Tetrimino_J();
        this.requireGravityUpdate = false;
        this.timeToUpdate = 0.0;
        this.locking = false;
        this.lockTime = 0.0;
        this.lockTimeMax = 0.5;
    }

    render(game, tFrame) {
        super.render(game, tFrame);

        if (this.tetrimino !== null && !this.tetrimino.locked) {
            this.tetrimino.render(game, tFrame);
        }
    }

    update(game, lastTick) {
        super.update(game, lastTick);
        //this.tetrimino.translate(0,0);
        if (!this.tetrimino.locked) {
            this.timeToUpdate += game.deltaTime;
            if (this.timeToUpdate >= game.secondsPerLine) {
                this.timeToUpdate = 0.0;
                if (!this.tetrimino.isTouchingGround()) {
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
                    this.tetrimino.locked = true;
                    this.locking = false;
                }
            }
        }
    }
}