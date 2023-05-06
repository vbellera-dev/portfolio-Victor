import {EventEmitter} from "events";//Esto es para usar el EventEmitter. Por cierto, primero tuvimos que instalar un paquete llamado events (npm i events --save-dev)

export default class Sizes extends EventEmitter{
    constructor() {
        super();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspect = this.width / this.height;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);
        this.frustum = 5;

        window.addEventListener("resize", () => {
            console.log("Hubo un resize");
            this.update();
        });
        
        this.update();//Este eventListener lo que va a hacer es cambiar el valor de las variables width, height, aspect y pixelRatio cada vez que la ventana cambie de tamano.
    }

    update(){
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.aspect = this.width / this.height;
            this.pixelRatio = Math.min(window.devicePixelRatio, 2);
            this.emit("resize");
    }
}
//Aqui tomamos el window, porque vamos a trabajar con todo el viewport del navegador (width y height de canvas es 100%). Pero si tu canvas tiene que ser mas
//pequeno, deberias agarrar alli el width y el height del canvas directamente.