// Implementación del Object Pool
export class ObjectPool {
    constructor(ObjectType) {
        this.pool = [];
        this.maxSize = 5;
        this.type = ObjectType;
    }

    // Función para tomar un objeto del pool
    get() {
        if (this.pool.length > 0) {
            // Si hay objetos disponibles en el pool, tomar uno
            return this.pool.pop();
        }
        // Si no hay objetos disponibles, crear uno nuevo
        return new this.type();
    }

    // Función para devolver un objeto al pool
    release(object) {
        object.reset(); // Restablecer las propiedades del objeto antes de devolverlo al pool
        if (this.pool.length < this.maxSize) {
            // Si el pool no ha alcanzado su tamaño máximo, devolver el objeto al pool
            this.pool.push(object);
        }
    }
}

// // Uso del Object Pool
// const pool = new ObjectPool();

// // Tomar objetos del pool
// const objeto1 = pool.adquirirObjeto();
// const objeto2 = pool.adquirirObjeto();

// // Devolver objetos al pool
// pool.liberarObjeto(objeto1);
// pool.liberarObjeto(objeto2);