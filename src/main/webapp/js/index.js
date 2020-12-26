import * as THREE from '../../../../node_modules/three/src/Three.js';
// $('#konami, #konami-text').hide();
$(document).ready(function () {


    // for the background snow
    let scene, camera, renderer, snowGeo, snowflakes;
    const canvas = document.getElementById("background");
    const init = () => {
        //set up scene
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75,
            window.innerWidth / window.innerHeight, 0.1,1000);

        //set up webgl rendere
        renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true, alpha: true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.set(0,0,0);


        snowGeo = new THREE.Geometry();
        for (let i = 0; i < 2000; i++) {
            let snow = new THREE.Vector3(
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
            );
            snow.acceleration = Math.random() * .2;
            snowGeo.vertices.push(snow)
        }
        //
        let snowSprite = new THREE.TextureLoader().load('src/main/webapp/img/Snowflake-2.png');
        let snowMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 3,
            map: snowSprite
        });
        snowflakes = new THREE.Points(snowGeo, snowMaterial);
        scene.add(snowflakes);

        const sun = new THREE.DirectionalLight(0xffffff, 2);
        sun.position.set(1,1,0);
        scene.add(sun);

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

//user interactions
    const songInput = $('#song');
    const urlInput = $('#url');
    const submitButton = $('#addSong');
    const list = $('#songList');
    const select = $('#select-song');
    const bodyBtn = $('#body-btn');
    const selectList =  $('#songList>a');
    const arrow =  $('#arrow');
    let clicked = false;

    const getURL = (url) => {
        try {
           return new URL(url);
        } catch (e) {
            console.log(e)
        }
    }

    const song = (song, url) => {
        return `<a href="${getURL(url)}" target="_blank" class="block p-2 song-select">${song}</a>`
    }

    const formatInput = (input) => {
        if (input.val().includes(' ')) {
            return input.val()
                .trim().split(" ")
                .map(word => {
                    let lowercaseWord = word.toLowerCase();
                    return lowercaseWord[0].toUpperCase().concat(word.slice(1));
                }).join(" ");
        } else return input.val();
    }

    function addSong(e) {
        e.preventDefault();
        if (songInput.val() !== "" && urlInput.val() !== "") {
            console.log(formatInput(songInput));
            list.append(song(formatInput(songInput), urlInput.val().trim()))
            urlInput.val("");
            songInput.val("");
        }

    }

    function selectAnimation() {
        clicked = !clicked;

        if(clicked) {
            selectList.first().removeClass('pointer-events-none');
            bodyBtn.removeClass('hidden');
            arrow.addClass('invisible');
        }
        else {
            selectList.first().addClass('pointer-events-none');
            arrow.removeClass('invisible');
            bodyBtn.addClass('hidden');
        }
    }

    submitButton.on('click', addSong);


    select.on('click', selectAnimation);
    list.on('click', selectAnimation);
    bodyBtn.on('click', selectAnimation);



})