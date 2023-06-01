export class CharacterLifes{
    constructor(){
        this.lifes = 3;
        this.element = document.querySelector('.lifes');
        this.createHeart();
        this.renderLifes();
        
    }

    // Add an specific quantity of lifes
    add(amount){
        this.lifes += amount;
        this.renderLifes();
    }

    // Remove an specific quantity of lifes
    remove(amount){
        this.lifes -= amount;
        this.renderLifes();
    }

    // Modify representation of lifes in screen
    renderLifes(){
        this.element.innerHTML = '';
        
        for (let index = 0; index < this.lifes; index++) {
            this.element.appendChild(this.createHeart());
        }
    }

    createHeart(){
        const heart = document.createElement('div');
        heart.classList.add('heart');
        return heart;
    }

    // Returns current life quantities
    amount() {
        return this.lifes;
    }
}