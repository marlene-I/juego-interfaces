import { Observable } from "./Observable.js";

export class GameMenu extends Observable{

    constructor(){
        super();
        this.container = document.getElementById('game-menu');
        this.container.style.display = 'flex';
        this.playButton = document.getElementById('play')
        this.playButton.addEventListener('click', this);
        this.howToPlayButton = document.getElementById('how-to-play')
        this.howToPlayButton.addEventListener('click', this);
        document.addEventListener('mousemove', this)
        this.gameTitle = document.getElementById('game-title');
        if(!this.howToData){
            this.createHowToExplanation();
        }
        
    }

    handleEvent(e){
        switch (e.type) {
            case 'click':
                switch (e.target.id) {
                    case 'how-to-play':
                        this.hideButtons();
                        this.attachExplanation();
                        document.addEventListener('keydown', this)
                        break;

                    case 'play':
                        console.log('startgame');
                        this.container.style.display = 'none';
                        this.notifyObserver({name: 'start-game'})
                        break;
                
                    default:
                        break;
                }
                break;
            case 'mousemove':
                // not working because browser does not allow to play before user interaction
                this.backgroundAudio = new Audio('./assets/sounds/sci_fi_platformer04_main_loop.ogg');
                this.backgroundAudio.play();        
                
                document.removeEventListener('mousemove', this);
                
            case 'keydown':
                if(e.keyCode == 27 ){ //esc key
                    this.container.innerHTML = "";
                    this.container.style.flexDirection = 'row';

                    document.removeEventListener('keydown', this);
                    this.addButtons();
                }
                break;        
                
            default:
                break;
        }
    }

    createHowToExplanation(){
        console.log("adding");
        this.howToData = null;
        this.howToData = document.createElement('p');
        this.howToData.innerHTML = `<br><br>Bienvenido a esta aventura guerrero. <br><br>
        Presiona la tecla Space para saltar y librarte de los tipos malos.<br><br>
        Recolecta corazones para ganar puntos y completar la misión.<br><br>
                                        Buena suerte guerrero!`
        this.howToData.style.fontSize = 'large';

        
        
        this.goBack = document.createElement('p');
        this.goBack.style.fontSize = 'x-large';
        this.goBack.innerHTML = 'Presiona la tecla Esc para volver al menú principal.'
    }

    attachExplanation(){
        this.container.style.flexDirection = 'column';
        this.container.appendChild(this.howToData);
        this.container.appendChild(this.goBack);
    }

    hideButtons(){
        this.playButton.remove();
        this.howToPlayButton.remove();
        this.gameTitle.remove();
    }

    addButtons(){
        this.container.appendChild(this.gameTitle)
        this.container.appendChild(this.howToPlayButton)
        this.container.appendChild(this.playButton)
    }
    

}