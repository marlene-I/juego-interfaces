import { Character } from "./Character.js";
import { CharacterLifes } from "./CharacterLifes.js";
export class Hero extends Character {
    constructor(gameContainer) {
        super();
        this.element = document.createElement('div');
        this.element.classList.add('character');
        this.gameContainer = gameContainer;
        this.gameContainer.appendChild(this.element);
        this.run();
        document.addEventListener("keydown", this);    
        this.lifes = new CharacterLifes();
        this.hurtAudio = new Audio('./assets/sounds/hurt.ogg');
        this.jumpAudio = new Audio('./assets/sounds/jump.wav');
    }

    handleEvent(e) {
        switch (e.type) {
            case "keydown":
                if(e.keyCode == 32){ // spacebar key
                    this.jump();
                }
                break;
            case "animationend":
                // hacer un switch para preguntar
                // por el nombre de la animación
                console.log(e);
                switch (e.animationName) {
                    case "jump":
                        this.element.removeEventListener("animationend", this);
                        this.run();
                        break;

                    default:
                        break;
                }
                break;

            default:
                break;
        }
    }

    run() {
        this.clear();
        this.element.classList.add("move-forward");
    }

    jump() {
        this.clear();
        this.element.classList.add("jump");
        this.element.addEventListener("animationend", this);
        this.jumpAudio.play();
    }

    clear() {
        this.element.classList.remove("move-forward");
    }

    checkColision(element) {}

    hurt() {
        this.lifes.remove(1);
        // TODO: Add animation of hurt hero
        this.hurtAudio.play();
        
        if (this.lifes.amount() == 0) {
            this.die();
            this.notifyObserver({name: "died", trigger: this });
        }
    }

    die(){
        // TODO: Add dead animation
    }

    update(event){
        switch (event.name) {
            case 'end-game':
                document.removeEventListener('keydown', this);
                this.element.remove();
                this.observers = [];
                break;
        
            default:
                break;
        }
    }

    addLife(){
        this.lifes.add(1);
        this.notifyObserver({name: 'gain-life'})
    }

}
