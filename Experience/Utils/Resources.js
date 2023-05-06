//Esto va a cargar todos los recursos y los va almacenar. Asi que si quiero acceder a un asset (como el glb), lo hariamos desde Resources.js
import * as THREE from "three";
import {EventEmitter} from "events";//Esto es para usar el EventEmitter. Por cierto, primero tuvimos que instalar un paquete llamado events (npm i events --save-dev)
import Experience from "../Experience.js";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";//Para cargar los archivos GLB
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader.js";//Esto es porque exportamos con compresion en Blender. Blender usa compresion Draco? para los meshes.

export default class Resources extends EventEmitter{
    constructor(assets) {
        super();
        this.experience = new Experience();
        this.renderer = this.experience.renderer;

        this.assets = assets;
        
        this.items = {};
        this.queue = this.assets.length; //Cuanto items van a ser cargados
        this.loaded = 0; //Cuantos han sido cargados

        this.setLoaders();
        this.startLoading();
    }

    setLoaders(){
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.dracoLoader = new DRACOLoader();
        this.loaders.dracoLoader.setDecoderPath("/draco/");
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
    };

    startLoading(){
        for(const asset of this.assets){
            if(asset.type === "glbModel"){
                this.loaders.gltfLoader.load(asset.path, (file) => {
                    this.singleAssetLoaded(asset, file);
                })
            } else if(asset.type === "videoTexture"){
                this.video = {};//Relacionado con elemento HTML video
                this.videoTexture = {};//Relacionado con la configuracion Three.js para texturas de video

                this.video[asset.name] = document.createElement("video");
                this.video[asset.name].src = asset.path;
                this.video[asset.name].playsInline = true; //https://css-tricks.com/what-does-playsinline-mean-in-web-video/
                this.video[asset.name].autoplay = true;
                this.video[asset.name].loop = true;
                this.video[asset.name].muted = true;
                this.video[asset.name].play();

                // setTimeout(() => {  
                //     console.log("PLAY NOW")    
                //     this.video[asset.name].play();
                //  }, 150); //https://stackoverflow.com/questions/36803176/how-to-prevent-the-play-request-was-interrupted-by-a-call-to-pause-error
                //Al final no fue necesario. No entiendo.
                

                this.videoTexture[asset.name] =  new THREE.VideoTexture(this.video[asset.name]);
                this.videoTexture[asset.name].flipY = true;
                this.videoTexture[asset.name].minFilter = THREE.NearestFilter;
                this.videoTexture[asset.name].mageFilter = THREE.NearestFilter;
                this.videoTexture[asset.name].generateMipmaps = false;
                this.videoTexture[asset.name].encoding = THREE.sRGBEncoding;
                this.videoTexture[asset.name].flipY = true;

                this.singleAssetLoaded(asset, this.videoTexture[asset.name]);
                }
            }
        }

        singleAssetLoaded(asset, file){
            this.items[asset.name] = file;
            this.loaded++;

            console.log("asset is loading")
    
            if(this.loaded === this.queue){
                console.log("all assets are done")
                this.emit("ready"); //Queremos crear el mundo SOLO cuando los assets esten listos. Asi que creamos este EventEmitter para saberlo.
            }
        }
    }
