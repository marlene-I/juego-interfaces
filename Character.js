import { Observable } from "./Observable.js";

export class Character extends Observable{
    constructor() {
        super();
    }
    
    checkCollision(externalElement) {
        const rect1 = this.element.getBoundingClientRect();
        // console.log('rect1', rect1)
        const rect2 = externalElement.element.getBoundingClientRect();
        // console.log('rect2', rect2)
        const collision = !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
        );
        return collision;
    }

    getRect(){};

    update(event){
        console.log('event', event)
        switch (event.name) {
            case 'end-game':
                    console.log('game-ended from', this)
                break;
            default:
                break;
        }
    };
}
