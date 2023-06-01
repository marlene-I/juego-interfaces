import { Hero } from "./Hero.js";
import { Enemy } from "./Enemy.js";
import { ObjectPool } from "./ObjectPool.js";
import { Observable } from "./Observable.js";
import { Clock } from "./Clock.js";
import { Life } from "./Life.js";
import { GameMenu } from "./GameMenu.js";
import { Score } from "./Score.js";

export class Game extends Observable{
    constructor (element){
        super();
        if(Game.instance) {
            return Game.instance;
        }
        this.element = element;
        
        Game.instance = this;   
        this.gameOverAudio = new Audio('./assets/sounds/game_over.wav');
        this.startGame(element);
    }

    startLoop(){
        this.mainLoop = setInterval(() => {
            this.iteration += 1;
            const collisionedElements = this.onScreenElements.filter((enemy) => enemy.checkCollision(this.hero));
            if(collisionedElements.length > 0) {
                
                collisionedElements.forEach((collisioned) => {
                    const index = this.onScreenElements.indexOf(collisioned);
                    if (index !== -1) {
                        this.onScreenElements.splice(index, 1);
                    }
                    collisioned.executeCollision(this.hero);
                })
            }
        }, 50);
    }

    spawnEnemys(){
        this.spawnEnemysLoop = setInterval(() => {
            const enemy = this.enemyPool.get();
            this.addObserver(enemy);
            this.onScreenElements.push(enemy);

            enemy.attachTo(this.gameContainer);
        }, this.getSpawnTime(this.enemysSpawnTime));
    }

    spawnLifes(){
        this.spawnLifesLoop = setInterval(() => {
            const life = this.lifePool.get();
            this.addObserver(life);
            this.onScreenElements.push(life);

            life.attachTo(this.gameContainer);
        }, this.getSpawnTime(this.lifesSpawnTime));
    }

    update(event){
        console.log('event', event)
        switch (event.name) {
            case 'died':
                    if(event.trigger == this.hero){
                       this.executeEndGame();
                    }
                break;
            case 'time-ended':
                    this.executeEndGame();
                break;
        
            case 'clock-interval':
                this.changeSpawnTimes();
                break;

            case 'start-game':
                this.initializeMatch();
                break;
        
            default:
                break;
        }
    };

    executeEndGame(){
        console.log("finaliza el juego");
        
        this.endGame(); // reiniciar el juego
        this.reset(); // resetear el juego
    }

    reset(){
        setTimeout(() => {
            this.gameOver.remove();
            this.startGame(this.element);    
        }, 3000);
    }

    endGame() {
        this.notifyObserver({name: 'end-game', trigger: this});
        this.gameOverAudio.play();
        this.gameOver = document.createElement('div');
        this.gameContainer.appendChild(this.gameOver);
        this.gameOver.classList.add('game-over');

        this.observers = [];
                
        clearInterval(this.spawnEnemysLoop);
        clearInterval(this.spawnLifesLoop);
        clearInterval(this.mainLoop);
    }

    startGame(element){
        this.gameContainer = element;

        this.gameMenu = new GameMenu();
        this.gameMenu.addObserver(this);
        this.score = new Score();
    }

    initializeMatch(){
        this.hero = new Hero(this.gameContainer);
        this.clock = new Clock(120, 15);
        
        this.hero.addObserver(this);
        this.hero.addObserver(this.score);
        this.clock.addObserver(this);

        this.addObserver(this.hero);
        this.addObserver(this.clock);
        this.addObserver(this.score);

        this.enemysSpawnTime = 2900;
        this.lifesSpawnTime = 3000;

        this.onScreenElements = []; // current screen elements

        this.enemyPool = new ObjectPool(Enemy);
        this.lifePool = new ObjectPool(Life);
        this.timeMultiplier = 10; 
        
        this.spawnEnemys();
        this.spawnLifes();
 
        this.startLoop();
        this.iteration = 1;
    }

    getSpawnTime(max){
        const min = max - Math.floor( Math.random() * 800);
        return Math.floor(Math.random() * (max - min) + min);
    }

    changeSpawnTimes(){
        this.enemysSpawnTime = this.enemysSpawnTime - 300;
        console.log('this.enemysSpawnTime', this.enemysSpawnTime)
        this.lifesSpawnTime = this.lifesSpawnTime + 300;
        console.log('this.lifesSpawnTime', this.lifesSpawnTime);
        clearInterval(this.spawnEnemysLoop);
        clearInterval(this.spawnLifesLoop);
        this.spawnEnemys();
        this.spawnLifes();

    }
}