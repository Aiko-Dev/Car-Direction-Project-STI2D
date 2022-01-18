import * as THREE from './three.js/build/three.module.js';
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js'

var right = false;
var left = false;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
camera.position.z = 1;
            
const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animation);

const controls = new OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);

function animation(time) {
    if(right) {
        mesh.rotation.z = -time / 1000;
        right = false;
    } else if(left) {
         mesh.rotation.z = time / 1000;
         left = false;
    }

    renderer.render( scene, camera );
}

document.onkeypress = function (e) {
    e = e || window.event;
    switch(e.charCode) {
        case 100: // Droite
            right = true;
            console.log("droite");
            break;
        case 113: // Gauche
            left = true;
            console.log("gauche");
            break;
    }
};