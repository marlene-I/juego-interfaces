import { Hero } from "./Hero.js";
import { Enemy } from "./Enemy.js";

const hero = new Hero();
const enemy = new Enemy();

const body = document.querySelector('body');

enemy.attachTo(body);

document.addEventListener("keydown", (e) => {
   hero.jump();
});
