//Esto va a contener la lista de los assets, los nombres de los assets, el tipo de asset y el path a ese asset.

export default [
    {
        name: "cuarto",
        type: "glbModel",
        path: "/models/CuartoFinalV2.glb" //No necesitamos poner public porque Vite asume automaticamente que hablamos de public
    },
    {
        name: "pantalla",
        type: "videoTexture",
        path: "/textures/videoMonitor.mp4"
    },
    {
        name: "zelda",
        type: "videoTexture",
        path: "/textures/ZeldaTitle.mp4"
    },
];
