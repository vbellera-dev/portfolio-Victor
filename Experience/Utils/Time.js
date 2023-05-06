import {EventEmitter} from "events";//Esto es para usar el EventEmitter. Por cierto, primero tuvimos que instalar un paquete llamado events (npm i events --save-dev)

export default class Time extends EventEmitter{
    constructor() {
        super();//Must call super constructor in derived class before accessing 'this' or returning from derived constructor
        this.start = Date.now();
        this.current = this.start; //Ambos iguales cuando se inicie
        this.elapsed = 0;
        this.delta = 16; //Tiempo entre cada frame (en milisegundos)

        this.update();
    }

    update(){
        const currentTime = Date.now();
        this.delta = currentTime - this.current;
        this.current = currentTime;
        this.elapsed = this.current - this.start;
        
        this.emit("update");//Aqui se emite el evento. Podemos ponerle cualquier nombre, pero aqui se llama "update"
        window.requestAnimationFrame(() => this.update());
    }
}//Explicacion de esto aqui: https://prnt.sc/GCJPzJpHycY3