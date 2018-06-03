class Playfield extends Entity {
    constructor(game, x, y, width, height) {
        super();
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.player = new Player(game, this);
        this.matrix = new Matrix(game, this);
    }

    initialize(game) {

    }

    render(game, tFrame) {
        var w = this.width;
        var h = this.height;
        var blockSize = this.game.blockSize;
        var ctx = game.context;
        var columns = this.game.maxColumns + 1;
        var rows = this.game.maxRows + 1;


        ctx.lineWidth = 1;
        ctx.strokeStyle = "#A0A0A0";

        ctx.beginPath();

        for (var i = 0; i < columns; i++) {
            var rx = i * blockSize + 0.5 + this.x;
            ctx.moveTo(rx, 0.5 + this.y);
            ctx.lineTo(rx, h + 0.5 + this.y);
        }

        for (var i = 0; i < rows; i++) {
            var ry = i * blockSize + 0.5 + this.y;
            ctx.moveTo(0.5 + this.x, ry);
            ctx.lineTo(w + 0.5 + this.x, ry);
        }

        ctx.stroke();

        for(var i = 0; i < this.player.nextQueue.length; i++){
            var tetrimono = this.player.nextQueue[i];
            tetrimono.renderOffset(275, 60 + ((blockSize - 1) * 3) * i,game, tFrame);
        }

        for(var i = 0; i < this.player.tetriminos.length; i++){
            var tetrimono = this.player.tetriminos[i];
            tetrimono.renderOffset(390, 60 + ((blockSize - 1) * 3) * i,game, tFrame);

            var rate = this.player.spawnTable[i] * 100.0;
            var chanceString = "Chance: " + rate.toFixed(2) + "%";
            ctx.font = "14px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(chanceString, 380, 56 + ((blockSize - 1) * 3) * i);
        }

        // var text = "Sum: " + this.player.sumChance().toFixed(2);
        // ctx.font = "14px Arial";
        // ctx.fillStyle = "black";
        // ctx.fillText(text, 380, 600);

        this.matrix.render(game, tFrame);
        this.player.render(game, tFrame);
    }

    update(game, lastTick) {
        this.player.update(game, lastTick);
        this.matrix.checkPattern();
        this.matrix.animateHitlist();
        this.matrix.clearHitlist();
        this.matrix.translateMatrix();        
    }
}