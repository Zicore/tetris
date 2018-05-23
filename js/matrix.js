class Matrix extends Entity {
    constructor(game, playfield) {
        super();
        this.playfield = playfield;
        this.game = game;
        this.translationRequired = false;
        this.hitlist = [];
        this.rowsToClear = 0;
        this.cells = [];

        this.createMatrix();

        this.isAnimating = false;
        this.animateSmallTime = 0.0;
        this.animateSmallTimeMax = 0.06;
        this.animationState = 0;
    }

    createMatrix() {
        this.cells = [];

        for (var r = 0; r < this.game.maxRows; r++) {
            var row = [];
            for (var c = 0; c < this.game.maxColumns; c++) {
                row.push(new Cell(this.game, r, c));
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
            
            if(this.animationState >= 6){
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

                this.createMatrix(); // empty matrix

                for (var r = 0; r < this.cells.length; r++) {
                    var row = this.cells[r];
                    for (var c = 0; c < row.length; c++) {
                        var cell = row[c];
                        for (var i = 0; i < minos.length; i++) {
                            var translatedCell = minos[i];
                            if (translatedCell.row + this.rowsToClear == cell.row && translatedCell.column == cell.column) {
                                cell.block = translatedCell.block;
                                cell.block.parent = cell;
                            }
                        }
                    }
                }

                this.translationRequired = false;
                this.rowsToClear = 0;
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

    render(game, tFrame) {
        this.block.render(game, tFrame);
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