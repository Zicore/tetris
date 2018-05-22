class Player extends Entity{
    constructor(){
        super();
        this.tetrimino = new Tetrimino_J();
        this.requireGravityUpdate = false;
        this.timeToUpdate = 0.0;
    }

    render(game,tFrame){
        super.render(game,tFrame);

        if(this.tetrimino !== null){
            this.tetrimino.render(game,tFrame);
        }
    }

    update(game,lastTick){
        super.update(game,lastTick);
        //this.tetrimino.translate(0,0);
        this.timeToUpdate += game.deltaTime;
        if(this.timeToUpdate >= game.secondsPerLine){
            this.timeToUpdate = 0.0;
            this.tetrimino.translate(1,0);
        }
    }
}