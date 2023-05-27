import { Character } from "./Character.js";

export class Enemy extends Character {
    constructor(){
        super();
        this.element = document.createElement('div');
        this.element.classList.add('enemy');
    }

    attachTo(container){
        this.container = container;
        container.appendChild(this.element);
        this.element.addEventListener('animationend', this)
    }

    handleEvent(e){
        switch (e.type) {
            case 'animationend':
                switch (e.animationName) {
                    case 'right-left-move':
                        console.log('animation ended');
                        this.container.removeChild(this.element);
                        break;
                
                    default:
                        break;
                }
                
                
                break;
        
            default:
                break;
        }
    }
}