import * as THREE from "three";
import Experience from "./Experience.js"

export default class Renderer {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;

        this.setRenderer();

    }

    setRenderer(){
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        //LEE la documentacion sobre cada una de estos parametros
        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 1.2;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    resize(){
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    update(){
        //Aqui pedimos al renderer a que haga el render pues. Te pide: scene, camera, 
        this.renderer.setViewport(0, 0, this.sizes.width, this.sizes.height)//Le estamos diciendo al renderer que el viewport va desde (0,0) esquina inferior izquierda hasta (width, height) es decir esquina sup derecha. Esta es la pantalla principal
        this.renderer.render(this.scene, this.camera.orthographicCamera);

        //Segunda pantalla
        // this.renderer.setScissorTest(true);
        // this.renderer.setViewport(
        //     this.sizes.width - this.sizes.width/3, 
        //     this.sizes.height - this.sizes.height/3, 
        //     this.sizes.width/3, 
        //     this.sizes.height/3);

        //     this.renderer.setScissor(
        //         this.sizes.width - this.sizes.width/3, 
        //         this.sizes.height - this.sizes.height/3, 
        //         this.sizes.width/3, 
        //         this.sizes.height/3);

        //     this.renderer.render(this.scene, this.camera.perspectiveCamera);

        // this.renderer.setScissorTest(false);
    }
}