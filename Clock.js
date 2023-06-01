import { Observable } from "./Observable.js";


export class Clock extends Observable{
    // Receives game max time in seconds 
    constructor(time, timeInterval) {
        super();
        this.max = time;
        this.interval = timeInterval; // interval to watch and notify game to change spawn speed
        this.element = document.querySelector('.time');
        this.time = time;
        this.timeElapsed = 0;
        this.element.innerHTML = this.getParsedTime();
        this.startClock();
    }
    
    // Returns this.time(seconds) in mm:ss format 
    getParsedTime(){
        return `${Math.floor(this.time / 60)} &nbsp;&nbsp;:&nbsp;&nbsp; ${this.time % 60}`
    }

    startClock(){
        this.clockTimer = setInterval(() => {
            this.time -= 1;
            this.timeElapsed += 1;
            this.element.innerHTML = this.getParsedTime();
            if(this.timeElapsed % this.interval == 0 && this.timeElapsed > 0) {
                this.notifyObserver({name: 'clock-interval'})
            }
            if(this.time == 0){
                this.element.innerHTML = ' -- &nbsp;:;&nbsp; --'
                this.notifyObserver({name: 'time-ended', trigger: this});
            }
        }, 1000);
    }

    stopClock(){
        clearInterval(this.clockTimer);
    }

    update(event){
        console.log('event', event)
        switch (event.name) {
            case 'end-game':
                    this.stopClock()
                break;
            default:
                break;
        }
    };

}