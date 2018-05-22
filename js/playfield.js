class Playfield extends Entity {
    constructor(game,width, height) {
        super();
        this.game = game;
        this.width = width;
        this.height = height;
        this.player = new Player(game,this);
        this.matrix = new Matrix(game,this);
    }

    initialize(game) {

    }

    render(game, tFrame) {
        var w = game.canvas.width;
        var h = game.canvas.height;
        var blockSize = game.blockSize;
        var ctx = game.context;
        var columns = (w / blockSize);
        var rows = (h / blockSize);

        ctx.lineWidth = 1;
        ctx.strokeStyle = "#A0A0A0";

        ctx.beginPath();

        for (var i = 1; i < columns; i++) {
            var x = i * blockSize + 0.5;
            ctx.moveTo(x, 0.5);
            ctx.lineTo(x, h + 0.5);
        }

        for (var i = 1; i < rows; i++) {
            var y = i * blockSize + 0.5;
            ctx.moveTo(0.5, y);
            ctx.lineTo(w + 0.5, y);
        }

        ctx.stroke();

        this.matrix.render(game,tFrame);
        this.player.render(game,tFrame);
    }

    update(game, lastTick) {
        this.player.update(game,lastTick);
    }
}