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
        for (let i = 0; i < 1000; i++) {
            let snow = new THREE.Vector3(
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
                Math.random() * 600 - 300,
            );
            snow.acceleration = Math.random() * .2 + .01;
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

    list.slick({
        prevArrow: `<button type="button" class="slick-prev carousel_btn">
                            <i class="fas fa-arrow-left"></i>
                        </button>`,
        nextArrow: `<button type="button" class="slick-next carousel_btn">
                            <i class="fas fa-arrow-right"></i>   
                        </button>`,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        mobileFirst: true,
        centerPadding: '10px',
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    centerPadding: '0',
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 1225,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            }
        ]
    });


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
            list.append(song(formatInput(songInput), urlInput.val().trim()))
            urlInput.val("");
            songInput.val("");
        }

    }

    // fetch('http://localhost:3000/songs').then(res => res.json()).then(console.log)
    // fetch().then(res => res.json()).then(console.log)

    submitButton.on('click', addSong);

    const renderVideos = (songs) => {
        let html = ''
        songs.forEach(song => {
        const {url} = song;
         html += `<div class="inline-flex justify-center">
        <iframe src="${url}">You're A Mean One, Mr. Grinch</iframe>
            </div>`;
        });
        return html;
    }

    fetch('http://localhost:3000/songs')
        .then(res => res.json())
        .then(data => {
            list.slick('slickAdd', renderVideos(data))
        });



})