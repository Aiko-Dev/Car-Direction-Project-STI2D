import * as THREE from './three.js/build/three.module.js';
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from './three.js/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1;

/*
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshNormalMaterial({ color: 0xFF6437 });

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);*/

const loader = new GLTFLoader();
let gltf;

loader.load('./assets/steering_wheel.glb', _gltf => {
    console.log("loaded model !")
    gltf = _gltf;
    console.log(gltf)
	scene.add(gltf.scene);
}, undefined, error => {
	console.error( error );
});

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animation);
renderer.setClearColor( 0xcccccc );

const controls = new OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);

function animation(time) {
    requestAnimationFrame(animation);
    renderer.render( scene, camera );
}

document.onkeypress = function (e) {
    console.log(gltf)

    e = e || window.event;
    switch(e.charCode) {
        case 100: // Droite
            //mesh.rotation.z += -0.1;
            gltf.scene.children[0].rotation.y += -0.1;
            gltf.scene.children[1].position.x += -0.01;
            console.log("droite")
            break;
        case 113: // Gauche
            //mesh.rotation.z += 0.1;
            gltf.scene.children[0].rotation.y += 0.1;
            gltf.scene.children[1].position.x += 0.01;
            console.log("gauche")
            break;
    }
};