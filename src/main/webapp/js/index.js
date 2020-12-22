import * as THREE from '../../../../node_modules/three/src/Three.js';

$(document).ready(function () {
    let scene, camera, renderer, snowGeo, snowflakes;
    const canvas = document.getElementById("background");
    const init = () => {
        //set up scene
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75,
            window.innerWidth / window.innerHeight, 0.1,1000);

        renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true, alpha: true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.set(0,0,0);

        snowGeo = new THREE.Geometry();
        for (let i = 0; i < 4000; i++) {
          let snow = new THREE.Vector3(
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
            );
            snow.acceleration = Math.random() * .2;
            snowGeo.vertices.push(snow)
        }
        let snowSprite = new THREE.TextureLoader().load('src/main/webapp/img/Snowflake-2.png');
        let snowMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 2,
            map: snowSprite
        });
        snowflakes = new THREE.Points(snowGeo, snowMaterial);
        scene.add(snowflakes);
        animate();
    }

    init();

    function animate() {
        snowGeo.vertices.forEach(p => {
            p.y -= p.acceleration;
            if (p.y < -200) p.y = 200;
        });
        snowGeo.verticesNeedUpdate = true;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    $(window).on("resize", onResize);





})