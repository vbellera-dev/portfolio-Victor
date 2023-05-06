import * as THREE from "three";

import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Resources from "./Utils/Resources.js";
import Assets from "./Utils/Assets.js";


import Camera from "./Camera.js";
import Renderer from "./Renderer.js";

import World from "./World/World.js";
import Theme from "./World/Theme.js";



export default class Experience {
    static instance
    constructor(canvas) {
        if (Experience.instance) {
            return Experience.instance
        }
        Experience.instance = this;
        //El codigo desde la linea 6 hasta la linea 9 es precisamente el Singleton que hablaba. Si ya hay una instancia de la clase Experience, la devuelve. Si no hay, la crea.
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(Assets);
        this.theme = new Theme();
        
        
        
        this.world = new World();
        

        //.on (que viene de EventEmitter es el que va a escuchar el evento al que llamamos "update" en Time.js
        this.time.on('update', () => {
            this.update();
        }
        )
        
        this.sizes.on('resize', () => {
            this.resize();
        }
        )
    }

    resize(){
        this.camera.resize();
        this.world.resize()
        this.renderer.resize();
        
    }

    update(){
        this.camera.update();
        this.world.update()
        this.renderer.update();
    }

}