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
        this.setMatrixByFacing(this.facing);
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

    get darkTetriminoStyle(){
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

    isTranslationInvalid(rows,columns){
        for (var i = 0; i < this.entities.length; i++) {
            var e = this.entities[i];
            if(e.rowAbs + rows < 0 || e.columnAbs + columns < 0 || e.rowAbs + rows >= Entity.Game.maxRows || e.columnAbs + columns >= Entity.Game.maxColumns){
                return true;
            }
        }
        return false;
    }

    isMatrixTranslationInvalid(rows,columns){
        return this.playfield.matrix.isTranslationInvalid(this, rows, columns);
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

    getNextCounterClockwiseFacing(){
        var facing = this.facing - 1;
        if(facing < Tetrimino.FACING_NORTH){
            facing = Tetrimino.FACING_WEST;
        }
        return facing;
    }

    getNextClockwiseFacing(){
        var facing = this.facing + 1;
        if(facing > Tetrimino.FACING_WEST){
            facing = Tetrimino.FACING_NORTH;
        }
        return facing;
    }

    setMatrixByFacing(){
        
    }
    
    rotateClockwise(){
        var facing = this.getNextClockwiseFacing();
        this.setMatrixByFacing(facing);
        this.facing = facing;
    }

    rotateCounterClockwise(){
        var facing = this.getNextCounterClockwiseFacing();
        this.setMatrixByFacing(facing);
        this.facing = facing;
    }
}

// O
class Tetrimino_O extends Tetrimino {
    constructor(game,playfield) {
        super(game,playfield);
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

    get darkTetriminoStyle(){
        return new BlockStyle("#f9e20e","#000000");
    }

    rotateClockwise(){

    }

    rotateCounterClockwise(){

    }

    setMatrixByFacing(){
        this.entities[0].row = 0;
        this.entities[0].column = 1;

        this.entities[1].row = 0;
        this.entities[1].column = 2;

        this.entities[2].row = 1;
        this.entities[2].column = 1;

        this.entities[3].row = 1;
        this.entities[3].column = 2;
    }
}

// I
class Tetrimino_I extends Tetrimino {
    constructor(game,playfield) {
        super(game,playfield);        
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

    get darkTetriminoStyle(){
        return new BlockStyle("#53d1f4","#000000");
    }

    setMatrixByFacing(facing){
        if(facing == Tetrimino.FACING_NORTH){            
            this.entities[0].row = 1;
            this.entities[0].column = 0;

            this.entities[1].row = 1;
            this.entities[1].column = 1;

            this.entities[2].row = 1;
            this.entities[2].column = 2;

            this.entities[3].row = 1;
            this.entities[3].column = 3;
        }else if(facing == Tetrimino.FACING_EAST){
            this.entities[0].row = 0;
            this.entities[0].column = 2;

            this.entities[1].row = 1;
            this.entities[1].column = 2;

            this.entities[2].row = 2;
            this.entities[2].column = 2;

            this.entities[3].row = 3;
            this.entities[3].column = 2;
        }
        else if(facing == Tetrimino.FACING_SOUTH){
            this.entities[0].row = 2;
            this.entities[0].column = 0;

            this.entities[1].row = 2;
            this.entities[1].column = 1;

            this.entities[2].row = 2;
            this.entities[2].column = 2;

            this.entities[3].row = 2;
            this.entities[3].column = 3;
        }
        else if(facing == Tetrimino.FACING_WEST){
            this.entities[0].row = 0;
            this.entities[0].column = 1;

            this.entities[1].row = 1;
            this.entities[1].column = 1;

            this.entities[2].row = 2;
            this.entities[2].column = 1;

            this.entities[3].row = 3;
            this.entities[3].column = 1;
        }
    }
}

// T
class Tetrimino_T extends Tetrimino {
    constructor(game,playfield) {
        super(game,playfield);
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

    get darkTetriminoStyle(){
        return new BlockStyle("#780da5","#000000");
    }

    setMatrixByFacing(facing){
        if(facing == Tetrimino.FACING_NORTH){   
            this.entities[0].row = 0;
            this.entities[0].column = 1;

            this.entities[1].row = 1;
            this.entities[1].column = 0;

            this.entities[2].row = 1;
            this.entities[2].column = 1;

            this.entities[3].row = 1;
            this.entities[3].column = 2;
        }else if(facing == Tetrimino.FACING_EAST){
            this.entities[0].row = 0;
            this.entities[0].column = 1;

            this.entities[1].row = 1;
            this.entities[1].column = 1;

            this.entities[2].row = 1;
            this.entities[2].column = 2;

            this.entities[3].row = 2;
            this.entities[3].column = 1;
        }
        else if(facing == Tetrimino.FACING_SOUTH){            
            this.entities[0].row = 1;
            this.entities[0].column = 0;

            this.entities[1].row = 1;
            this.entities[1].column = 1;

            this.entities[2].row = 1;
            this.entities[2].column = 2;

            this.entities[3].row = 2;
            this.entities[3].column = 1;
        }
        else if(facing == Tetrimino.FACING_WEST){
            this.entities[0].row = 0;
            this.entities[0].column = 1;

            this.entities[1].row = 1;
            this.entities[1].column = 0;

            this.entities[2].row = 1;
            this.entities[2].column = 1;

            this.entities[3].row = 2;
            this.entities[3].column = 1;
        }
    }
}

// L
class Tetrimino_L extends Tetrimino {
    constructor(game,playfield) {
        super(game,playfield);
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

    get darkTetriminoStyle(){
        return new BlockStyle("#ff8c00","#000000");
    }

    setMatrixByFacing(facing){
        if(facing == Tetrimino.FACING_NORTH){
            this.entities[0].row = 0;
            this.entities[0].column = 2;

            this.entities[1].row = 1;
            this.entities[1].column = 0;

            this.entities[2].row = 1;
            this.entities[2].column = 1;

            this.entities[3].row = 1;
            this.entities[3].column = 2;
        }else if(facing == Tetrimino.FACING_EAST){
            this.entities[0].row = 0;
            this.entities[0].column = 1;

            this.entities[1].row = 1;
            this.entities[1].column = 1;

            this.entities[2].row = 2;
            this.entities[2].column = 1;

            this.entities[3].row = 2;
            this.entities[3].column = 2;
        }
        else if(facing == Tetrimino.FACING_SOUTH){
            this.entities[0].row = 1;
            this.entities[0].column = 0;

            this.entities[1].row = 1;
            this.entities[1].column = 1;

            this.entities[2].row = 1;
            this.entities[2].column = 2;

            this.entities[3].row = 2;
            this.entities[3].column = 0;
        }
        else if(facing == Tetrimino.FACING_WEST){
            this.entities[0].row = 0;
            this.entities[0].column = 0;

            this.entities[1].row = 0;
            this.entities[1].column = 1;

            this.entities[2].row = 1;
            this.entities[2].column = 1;

            this.entities[3].row = 2;
            this.entities[3].column = 1;
        }
    }
}

// J
class Tetrimino_J extends Tetrimino {
    constructor(game,playfield) {
        super(game,playfield);
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

    get darkTetriminoStyle(){
        return new BlockStyle("#0043d3","#000000");
    }

    setMatrixByFacing(facing){
        if(facing == Tetrimino.FACING_NORTH){
            this.entities[0].row = 0;
            this.entities[0].column = 0;

            this.entities[1].row = 1;
            this.entities[1].column = 0;

            this.entities[2].row = 1;
            this.entities[2].column = 1;

            this.entities[3].row = 1;
            this.entities[3].column = 2;
        }else if(facing == Tetrimino.FACING_EAST){
            this.entities[0].row = 0;
            this.entities[0].column = 1;

            this.entities[1].row = 0;
            this.entities[1].column = 2;

            this.entities[2].row = 1;
            this.entities[2].column = 1;

            this.entities[3].row = 2;
            this.entities[3].column = 1;
        }
        else if(facing == Tetrimino.FACING_SOUTH){
            this.entities[0].row = 1;
            this.entities[0].column = 0;

            this.entities[1].row = 1;
            this.entities[1].column = 1;

            this.entities[2].row = 1;
            this.entities[2].column = 2;

            this.entities[3].row = 2;
            this.entities[3].column = 2;
        }
        else if(facing == Tetrimino.FACING_WEST){
            this.entities[0].row = 0;
            this.entities[0].column = 1;

            this.entities[1].row = 1;
            this.entities[1].column = 1;

            this.entities[2].row = 2;
            this.entities[2].column = 0;

            this.entities[3].row = 2;
            this.entities[3].column = 1;
        }
    }
}

// S
class Tetrimino_S extends Tetrimino {
    constructor(game,playfield) {
        super(game,playfield);
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

    get darkTetriminoStyle(){
        return new BlockStyle("#00ba00","#000000");
    }

    setMatrixByFacing(facing){
        if(facing == Tetrimino.FACING_NORTH){            
            this.entities[0].row = 0;
            this.entities[0].column = 1;

            this.entities[1].row = 0;
            this.entities[1].column = 2;

            this.entities[2].row = 1;
            this.entities[2].column = 0;

            this.entities[3].row = 1;
            this.entities[3].column = 1;
        }else if(facing == Tetrimino.FACING_EAST){
            this.entities[0].row = 0;
            this.entities[0].column = 1;

            this.entities[1].row = 0;
            this.entities[1].column = 1;

            this.entities[2].row = 1;
            this.entities[2].column = 2;

            this.entities[3].row = 2;
            this.entities[3].column = 2;
        }
        else if(facing == Tetrimino.FACING_SOUTH){
            this.entities[0].row = 1;
            this.entities[0].column = 1;

            this.entities[1].row = 1;
            this.entities[1].column = 2;

            this.entities[2].row = 2;
            this.entities[2].column = 0;

            this.entities[3].row = 2;
            this.entities[3].column = 1;
        }
        else if(facing == Tetrimino.FACING_WEST){
            this.entities[0].row = 0;
            this.entities[0].column = 0;

            this.entities[1].row = 1;
            this.entities[1].column = 0;

            this.entities[2].row = 1;
            this.entities[2].column = 1;

            this.entities[3].row = 2;
            this.entities[3].column = 1;
        }
    }
}

// Z
class Tetrimino_Z extends Tetrimino {
    constructor(game,playfield) {
        super(game,playfield);
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

    get darkTetriminoStyle(){
        return new BlockStyle("#ed0e0e","#000000");
    }

    setMatrixByFacing(facing){
        if(facing == Tetrimino.FACING_NORTH){            
            this.entities[0].row = 0;
            this.entities[0].column = 0;

            this.entities[1].row = 0;
            this.entities[1].column = 1;

            this.entities[2].row = 1;
            this.entities[2].column = 1;

            this.entities[3].row = 1;
            this.entities[3].column = 2;
        }else if(facing == Tetrimino.FACING_EAST){
            this.entities[0].row = 0;
            this.entities[0].column = 2;

            this.entities[1].row = 1;
            this.entities[1].column = 1;

            this.entities[2].row = 1;
            this.entities[2].column = 2;

            this.entities[3].row = 2;
            this.entities[3].column = 1;
        }
        else if(facing == Tetrimino.FACING_SOUTH){
            this.entities[0].row = 1;
            this.entities[0].column = 0;

            this.entities[1].row = 1;
            this.entities[1].column = 1;

            this.entities[2].row = 2;
            this.entities[2].column = 1;

            this.entities[3].row = 2;
            this.entities[3].column = 2;
        }
        else if(facing == Tetrimino.FACING_WEST){
            this.entities[0].row = 0;
            this.entities[0].column = 1;

            this.entities[1].row = 1;
            this.entities[1].column = 0;

            this.entities[2].row = 1;
            this.entities[2].column = 1;

            this.entities[3].row = 2;
            this.entities[3].column = 0;
        }
    }
}