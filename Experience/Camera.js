import * as THREE from "three";
import Experience from "./Experience.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();
    }

    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000);
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.x = 6;
        this.perspectiveCamera.position.y = 14;
        this.perspectiveCamera.position.z = 29;
    }

    createOrthographicCamera() {
        // this.frustum = 5;//https://stackoverflow.com/questions/10716632/camera-arguments-in-three-js
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustum) / 2,
            (this.sizes.aspect * this.sizes.frustum) / 2,
            this.sizes.frustum / 2,
            -this.sizes.frustum / 2,
            -10,
            100
        );

        this.orthographicCamera.position.y = 4;
        this.orthographicCamera.position.z = 4;
        this.orthographicCamera.rotation.x = -Math.PI / 6;
        this.orthographicCamera.zoom = 0.7;

        this.scene.add(this.orthographicCamera);

        // this.helper = new THREE.CameraHelper(this.orthographicCamera);
        // this.scene.add(this.helper);

        // const size = 10;
        // const divisions = 10;

        // const gridHelper = new THREE.GridHelper(size, divisions);
        // this.scene.add(gridHelper);

        // const axesHelper = new THREE.AxesHelper(10);
        // this.scene.add(axesHelper);
    }


    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
    }

    resize() {
        //Para actualizar la camara perspectiva cuando se cambia el tamano de la ventana
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        //Para actualizar la camara ortografica cuando se cambia el tamano de la ventana
        console.log(this.sizes.aspect);
        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustum) / 2;
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustum) / 2;
        this.orthographicCamera.top = this.sizes.frustum / 2;
        this.orthographicCamera.bottom = -this.sizes.frustum / 2;
        this.orthographicCamera.updateProjectionMatrix();
    }

    update() {
        // console.log(this.perspectiveCamera.position);
        this.controls.update();
        this.orthographicCamera.updateProjectionMatrix();

        // this.helper.matrixWorldNeedsUpdate = true;
        // this.helper.update();
        // this.helper.position.copy(this.orthographicCamera.position);
        // this.helper.rotation.copy(this.orthographicCamera.rotation);
    };//Para orbiter Controls. NPI por ahora

}