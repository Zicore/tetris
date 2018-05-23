class BlockStyle {
    constructor(fillStyle,strokeStyle){
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
        this.animate = false;
    }
}

class Block extends Entity {
    constructor(parent,visible) {
        super();
        this.parent = parent;
        this.locked = false;
        this.visible = visible;
        this.row = 0;
        this.column = 0;
        this.blockStyle = new BlockStyle('#000000', '#AAC0A0');
    }

    render(game, tFrame) {
        if (this.visible) {
            var ctx = game.context;
            var w = game.canvas.width;
            var h = game.canvas.height;
            var blockSize = game.blockSize;
                        
            ctx.lineWidth = 1;

            // if(this.animate){
            //     ctx.fillStyle = '#FFFFFF';
            //     ctx.strokeStyle = '#FFFFFF';
            // }else{
                ctx.fillStyle = this.blockStyle.fillStyle;
                ctx.strokeStyle = this.blockStyle.strokeStyle;
            // }

            var x = this.x;
            var y = this.y;
            ctx.fillRect(x, y, blockSize, blockSize);
            ctx.strokeRect(x, y, blockSize, blockSize);
        }
    }

    update(game, lastTick) {

    }

    get columnAbs(){
        return this.column + this.parent.column;
    }

    get rowAbs(){
        return this.row + this.parent.row;
    }

    get x(){
        return game.colToX(this.column + this.parent.column);
    }

    get y(){
        return game.rowToY(this.row + this.parent.row);
    }
}