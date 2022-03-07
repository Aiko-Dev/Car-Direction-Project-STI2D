import * as THREE from './three.js/build/three.module.js';
import { OrbitControls } from './three.js/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from './three.js/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from './three.js/examples/jsm/loaders/OBJLoader.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const textureLoader = new THREE.TextureLoader();
/*textureLoader.load('./assets/images.jpg', texture => {
    const geometry = new THREE.SphereGeometry(40);
    const material = new THREE.M7eshBasicMaterial({ map: texture, overdraw: 0.5 });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.material.side = THREE.DoubleSide;
    scene.add(mesh);
})*/

textureLoader.load('./assets/road.jpg', texture => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 100);
    const geometry = new THREE.PlaneGeometry(1, 100)
    const material = new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5 });
    const road = new THREE.Mesh(geometry, material);
    road.rotation.x = - Math.PI / 2;
    road.position.y = 0.01;
    scene.add(road);
})
textureLoader.load('./assets/sand.jpg', texture => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(40, 40);
    const geometry = new THREE.PlaneGeometry(100, 100)
    const material = new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5 });
    const road = new THREE.Mesh(geometry, material);
    road.rotation.x = - Math.PI / 2;
    scene.add(road);
})

const objLoader = new OBJLoader();

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function createBox() {
    
}
 
function generateCactuses(number) {
    for(let i = 0; i < number; i++) {
        console.log("generating cactus number " + i);
        const h = getRandomArbitrary(2.5, 6);
        const geometry = new THREE.BoxGeometry(1, h);
        const materila = new THREE.MeshBasicMaterial();
        const mesh = new THREE.Mesh(geometry, materila);
        mesh.position.x = getRandomArbitrary(-40, 40);
        mesh.position.y = h / 2;
        mesh.position.z = getRandomArbitrary(-40, 40);
        scene.add(mesh);
    }
}

generateCactuses(20);

const loader = new GLTFLoader();
let gltf;

loader.load('./assets/untitled.glb', _gltf => {
    console.log("loaded model !")
    gltf = _gltf;

    //scale down gltf
    gltf.scene.scale.set(0.01, 0.01, 0.01);
    gltf.scene.position.x = -0.1;
    gltf.scene.position.y = 0.15;

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
renderer.setClearColor(0x9ACAE7);

const controls = new OrbitControls(camera, renderer.domElement);

document.body.appendChild(renderer.domElement);

controls.addEventListener('change', animation); 

function animation(time) {
    //requestAnimationFrame(animation);
    renderer.render(scene, camera);
}

document.onkeypress = function (e) {
    e = e || window.event;
    switch(e.charCode) {
        case 100: // Droite
            if(gltf.scene.children[0].rotation.z < -0.29) break;
            gltf.scene.children[2].rotation.y += 0.1;
            gltf.scene.children[1].rotation.z += 0.01;
            gltf.scene.children[0].rotation.z -= 0.01;
            gltf.scene.children[3].position.x += 0.01;
            animation();
            break;
        case 113: // Gauche
            if(gltf.scene.children[0].rotation.z > 0.19) break;
            gltf.scene.children[2].rotation.y -= 0.1;
            gltf.scene.children[1].rotation.z -= 0.01;
            gltf.scene.children[0].rotation.z += 0.01;
            gltf.scene.children[3].position.x -= 0.01;
            animation();
            break;
    }
};