import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


// Camera
			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 79, window.innerWidth / window.innerHeight, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer({
        canvas:document.querySelector('#bg'),
      });
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.position.setZ(30);
      camera.position.setX(-3);

// Gltf file

// const loader = new GLTFLoader();

// loader.load( 'ast.glb', function ( gltf ) {

// 	scene.add( gltf.scene );

// }, undefined, function ( error ) {

// 	console.error( error );

// } );

// Avatar

const heatTexture = new THREE.TextureLoader().load('images/sun.jpg');

const heat = new THREE.Mesh(new THREE.SphereGeometry(4, 32, 12 ), new THREE.MeshBasicMaterial({ map: heatTexture }));

scene.add(heat);

		
// Torus Shape

const torusTexture = new THREE.TextureLoader().load('images/ast.jpg');

const torus = new THREE.Mesh(new THREE.TorusGeometry( 8, 1.7, 4, 50  ), new THREE.MeshBasicMaterial({ map: torusTexture }));
      
const torus2Texture = new THREE.TextureLoader().load('images/ast.jpg');

const torus2 = new THREE.Mesh(new THREE.TorusGeometry( 14, 1.7, 4, 50  ), new THREE.MeshBasicMaterial({ map: torus2Texture }));
      

			scene.add( torus );
      scene.add( torus2 );
			

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(2, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Stars 

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xF9E79F });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

      star.position.set(x, y, z);
      scene.add(star);
}

Array(200).fill().forEach(addStar);


// Background

const spaceTexture = new THREE.TextureLoader().load('images/space.jpg');
  scene.background = spaceTexture;


// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  
  torus2.rotation.y += 0.01;
  torus2.rotation.z += 0.01;


  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();


function animate() {
  requestAnimationFrame(animate);
 
        torus2.rotation.y += 0.01;
        torus2.rotation.z += 0.01;
        
        torus.rotation.z -= 0.002;
        torus.rotation.y -= 0.002;

        heat.rotation.y += 0.001;
        heat.rotation.x += 0.001;

        renderer.render(scene, camera);
      
    }

animate();