export class Hero {
    constructor() {
        this.element= document.getElementById('character');
        this.run();
    }

    handleEvent(e){
        switch (e.type) {
            case 'keydown':
                
                break;
            case 'animationend':
                // hacer un switch para preguntar
                // por el nombre de la animación
                console.log(e)
                switch (e.animationName) {
                    case 'jump':
                        this.element.removeEventListener('animationend', this);
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

    status(){
        return this.element.getBoundingClientRect();
    }

    run(){
        this.clear();
        this.element.classList.add("move-forward");
    }

    jump(){
        this.clear();
        this.element.classList.add("jump");
        this.element.addEventListener('animationend', this);
    }

    clear() {
        this.element.classList.remove("move-forward");
    }
    
}
