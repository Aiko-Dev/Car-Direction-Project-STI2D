import * as THREE from './three.js/build/three.module.js';
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js'

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
    requestAnimationFrame(animation);
    renderer.render( scene, camera );
}

document.onkeypress = function (e) {
    e = e || window.event;
    switch(e.charCode) {
        case 100: // Droite
            mesh.rotation.z += -0.1;
            break;
        case 113: // Gauche
            mesh.rotation.z += 0.1;
            break;
    }
};