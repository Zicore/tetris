/*
* Types
* O = 0, Yellow
* I = 1, Light Blue
* T = 2, Purple
* L = 3, Orange
* J = 4, Dark Blue
* S = 5, Green
* Z = 6, Red
*/

const FACING_NORTH = 0;
const FACING_EAST = 1;
const FACING_SOUTH = 2;
const FACING_WEST = 3;

class Tetrimino extends Entity {

    constructor(game,playfield) {
        super();
        this.game = game;
        this.playfield = playfield;
        this.type = 0;
        this.locked = false;
        this.visible = false;
        this.row = 0;
        this.column = 0;
        this.facing = FACING_NORTH;
        this.entities = [
            new Block(this,true),
            new Block(this,true),
            new Block(this,true),
            new Block(this,true)
        ];

        this.setBlockStyle(this.getTetriminoStyle);
    }

    render(game, tFrame) {
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].render(game, tFrame);
        }
    }

    update(game, lastTick) {

    }

    static get FACING_NORTH() {
        return FACING_NORTH;
    }

    static get FACING_EAST() {
        return FACING_EAST;
    }

    static get FACING_SOUTH() {
        return FACING_SOUTH;
    }

    static get FACING_WEST() {
        return FACING_WEST;
    }

    setBlockStyle(val){
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].blockStyle = val;
        }
    }

    get getTetriminoStyle(){
        return new BlockStyle("#A0A0A0","#000000");
    }

    translateRaw(rows,columns){
        this.row += rows;
        this.column += columns;
    }

    translate(rows,columns){
        if(!this.isOutOfBounds()){
            this.translateRaw(rows,columns);
        }
    }

    isOutOfBounds(){
        for (var i = 0; i < this.entities.length; i++) {
            var e = this.entities[i];
            if(e.rowAbs < 0 || e.columnAbs < 0 || e.rowAbs >= Entity.Game.maxRows  - 1 || e.columnAbs >= Entity.Game.maxColumns - 1){
                return true;
            }
        }
        return false;
    }

    isTouchingGround(){
        for (var i = 0; i < this.entities.length; i++) {
            var e = this.entities[i];
            if(e.rowAbs < 0 || e.rowAbs >= Entity.Game.maxRows  - 1){
                return true;
            }
        }
        return false;
    }

    isTouchingCells(){
        return this.playfield.matrix.isTouchingCells(this);
    }
}

// O
class Tetrimino_O extends Tetrimino {
    constructor(game,playfield) {
        super(game,playfield);

        this.entities[0].row = 0;
        this.entities[0].column = 1;

        this.entities[1].row = 0;
        this.entities[1].column = 2;

        this.entities[2].row = 1;
        this.entities[2].column = 1;

        this.entities[3].row = 1;
        this.entities[3].column = 2;
    }

    render(game, tFrame) {
        var ctx = game.context;

        super.render(game, tFrame);
    }

    update(game, lastTick) {

    }

    get getTetriminoStyle(){
        return new BlockStyle("#FFFF00","#000000");
    }
}

// I
class Tetrimino_I extends Tetrimino {
    constructor(game,playfield) {
        super(game,playfield);

        this.entities[0].row = 1;
        this.entities[0].column = 0;

        this.entities[1].row = 1;
        this.entities[1].column = 1;

        this.entities[2].row = 1;
        this.entities[2].column = 2;

        this.entities[3].row = 1;
        this.entities[3].column = 3;
    }

    render(game, tFrame) {
        var ctx = game.context;

        super.render(game, tFrame);
    }

    update(game, lastTick) {

    }

    get getTetriminoStyle(){
        return new BlockStyle("#84e4ff","#000000");
    }
}

// T
class Tetrimino_T extends Tetrimino {
    constructor(game,playfield) {
        super(game,playfield);

        this.entities[0].row = 0;
        this.entities[0].column = 1;

        this.entities[1].row = 1;
        this.entities[1].column = 0;

        this.entities[2].row = 1;
        this.entities[2].column = 1;

        this.entities[3].row = 1;
        this.entities[3].column = 2;
    }

    render(game, tFrame) {
        var ctx = game.context;

        super.render(game, tFrame);
    }

    update(game, lastTick) {

    }

    get getTetriminoStyle(){
        return new BlockStyle("#ac00e0","#000000");
    }
}

// T
class Tetrimino_L extends Tetrimino {
    constructor(game,playfield) {
        super(game,playfield);

        this.entities[0].row = 0;
        this.entities[0].column = 2;

        this.entities[1].row = 1;
        this.entities[1].column = 0;

        this.entities[2].row = 1;
        this.entities[2].column = 1;

        this.entities[3].row = 1;
        this.entities[3].column = 2;
    }

    render(game, tFrame) {
        var ctx = game.context;
        super.render(game, tFrame);
    }

    update(game, lastTick) {

    }

    get getTetriminoStyle(){
        return new BlockStyle("#ff8c00","#000000");
    }
}

// J
class Tetrimino_J extends Tetrimino {
    constructor(game,playfield) {
        super(game,playfield);

        this.entities[0].row = 0;
        this.entities[0].column = 0;

        this.entities[1].row = 1;
        this.entities[1].column = 0;

        this.entities[2].row = 1;
        this.entities[2].column = 1;

        this.entities[3].row = 1;
        this.entities[3].column = 2;
    }

    render(game, tFrame) {
        var ctx = game.context;

        super.render(game, tFrame);
    }

    update(game, lastTick) {

    }

    get getTetriminoStyle(){
        return new BlockStyle("#0043d3","#000000");
    }
}

// S
class Tetrimino_S extends Tetrimino {
    constructor(game,playfield) {
        super(game,playfield);

        this.entities[0].row = 0;
        this.entities[0].column = 1;

        this.entities[1].row = 0;
        this.entities[1].column = 2;

        this.entities[2].row = 1;
        this.entities[2].column = 0;

        this.entities[3].row = 1;
        this.entities[3].column = 1;
    }

    render(game, tFrame) {
        var ctx = game.context;

        super.render(game, tFrame);
    }

    update(game, lastTick) {

    }

    get getTetriminoStyle(){
        return new BlockStyle("#00ba00","#000000");
    }
}

// Z
class Tetrimino_Z extends Tetrimino {
    constructor(game,playfield) {
        super(game,playfield);

        this.entities[0].row = 0;
        this.entities[0].column = 0;

        this.entities[1].row = 0;
        this.entities[1].column = 1;

        this.entities[2].row = 1;
        this.entities[2].column = 1;

        this.entities[3].row = 1;
        this.entities[3].column = 2;
    }

    render(game, tFrame) {
        var ctx = game.context;

        super.render(game, tFrame);
    }

    update(game, lastTick) {

    }

    get getTetriminoStyle(){
        return new BlockStyle("#ed0e0e","#000000");
    }
}

// 14a8ff