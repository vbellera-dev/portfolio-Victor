import {EventEmitter} from "events";//Esto es para usar el EventEmitter. Por cierto, primero tuvimos que instalar un paquete llamado events (npm i events --save-dev)

export default class Theme extends EventEmitter{
    constructor() {
        super();

        this.theme = "claro";//Valor inicial
        
        this.toggleSwitch = document.querySelector(".toggle-switch");
        this.toggleButton = document.querySelector(".boton");

        this.setEventListeners();
    }

    setEventListeners(){
        this.toggleSwitch.addEventListener("click", () => {
            this.toggleButton.classList.toggle("slide");
            this.theme = this.theme === "claro" ? "oscuro" : "claro";            
            this.emit("cambioTema", this.theme);
        })
    }
}