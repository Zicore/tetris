class Matrix extends Entity {
    constructor(game,playfield) {
        super();
        this.playfield = playfield;
        this.game = game;
        this.cells = [];

        for (var r = 0; r < game.maxRows; r++) {
            var row = [];            
            for (var c = 0; c < game.maxColumns; c++) {
                row.push(new Cell(game,r,c));
            }
            this.cells.push(row);
        }
    }

    render(game,tFrame){
        for (var r = 0; r < this.cells.length; r++) {
            var row = this.cells[r];
            for (var c = 0; c < row.length; c++) {
                var cell = row[c];
                cell.render(game,tFrame)
            }
        }
    }

    add(tetrimino){
        for(var i = 0; i < tetrimino.entities.length; i++){
            var block = tetrimino.entities[i];
            this.cells[block.rowAbs][block.columnAbs].applyBlock(block);
        }
    }

    isTouchingCells(tetrimino){
        for (var r = 0; r < this.cells.length; r++) {
            var row = this.cells[r];
            for (var c = 0; c < row.length; c++) {
                var cell = row[c];
                if(cell.visible){
                    for(var i = 0; i < tetrimino.entities.length; i++){
                        var block = tetrimino.entities[i];
                        if(block.columnAbs == cell.column && block.rowAbs + 1 >= cell.row){
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
}

class Cell extends Entity {
    constructor(game,row,column) {
        super();
        this.row = row;
        this.column = column;
        this.game = game;
        this.block = new Block(this, false);
    }

    render(game,tFrame){
        this.block.render(game,tFrame);
    }

    applyBlock(block){
        this.row = block.rowAbs;
        this.column = block.columnAbs;
        this.block.blockStyle = block.blockStyle;
        //this.block.parent = block.parent;
        this.block.visible = true;
    }

    get visible(){
        return this.block.visible;
    }
}