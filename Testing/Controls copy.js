//Va a manejar todos nuestros controles
import * as THREE from "three";
import Experience from "../Experience/Experience.js"
import GSAP from "gsap";

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,// How smooth the lerp is
        }//Linear interpolation, or “lerp” for short, is a technique commonly used when programming things like games or GUIs. In principle, a lerp function “eases” the transition between two values over time, using some simple math. This could be used to slide a character between two coordinates, or to animate a change in size or opacity of a UI element.


        // this.position = new THREE.Vector3(0, 0, 0);
        // this.nextPosition = new THREE.Vector3(0, 0, 0);
        // this.lookAtPosition = new THREE.Vector3(0, 0, 0);

        // this.directionalVector = new THREE.Vector3(0, 0, 0);
        // this.staticVector = new THREE.Vector3(0, -1, 0);
        // this.crossVector = new THREE.Vector3(0, 0, 0);
        //Vectores que usamos para el producto vectorial que menciono abajo.
    }

    //Aqui creamos un camino que la camara seguia.
    //Usaremos la clase Curve
    // setPath() {
    //     //Create a closed wavey loop
    //     this.curve = new THREE.CatmullRomCurve3([
    //         new THREE.Vector3(-5, 1, 0),
    //         new THREE.Vector3(0, 1, -5),
    //         new THREE.Vector3(5, 1, 0),
    //         new THREE.Vector3(0, 1, 5),
    //     ], true);
    //  }


    //Lo usamos para detectar el evento scroll para ver como se movia la camara con el scrol.. deltaY es una propiedad del evento "wheel"
    // onWheel() {
    //     window.addEventListener("wheel", (e) => {
    //         if (e.deltaY > 0) {
    //             this.lerp.target += 0.01;
    //             this.back = false;
    //         } else {
    //             this.lerp.target -= 0.01;
    //             this.back = true;
    //         }
    //     })
    // }

    resize() {

    }

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        )

        //Para aplicar el interpolation usamos los utils de GSAP. https://greensock.com/docs/v3/GSAP/gsap.utils --- interpolate()	Interpolate between almost any two values (numbers, colors, strings, arrays, complex strings, or even objects with multiple properties) (ex: interpolate("red", "blue", 0.5) --> "rgba(128,0,128,1)").


        //El codigo de aqui era para hacer una camara que estuviera siempre perpendicular a su posicion. Tuvimos que hacer producto vectorial. WTF.
        // this.curve.getPointAt(this.lerp.current % 1, this.position);
        // this.camera.orthographicCamera.position.copy(this.position);

        //Con getPointAt obtenemos las coordenadas de una posicion en la longitud de la curva (En el rango de 0 a 1). Es decir, un porcentaje de la curva. 
        //Como optionalTarget podemos pasar esa info a un vector.
        //Arriba lo que estamos haciendo es obteniendo la coordenada de la posicion "current" en la curva y se la pasamos a this.position

        // this.directionalVector.subVectors(
        //     this.curve.getPointAt((this.lerp.current % 1) + 0.0000001),
        //     this.position
        // );

        // this.directionalVector.normalize();//convertirlo en un vector unitario
        // this.crossVector = this.crossVector.crossVectors(
        //     this.directionalVector,
        //     this.staticVector
        // );

        // this.crossVector.multiplyScalar(10000000);
        // this.camera.orthographicCamera.lookAt(0, 0, 0);


        //El codigo de aqui abajo es para cuando queriamos que la camara siguiera la curva, es decir, que apuntase al siguiente punto en la curva.

        // if(this.back){
        //     this.lerp.target -= 0.001;
        // } else {
        //     this.lerp.target += 0.001;
        // }
        // //Aqui hacemos que si hacemos scroll arriba, entonces el movimiento automatico retrocede, si le damos scroll abajo, el mov automatico avanza.

        // this.lerp.target = GSAP.utils.clamp(0, 1, this.lerp.target);
        // this.lerp.current = GSAP.utils.clamp(0, 1, this.lerp.current);
        // //Aqui usamos clamp() de gsap.utils. Basicamente nos permite hacer que un valor quede entre un rango definido. Por ejemplo si decimos que -12 debe entrar en un rango de 0 a 1, el clamp entonces lo lleva a 0, porque es menor que 0. Si le pasamos 50 y el rango va de 0 a 2, el clamp entonces lo lleva a 2, porque es mayor a 2. Esto evitaria el infinite looping, porque cuando current llegue a 1 o a 0, se queda en 1 o se queda en 0.
        // this.curve.getPointAt(this.lerp.current, this.position);
        // this.curve.getPointAt(this.lerp.current + 0.000001, this.lookAtPosition);
        // this.camera.orthographicCamera.position.copy(this.position);
        // this.camera.orthographicCamera.lookAt(this.lookAtPosition);
    }
}