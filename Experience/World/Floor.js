import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";

export default class Floor {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setFloor();


    }

    setFloor() {
        this.geometry = new THREE.PlaneGeometry(100, 100);
        this.material = new THREE.MeshStandardMaterial({
            color: 0x2c83c6,//color primero es e3e3e3
            side: THREE.DoubleSide//Aqui estamos diciendo que el material se aplique en ambos lados

        })

        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.plane.rotation.x = Math.PI/2;
        this.plane.receiveShadow = true;
        this.scene.add(this.plane);
    }

    resize() {
    }

    update() {
    }
}