class Score{
    constructor(){
        this.value = 0;
        this.level = 1;
        this.backToCounter = 0;
    }

    addScore(value){
        this.value = this.value + value * this.level;
        if(this.backToCounter > 1){
            this.value += value * 0.5;
        }
    }

    addScoreByRows(rows){
        switch(rows){
            case 1 : this.addSingle(); break;
            case 2 : this.addDouble(); break;
            case 3 : this.addTriple(); break;
            case 4 : this.addTetris(); break;
            default : break;
        }
    }

    addSingle(){
        this.resetBackToBack();
        this.addScore(100);        
    }

    addDouble(){
        this.resetBackToBack();
        this.addScore(300);        
    }

    addTriple(){
        this.resetBackToBack();
        this.addScore(500);        
    }
    
    addTetris(){
        this.backToCounter++;
        this.addScore(800);        
    }

    addSoftDrop(lines){
        this.value += lines * 1;
    }
    
    reset(){
        this.score = 0;
    }

    resetBackToBack(){
        this.backToCounter = 0;
    }
}