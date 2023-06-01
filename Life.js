import { Enemy } from "./Enemy.js";

export class Life extends Enemy{
    constructor(){
        super();
        this.collectHeartAudio = new Audio('./assets/sounds/heart.wav');
    }

    create(){
        this.element = document.createElement('div');
        this.element.classList.add('heart');
        const top = Math.floor(Math.random() * (55 - 45) + 45 )
        console.log(top)
        this.element.style.top = `${top}%`
        this.element.classList.add('heart-to-catch');
    }

    executeCollision(object){
        this.element.remove();
        object.addLife();
        this.collectHeartAudio.play();
    }
}