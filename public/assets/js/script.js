import * as THREE from './three.js/build/three.module.js';
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from './three.js/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const textureLoader = new THREE.TextureLoader();
textureLoader.load('./assets/sky.jpg', texture => {
    const geometry = new THREE.SphereGeometry(10);
    const material = new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5 });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.material.side = THREE.DoubleSide;
    scene.add(mesh);
})

const loader = new GLTFLoader();
let gltf;

loader.load('./assets/steering_wheel.glb', _gltf => {
    console.log("loaded model !")
    gltf = _gltf;
	scene.add(gltf.scene);
    animation();
}, undefined, error => {
	console.error( error );
});

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
//renderer.setAnimationLoop(animation);
renderer.setClearColor(0xcccccc);

const controls = new OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);

controls.addEventListener('change', animation); 

function animation(time) {
    //requestAnimationFrame(animation);
    renderer.render(scene, camera);
}

document.onkeypress = function (e) {
    console.log(gltf)

    e = e || window.event;
    switch(e.charCode) {
        case 100: // Droite
            if(gltf.scene.children[1].position.x < -0.25) break;
            gltf.scene.children[0].rotation.y += -0.1;
            gltf.scene.children[2].rotation.y += 0.1;
            gltf.scene.children[1].position.x += -0.005;

            gltf.scene.children[3].position.x += -0.005;
            gltf.scene.children[5].position.x += -0.005;
            gltf.scene.children[5].rotation.y += -0.01;
            //gltf.scene.children[4].position.x += -0.01;
           // gltf.scene.children[6].position.x += -0.01;

            gltf.scene.children[4].rotation.y += -0.01;
            gltf.scene.children[6].rotation.y += -0.01;
            console.log("droite")
            animation();
            break;
        case 113: // Gauche
            if(gltf.scene.children[1].position.x > 0.2) break;
            gltf.scene.children[0].rotation.y += 0.1;
            gltf.scene.children[2].rotation.y += -0.1;
            gltf.scene.children[1].position.x += 0.005;

            gltf.scene.children[3].position.x += 0.005;
            gltf.scene.children[5].position.x += 0.005;
            gltf.scene.children[5].rotation.y += 0.01;
           // gltf.scene.children[4].position.x += 0.01;
            //gltf.scene.children[6].position.x += 0.01;

            gltf.scene.children[4].rotation.y += 0.01;
            gltf.scene.children[6].rotation.y += 0.01;
            console.log("gauche")
            animation();
            break;
    }
};