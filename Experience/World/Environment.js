import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import GUI from 'lil-gui'; 

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.page = document.querySelector(".page");
        this.sol = document.querySelector(".sol");
        this.luna = document.querySelector(".luna");
        this.toggle = document.querySelector(".toggle-switch");
        this.boton = document.querySelector(".boton");

        // this.gui = new GUI({container: document.querySelector(".hero-wrapper")});
        // this.obj = {
        //     colorObj: {r: 0, g: 0, b: 0},
        //     intensity: 3,
        // }
        
        this.setSunlight();
        // this.setGUI();
        this.switchTheme();

    }

    setGUI(){
        this.gui.addColor(this.obj, "colorObj").onChange(()=>{
            this.sunLight.color.copy(this.obj.colorObj);
            this.ambientLight.color.copy(this.obj.colorObj);
        });
        this.gui.add(this.obj, "intensity", 0, 10).onChange(()=>{
            this.sunLight.intensity = this.obj.intensity;
            this.ambientLight.intensity = this.obj.intensity;
        })
    }

    setSunlight(){
        this.sunLight = new THREE.DirectionalLight("#FFFFFF", 3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.05;
        // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
        // this.scene.add(helper);
        this.sunLight.position.set(-1.5, 7, 2.5);

        this.scene.add(this.sunLight);

        this.ambientLight = new THREE.AmbientLight("WHITE", 1.2);
        this.scene.add(this.ambientLight);
    }

    switchTheme(theme){
        if(theme === "oscuro"){
            GSAP.to(this.sunLight.color, {
                r: 47/255,
                g: 48/255,
                b: 75/255
            });
            GSAP.to(this.ambientLight.color, {
                r: 47/255,
                g: 48/255,
                b: 75/255
            });
            GSAP.to(this.sunLight, {
                intensity: 0.8
            });
            GSAP.to(this.ambientLight, {
                intensity: 0.8
            });
            this.page.style.color = "var(--texto-oscuro)";
            this.sol.style.filter = "invert(100%)";
            this.luna.style.filter = "invert(100%)";
            this.toggle.style.backgroundColor = "var(--color-principal-oscuro)";
            this.boton.style.backgroundColor = "var(--color-secundario-oscuro)";
        } else {
            GSAP.to(this.sunLight.color, {
                r: 255/255,
                g: 255/255,
                b: 255/255
            });
            GSAP.to(this.ambientLight.color, {
                r: 255/255,
                g: 255/255,
                b: 255/255
            });
            GSAP.to(this.sunLight, {
                intensity: 3
            });
            GSAP.to(this.ambientLight, {
                intensity: 1.2
            });
            this.page.style.color = "var(--texto-claro)";
            this.sol.style.filter = "invert(0%)";
            this.luna.style.filter = "invert(0%)";
            this.toggle.style.backgroundColor = "#2c83c6";
            this.boton.style.backgroundColor = "var(--color-secundario-claro)";
        }
    }

    resize() {

    }

    update() {

    }
}