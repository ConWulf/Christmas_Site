import * as THREE from '../../../../node_modules/three/src/Three.js';


$(document).ready(function (json) {
    let scene, camera, renderer, pyramid, controls;

const initkonami = () => {
const konamiCanvas = document.getElementById('konami');
    //set up scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75,
        window.innerWidth / window.innerHeight, 0.1,1000);
camera.position.set(0,0,0);
    //set up webgl render
    renderer = new THREE.WebGLRenderer({canvas: konamiCanvas, antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('#000');

    const light = new THREE.AmbientLight('#fff', 1);
    scene.add(light);

    const geometry = new THREE.BoxGeometry(3,3,3);

    const img = new THREE.TextureLoader().load('src/main/webapp/img/il_570xN.1623500519_1eeg.jpg');
    const material =[
        new THREE.MeshLambertMaterial({map: img}),
        new THREE.MeshLambertMaterial({map: img}),
        new THREE.MeshLambertMaterial({color: 0xEFFFC8}),
        new THREE.MeshLambertMaterial({color: 0xEFFFC8}),
        new THREE.MeshLambertMaterial({map: img}),
        new THREE.MeshLambertMaterial({map: img}),
        new THREE.MeshLambertMaterial({map: img}),
    ]

    pyramid = new THREE.Mesh(geometry, material);
    pyramid.position.set(0,-2,-8);
    scene.add(pyramid);

    // const textLoader = new THREE.FontLoader();
    //
    // textLoader.load( 'node_modules/three/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
    //
    //     const fontGeometry = new THREE.TextGeometry( 'He Sees ALL', {
    //         font: font,
    //         size: 1,
    //         height: 5,
    //         curveSegments: 12,
    //         bevelEnabled: true,
    //         bevelThickness: 10,
    //         bevelSize: 8,
    //         bevelOffset: 0,
    //         bevelSegments: 5
    //     } );
    //
    // const textMaterial = [
    //     new THREE.MeshLambertMaterial({color: 0xeafb23})
    // ]
    // const textMesh = new THREE.Mesh(fontGeometry, textMaterial);
    // scene.add(textMesh);
    //
    // } );


    animate()
}
    // initkonami();

function animate() {
    renderer.render(scene, camera);
    pyramid.rotation.y += 0.01;
    requestAnimationFrame(animate);
}


    const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    let codeArr = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a", "Enter"]
    let userArr = [];
    $(document).on("keyup", function(e) {
        userArr.push(e.key);
        if (userArr.join(" ") === codeArr.join(" ")) {
            $('body').children('main, #background, nav, div:not(#konami-text)').hide();
            $('#konami, #konami-text').show();
            $(window).on("resize", onResize);
            initkonami();
        } if (e.key === "Backspace") {
            userArr = [];
            $(window).off('resize', onResize);
            $('body').children('main, #background, nav, div:not(#konami-text)').show();
            $('#konami, #konami-text').hide();
        }
    });

    setInterval(function(){
        userArr = []}, 30000)
})


