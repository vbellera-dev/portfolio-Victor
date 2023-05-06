//Va a manejar todos nuestros controles
import * as THREE from "three";
import Experience from "../Experience.js"
import GSAP from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger.js";

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.sizes = this.experience.sizes;
        this.room = this.experience.world.room.actualRoom;
        GSAP.registerPlugin(ScrollTrigger);

        this.setPath();
    }

    setPath(){
        this.timeline = new GSAP.timeline();
        this.timeline.fromTo(this.room.position,
            {x:0, y:0, z:0},
            {
            x:() => {
                return this.sizes.width*0.0019},
            scrollTrigger:{
                trigger:".primer-espacio",
                markers: true,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.7,
                invalidateOnRefresh: true
            }
        })
    };//Para que this.sizes se actualizara cuando resize ocurriera, tuve
    //que encerrar todo en una funcion arrow y ademas colocar invalidateOnRefresh

    resize() {
    }

    update() {
    }
}