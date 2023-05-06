import './style.css'
import Experience from './Experience/Experience.js';

const experience = new Experience(document.querySelector(".experience-canvas")); 
//Three.js necesita el canvas, asi que se lo estamos pasando en la constante experience
//La clase Experiencia va a contener todo lo relacionado con la experiencia Three.js
