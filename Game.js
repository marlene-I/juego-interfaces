export class Game{
    constructor (){
        if(Game.instance) {
            return Game.instance;
        }

        Game.instance = this;

        
    }

    startLoop(){
        setInterval(() => {
            
        }, 50);
    }
}