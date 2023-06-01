export class Score{ 
    constructor(){ 
        this.element = document.querySelector('.score');
        this.score = 0;
        this.renderScore();
    }

    update(event){
        console.log('event', event)
        switch (event.name) {
            case 'gain-life':
                    this.addScore(100);
                break;
            default:
                break;
        }
    };

    addScore(amount){
        this.score += amount;
        this.renderScore();
    }
    sustractScore(amount){
        this.score -= amount;
        this.renderScore();
    }

    renderScore(){
        this.element.innerHTML = this.score;
    }
}