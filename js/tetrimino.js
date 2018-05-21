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

    constructor() {
        super();
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

    get color(){
        return "#";
    }
}

// O
class Tetrimino_O extends Tetrimino {
    constructor() {
        super();

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

        ctx.fillStyle = '#FFFF00';
        ctx.strokeStyle = '#000000';

        super.render(game, tFrame);
    }

    update(game, lastTick) {

    }
}

// I
class Tetrimino_I extends Tetrimino {
    constructor() {
        super();

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

        ctx.fillStyle = '#84e4ff';
        ctx.strokeStyle = '#000000';

        super.render(game, tFrame);
    }

    update(game, lastTick) {

    }
}

// T
class Tetrimino_T extends Tetrimino {
    constructor() {
        super();

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

        ctx.fillStyle = '#ac00e0';
        ctx.strokeStyle = '#000000';

        super.render(game, tFrame);
    }

    update(game, lastTick) {

    }
}

// T
class Tetrimino_L extends Tetrimino {
    constructor() {
        super();

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

        ctx.fillStyle = '#ff8c00';
        ctx.strokeStyle = '#000000';

        super.render(game, tFrame);
    }

    update(game, lastTick) {

    }
}

// J
class Tetrimino_J extends Tetrimino {
    constructor() {
        super();

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

        ctx.fillStyle = '#0043d3';
        ctx.strokeStyle = '#000000';

        super.render(game, tFrame);
    }

    update(game, lastTick) {

    }
}

// S
class Tetrimino_S extends Tetrimino {
    constructor() {
        super();

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

        ctx.fillStyle = '#00ba00';
        ctx.strokeStyle = '#000000';

        super.render(game, tFrame);
    }

    update(game, lastTick) {

    }
}

// Z
class Tetrimino_Z extends Tetrimino {
    constructor() {
        super();

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

        ctx.fillStyle = '#ed0e0e';
        ctx.strokeStyle = '#000000';

        super.render(game, tFrame);
    }

    update(game, lastTick) {

    }
}

// 14a8ff