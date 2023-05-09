//Va a manejar todos nuestros controles
import * as THREE from "three";
import Experience from "../Experience.js"
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from '@ashthornton/asscroll';

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.sizes = this.experience.sizes;
        this.room = this.experience.world.room.actualRoom;
        
        this.room.children.forEach(child => {
            if (child.type === "RectAreaLight") {
                this.rectLight = child;
            }
        });

        this.primerCirculo = this.experience.world.floor.circleFirst;
        this.segundoCirculo = this.experience.world.floor.circleSecond;
        this.tercerCirculo = this.experience.world.floor.circleThird;

        GSAP.registerPlugin(ScrollTrigger);

        this.setSmoothScroll();
        
        this.setControlTrigger();
    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.3,
            disableRaf: true
        });


        GSAP.ticker.add(asscroll.update);

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement
        });


        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            },
            fixedMarkers: true
        });


        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);

        requestAnimationFrame(() => {
            asscroll.enable({
                newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]")
            });

        });
        return asscroll;
    }


    setSmoothScroll() {
        //GSAP Scroller Proxy
        this.asscroll = this.setupASScroll();

    };

    setControlTrigger() {
        this.mm = GSAP.matchMedia();
        //Desktop
        this.mm.add("(min-width: 969px)", () => {
            console.log('FIRED DESKTOP');

            this.room.scale.set(1, 1, 1);
            this.camera.orthographicCamera.position.set(0, 4, 4);
            this.room.position.set(0, 0, 0);
            this.camera.orthographicCamera.zoom = 0.7;

            //Primera Seccion
            this.firstMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".primer-espacio",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.7,
                    invalidateOnRefresh: true,
                },
            });

            this.firstMoveTimeline.fromTo(this.room.position,
                { x: 0, y: 0, z: 0 },
                {
                    x: () => {
                        return this.sizes.width * 0.0019
                    }
                }, "mismoMov");

                this.firstMoveTimeline.to(this.primerCirculo.scale,
                    { x: 5, y: 5, z: 5 },
                    "mismoMov");    
            //Segunda seccion
            this.secondMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".segundo-espacio",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.7,
                    invalidateOnRefresh: true,
                },
            });

            this.secondMoveTimeline.to(this.room.position, {
                x: () => {
                    return 1;
                },
                z: () => {
                    return this.sizes.height * 0;
                }
            }, "mismoMov");

            this.secondMoveTimeline.to(this.room.scale, {
                x: 1.5,
                y: 1.5,
                z: 1.5,
            }, "mismoMov");

            this.secondMoveTimeline.to(this.rectLight, {
                width: 0.45,
                height: 0.45
            }, "mismoMov");

            this.secondMoveTimeline.to(this.camera.orthographicCamera, {
                zoom: 1.6
            }, "mismoMov");

            //Tercera seccion
            this.thirdMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".tercer-espacio",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.7,
                    invalidateOnRefresh: true,
                },
            });

            this.thirdMoveTimeline.to(this.room.position, {
                x: () => {
                    return -0.5;
                },
                z: () => {
                    return this.sizes.height * 0;
                }
            }, "mismoMov");

            this.thirdMoveTimeline.to(this.room.scale, {
                x: 1.5,
                y: 1.5,
                z: 1.5,
            }, "mismoMov");

            this.thirdMoveTimeline.to(this.rectLight, {
                width: 0.45,
                height: 0.45
            }, "mismoMov");

            this.thirdMoveTimeline.to(this.camera.orthographicCamera, {
                zoom: 1.8
            }, "mismoMov");

            this.thirdMoveTimeline.to(this.camera.orthographicCamera.position, {
                y: 3
            }, "mismoMov");

            //Cuarta Seccion

            this.fourthMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".cuarto-espacio",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.7,
                    invalidateOnRefresh: true,
                },
            });


            this.fourthMoveTimeline.to(this.camera.orthographicCamera, {
                zoom: 8
            }, "mismoMov");

            this.fourthMoveTimeline.to(this.camera.orthographicCamera.rotation, {
                x: (Math.PI * (0)) / 180,
                y: (Math.PI * (45)) / 180
            }, "mismoMov");

            this.fourthMoveTimeline.to(this.camera.orthographicCamera.position, {
                x: 1.4,
                y: 1.7
            }, "mismoMov");

        });


        //Mobile
        this.mm.add("(max-width: 968px)", () => {
            console.log('FIRED MOBILE');

            this.room.scale.set(1, 1, 1);
            this.room.position.set(0, 0, 0);
            this.camera.orthographicCamera.position.set(0, 4, 4);
            this.camera.orthographicCamera.zoom = 0.5;
            //Primera Seccion
            this.firstMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".primer-espacio",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.7,
                    invalidateOnRefresh: true,
                },
            });

            this.firstMoveTimeline.to(this.room.scale,
                { x: 1.2, y: 1.2, z: 1.2 });


            //Segunda seccion
            this.secondMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".segundo-espacio",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.7,
                    invalidateOnRefresh: true,
                },
            });

            this.secondMoveTimeline.to(this.room.position, {
                x: () => {
                    return 1.6;
                }
            }, "mismoMov");

            this.secondMoveTimeline.to(this.camera.orthographicCamera, {
                zoom: 1.8
            }, "mismoMov");

            //Tercera seccion
            this.thirdMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".tercer-espacio",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.7,
                    invalidateOnRefresh: true,
                },
            });

            this.thirdMoveTimeline.to(this.room.position, {
                x: -1.6,
                y: 1
            }, "mismoMov");

            this.thirdMoveTimeline.to(this.camera.orthographicCamera, {
                zoom: 1.8
            }, "mismoMov");

            //Cuarta seccion
            this.fourthMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".cuarto-espacio",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.7,
                    invalidateOnRefresh: true,
                },
            });

            this.fourthMoveTimeline.to(this.camera.orthographicCamera.position, {
                x: -2,
                y: 4
            }, "mismoMov");

            this.fourthMoveTimeline.to(this.camera.orthographicCamera, {
                zoom: 0.3
            }, "mismoMov");

            this.fourthMoveTimeline.to(this.segundoCirculo.scale, {
                x: 5,
                y: 5,
                z: 5,
            }, "mismoMov")

        });


        //TODOS
        
        this.mm.add("all", () => {
            this.firstCircle = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".primer-espacio",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                },
            }).to(this.primerCirculo.scale, {
                x: 5,
                y: 5,
                z: 5,
            });
        });
        






        // this.timeline = new GSAP.timeline();
        // this.timeline.fromTo(this.room.position,
        //     {x:0, y:0, z:0},
        //     {
        //     x:() => {
        //         return this.sizes.width*0.0019},
        //     scrollTrigger:{
        //         trigger:".primer-espacio",
        //         markers: true,
        //         start: "top top",
        //         end: "bottom bottom",
        //         scrub: 0.7,
        //         invalidateOnRefresh: true
        //     }
        // })
    };//Para que this.sizes se actualizara cuando resize ocurriera, tuve
    //que encerrar todo en una funcion arrow y ademas colocar invalidateOnRefresh

    resize() {
    }

    update() {
    }
}