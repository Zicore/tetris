class Matrix extends Entity {
    constructor(game, playfield) {
        super();
        this.playfield = playfield;
        this.game = game;
        this.translationRequired = false;
        this.hitlist = [];
        this.rowsToClear = 0;
        this.rowList = [];
        this.cells = [];

        this.cells = this.createMatrix();

        this.isAnimating = false;
        this.animateSmallTime = 0.0;
        this.animateSmallTimeMax = 0.06;
        this.animationState = 0;
    }

    createMatrix() {
        var cells = [];

        for (var r = 0; r < this.game.maxRows; r++) {
            var row = [];
            for (var c = 0; c < this.game.maxColumns; c++) {
                row.push(new Cell(this.game, r, c));
            }
            cells.push(row);
        }

        return cells;
    }

    render(game, tFrame) {
        for (var r = 0; r < this.cells.length; r++) {
            var row = this.cells[r];
            for (var c = 0; c < row.length; c++) {
                var cell = row[c];
                cell.renderOffset(this.playfield.x,this.playfield.y,game, tFrame);
            }
        }
    }

    add(tetrimino) {
        for (var i = 0; i < tetrimino.entities.length; i++) {
            var block = tetrimino.entities[i];
            if(block.rowAbs >= 0 && block.rowAbs < this.game.maxRows && block.columnAbs >= 0 && block.columnAbs < this.game.maxColumns){
                this.cells[block.rowAbs][block.columnAbs].applyBlock(tetrimino, block);
            }
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
        if (!this.isAnimating) {
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
                            this.rowList.push(r);
                        }
                    }
                }
            }
            this.isAnimating = this.hitlist.length > 0;
        }
    }

    animateHitlist() {
        if (this.isAnimating) {
            this.animateSmallTime += this.game.deltaTime;
            if (this.animateSmallTime >= this.animateSmallTimeMax) {
                this.animateSmallTime = 0.0;
                this.animationState++;
            }

            for (var i = 0; i < this.hitlist.length; i++) {
                this.hitlist[i].block.visible = this.animationState % 2 == 0; // invisible on every second step to blink
            }

            if (this.animationState >= 6) {
                this.isAnimating = false;
                this.animationState = 0;
            }
        }
    }

    clearHitlist() {
        if (!this.isAnimating) {
            if (this.hitlist.length > 0) {
                for (var i = 0; i < this.hitlist.length; i++) {
                    this.hitlist[i].kill();
                }
                this.translationRequired = true;
            }
        }
    }

    isRowEmpty(row) {
        var emptyCells = 0;
        for (var j = 0; j < this.cells[row].length; j++) {
            if (!this.cells[row][j].visible) {
                emptyCells++;
            }
        }
        return emptyCells >= this.game.maxColumns;
    }

    calculateEmptyRowsBelow(index) {
        var rows = 0;
        var lastIndex = index;
        for (var i = index; i < this.game.maxRows; i++) {
            if (this.isRowEmpty(i)) {
                var diff = i - lastIndex;
                if (diff >= 1 || diff == 0) {
                    rows++;
                }
                lastIndex = i;
            }
        }
        return rows;
    }

    translateMatrix() {
        if (!this.isAnimating) {
            if (this.translationRequired) {
                var minos = [];
                for (var r = 0; r < this.cells.length; r++) {
                    var row = this.cells[r];
                    for (var c = 0; c < row.length; c++) {
                        var cell = row[c];
                        if (cell.visible) {
                            minos.push(cell);
                        }
                    }
                }

                var cells = this.createMatrix(); // empty matrix

                for (var j = 0; j < minos.length; j++) {
                    var mino = minos[j];
                    var rows = this.calculateEmptyRowsBelow(mino.row);

                    var cell = cells[mino.row + rows][mino.column];
                    cell.block = mino.block;
                    cell.block.parent = cell;
                }

                this.cells = cells;

                this.translationRequired = false;
                this.rowsToClear = 0;
                this.rowList.length = 0;
                this.hitlist.length = 0;
            }
        }
    }

    rowIndex(row) {
        if (row < 0) {
            return this.game.maxRows + row;
        } else {
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

    renderOffset(x,y,game, tFrame) {
        this.block.renderOffset(x,y,game, tFrame);
    }

    applyBlock(tetrimino, block) {
        //this.row = block.rowAbs;
        //this.column = block.columnAbs;
        this.block.blockStyle = tetrimino.darkTetriminoStyle;
        this.block.visible = true;
        this.block.parent = this;
    }

    get visible() {
        return this.block.visible;
    }

    kill() {
        this.block.visible = false;
    }
}