class Block extends Entity {
    constructor(parent,visible) {
        super();
        this.parent = parent;
        this.locked = false;
        this.visible = visible;
        this.row = 0;
        this.column = 0;
    }

    render(game, tFrame) {
        var w = game.canvas.width;
        var h = game.canvas.height;
        var blockSize = game.blockSize;
        var ctx = game.context;
        
        ctx.lineWidth = 2;
        if (this.visible) {
            var x = game.colToX(this.column + this.parent.column);
            var y = game.rowToY(this.row + this.parent.row);
            ctx.fillRect(x, y, blockSize, blockSize);
            ctx.strokeRect(x, y, blockSize, blockSize);
        }
    }

    update(game, lastTick) {

    }
}