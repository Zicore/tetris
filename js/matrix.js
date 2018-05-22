class Matrix extends Entity {
    constructor(game, playfield) {
        super();
        this.playfield = playfield;
        this.game = game;
        this.translationRequired = false;
        this.hitlist = [];
        this.rowsToClear = 0;
        this.cells = [];

        for (var r = 0; r < game.maxRows; r++) {
            var row = [];
            for (var c = 0; c < game.maxColumns; c++) {
                row.push(new Cell(game, r, c));
            }
            this.cells.push(row);
        }
    }

    render(game, tFrame) {
        for (var r = 0; r < this.cells.length; r++) {
            var row = this.cells[r];
            for (var c = 0; c < row.length; c++) {
                var cell = row[c];
                cell.render(game, tFrame)
            }
        }
    }

    add(tetrimino) {
        for (var i = 0; i < tetrimino.entities.length; i++) {
            var block = tetrimino.entities[i];
            this.cells[block.rowAbs][block.columnAbs].applyBlock(tetrimino, block);
        }
    }

    isTouchingCells(tetrimino) {
        for (var r = 0; r < this.cells.length; r++) {
            var row = this.cells[r];
            for (var c = 0; c < row.length; c++) {
                var cell = row[c];
                if (cell.visible) {
                    for (var i = 0; i < tetrimino.entities.length; i++) {
                        var block = tetrimino.entities[i];
                        if (block.columnAbs == cell.column && block.rowAbs + 1 == cell.row) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    isTranslationInvalid(tetrimino, rows, columns) {
        for (var r = 0; r < this.cells.length; r++) {
            var row = this.cells[r];
            for (var c = 0; c < row.length; c++) {
                var cell = row[c];
                if (cell.visible) {
                    for (var i = 0; i < tetrimino.entities.length; i++) {
                        var block = tetrimino.entities[i];
                        if (block.rowAbs == cell.row && (block.columnAbs + columns == cell.column || block.columnAbs - columns == cell.column)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    checkPattern() {
        for (var r = 0; r < this.cells.length; r++) {
            var row = this.cells[r];
            var rowCompleteIndex = 0;
            var tempHitlist = [];
            for (var c = 0; c < row.length; c++) {
                var cell = row[c];
                if (cell.visible) {
                    rowCompleteIndex++;
                    tempHitlist.push(cell);
                    if (rowCompleteIndex == this.game.maxColumns) {
                        for (var i = 0; i < tempHitlist.length; i++) {
                            this.hitlist.push(tempHitlist[i]);
                        }
                        this.rowsToClear++;
                    }
                }
            }
        }
    }

    clearHitlist() {
        if (this.hitlist.length > 0) {
            for (var i = 0; i < this.hitlist.length; i++) {
                this.hitlist[i].kill();
            }
            this.translationRequired = true;
        }
    }

    translateMatrix() {
        if (this.translationRequired) {
            for (var r = 0; r < this.cells.length; r++) {
                var row = this.cells[r];
                for (var c = 0; c < row.length; c++) {
                    var cell = row[c];
                    //cell.row = (cell.row + this.rowsToClear) % this.game.maxRows;
                    var nextIndex = this.rowIndex(r+1);
                    var block = this.cells[prevIndex][c].block;
                    if(cell.visible){
                        block.blockStyle = cell.block.blockStyle;
                        block.visible = cell.block.visible;
                    }                    
                }
            }
            this.translationRequired = false;
            this.rowsToClear = 0;
            this.hitlist.length = 0;
        }
    }

    rowIndex(row){
        if(row < 0){
            return this.game.maxRows + row;
        }else{
            return row % this.game.maxRows;
        }
    }
}

class Cell extends Entity {
    constructor(game, row, column) {
        super();
        this.row = row;
        this.column = column;
        this.game = game;
        this.block = new Block(this, false);
    }

    render(game, tFrame) {
        this.block.render(game, tFrame);
    }

    applyBlock(tetrimino, block) {
        //this.row = block.rowAbs;
        //this.column = block.columnAbs;
        this.block.blockStyle = tetrimino.darkTetriminoStyle;
        this.block.visible = true;
    }

    get visible() {
        return this.block.visible;
    }

    kill() {
        this.block.visible = false;
    }
}