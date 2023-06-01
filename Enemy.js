import { Character } from "./Character.js";

export class Enemy extends Character {
    constructor() {
        super();
        this.create();
    }

    create(){
        this.element = document.createElement("div");
        this.element.classList.add("enemy");
    }

    attachTo(container) {
        this.container = container;
        container.appendChild(this.element);
        this.element.addEventListener("animationend", this);
    }

    handleEvent(e) {
        switch (e.type) {
            case "animationend":
                switch (e.animationName) {
                    case "right-left-move":
                        this.reset();
                        break;

                    default:
                        break;
                }

                break;

            default:
                break;
        }
    }

    reset() {
        this.element.remove();
    }
    
    executeCollision(object){
        object.hurt();
    }

    update(event){
        //TODO add animation of dying enemys at remove
        switch (event.name) {
            case 'end-game':
                this.element.remove();
                this.observers = [];

                break;
            default:
                break;
        }
    }
}
