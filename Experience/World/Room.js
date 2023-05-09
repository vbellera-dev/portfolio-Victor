import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { RectAreaLightHelper } from '../../node_modules/three/examples/jsm/helpers/RectAreaLightHelper.js'

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.cuarto;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,// How smooth the lerp is
        }


        this.setModel();
        this.setAnimation(); //No la estoy usando
        this.onMouseMove();

    }

    setModel() {
        this.actualRoom.children.forEach(child => {
            console.log(child);
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group) {
                child.children.forEach(groupchild => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                })
            }

            if (child.isRectAreaLight) {
                child.castShadow = false;
                child.receiveShadow = false;
            }

            if (child.name === "TV") {
                child.children[3].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.zelda,
                });
            }

            if (child.name === "PantallaPC") {
                child.children[0].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.pantalla,
                });

            }

            // child.scale.set(0, 0, 0);

            if(child.name === "Diagonal" ||
            child.name === "Punto" ||
            child.name === "Recto"){
                child.scale.set(0, 0, 0);
                child.position.set(0,-0.5, 1);
            }

            this.roomChildren[child.name.toLowerCase()] = child;


        });

        const width = 0.3;
        const height = 0.3;
        const intensity = 10;
        const rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height);
        rectLight.position.set(
            -1.3131605386734009,
            1.062000,
            -0.3499027490615845);

        rectLight.rotation.x = (Math.PI*(-120))/180;
        rectLight.rotation.y = (Math.PI*(5))/180;
        rectLight.castShadow = false;
        rectLight.receiveShadow = false;
        console.log(rectLight);
        this.actualRoom.add(rectLight);

        this.roomChildren['rectLight'] = rectLight;

        // const rectLightHelper = new RectAreaLightHelper(rectLight);
        // rectLight.add(rectLightHelper);

        this.scene.add(this.actualRoom);
        //this.actualRoom.scale.set(0.11,0.11,0.11);
        // this.actualRoom.rotation.y = Math.PI/2;

        
    }
    

    setAnimation() { }

    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation = ((e.clientX - window.innerWidth / 2) * 2) * 0.05 / window.innerWidth;
            //(e.clientX - window.innerWidth/2) Esto es para que el centro de la pantalla sea 0, y tengamos un extremo positivo y otro negativo. Por ejemplo, imagina que el viewport mide 100 pixeles. Cuando el mouse este en el medio es 0, cuando este a la izquierda sera -50 y cuando este a la derecha sera 50.
            //Dividimos entre window.innerWidth para que los valores esten entre -1 y 1.
            //Como nos estaba dando entre -0.5 y 0.5, multiplicamos la parte de arriba por 2 otra vez.
            //Si no hicieramos eso, al aplicar la rotation, el cuarto giraria demasiado para una pequena variacion.
            this.lerp.target = this.rotation;
        })
    };

    resize() {
    }

    update() {
        // this.mixer.update(this.time.delta);
        // this.time.delta
        //Esto es para las animaciones

        //Linear interpolation, or “lerp” for short, is a technique commonly used when programming things like games or GUIs. In principle, a lerp function “eases” the transition between two values over time, using some simple math. This could be used to slide a character between two coordinates, or to animate a change in size or opacity of a UI element.
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;
    }
}