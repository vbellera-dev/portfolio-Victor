import * as THREE from "three";
import Experience from "../Experience.js";
import Room from "./Room.js";
import Floor from "./Floor.js";
import Environment from "./Environment.js";
import Controls from "./Controls.js"


export default class World {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources =  this.experience.resources;
        this.theme = this.experience.theme;
        
        
        

        this.resources.on("ready", () => {
            this.room = new Room();
            this.environment = new Environment();
            this.controls = new Controls();
            this.floor = new Floor();
            console.log("Created Room");
        })

        this.theme.on("cambioTema", (theme) => {
            this.switchTheme(theme);
        })
        
    }

    switchTheme(theme){
        if(this.environment){
            this.environment.switchTheme(theme)
        }
    }

    resize(){
       
    }

    update(){
        if (this.room) {
            this.room.update();
        }
        if (this.controls) {
            this.controls.update();
        }
    }
}