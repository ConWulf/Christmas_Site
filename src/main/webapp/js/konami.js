import * as THREE from '../../../../node_modules/three/src/Three.js';

$(document).ready(function () {
    $('body').children('main, #background, nav, div').hide();
    let scene, camera, renderer, pyramid, controls;

const init = () => {

    //set up scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75,
        window.innerWidth / window.innerHeight, 0.1,1000);

    //set up webgl render
    renderer = new THREE.WebGLRenderer({ antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('#000');
    document.body.append(renderer.domElement);

    const light = new THREE.AmbientLight('#fff', 1);
    scene.add(light);

    // const geometry = new THREE.CylinderGeometry(0,2,3, 4);
    // // const geometry = new THREE.ConeGeometry(2,3,4);
    // // const geometry = new THREE.BoxGeometry(3,3,3);

    const geometry = new THREE.Geometry();

    geometry.vertices.push(
        new THREE.Vector3( -10,  10, 0 ),
        new THREE.Vector3( -10, -10, 0 ),
        new THREE.Vector3(  10, -10, 0 )
    );

    geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );

    const img = new THREE.TextureLoader().load('src/main/webapp/img/NicePng_bill-cipher-png_2032097.png');
    const material =[
        new THREE.MeshPhongMaterial({color: 0xdddddd}),
    ]

    pyramid = new THREE.Mesh(geometry, material);
    pyramid.position.set(0,0,-10);
    scene.add(pyramid);
    console.log(pyramid);
    animate()
}

function animate() {
    renderer.render(scene, camera);
    pyramid.rotation.y += 0.01;
    requestAnimationFrame(animate);
}

init();

    const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    $(window).on("resize", onResize);

    // const url = 'https://api.github.com/users/';
    // // jasmineannrivera/repos
    // function getLanguages(userName) {
    //     fetch(url+userName+'/repos')
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             const lang = {}
    //             data.map()
    //             for (const obj of data) {
    //                 if (lang[obj.language]) {
    //                 lang[obj.language] += 1;
    //                 } else {
    //                     lang[obj.language] = 1;
    //                 }
    //
    //             }
    //             console.log(lang);
    //         })
    //
    //
    // }
    // getLanguages('jasmineannrivera');

})