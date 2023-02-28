import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer({
        canvas:document.querySelector('#bg'),
      });
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );


      // const marsmaterial = new THREE.TextureLoader().load('mars.jpg');

		

const torusTexture = new THREE.TextureLoader().load('ast.jpg');

const torus = new THREE.Mesh(new THREE.TorusGeometry( 8, 1.7, 94, 50  ), new THREE.MeshBasicMaterial({ map: torusTexture }));
      
const torus2Texture = new THREE.TextureLoader().load('ast.jpg');

const torus2 = new THREE.Mesh(new THREE.TorusGeometry( 14, 1.7, 94, 50  ), new THREE.MeshBasicMaterial({ map: torus2Texture }));
      

			scene.add( torus );
      scene.add( torus2 );

      

			renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.position.setZ(30);
      camera.position.setX(-3);

// Avatar

const gelTexture = new THREE.TextureLoader().load('sun.jpg');

const gel = new THREE.Mesh(new THREE.SphereGeometry(4, 32, 12 ), new THREE.MeshBasicMaterial({ map: gelTexture }));

scene.add(gel);




renderer.render(scene, camera);

			function animate() {
				requestAnimationFrame( animate );

				torus.rotation.x -= 0.03;
				torus.rotation.y += 0.03;

        torus2.rotation.x -= 0.02;
			

        gel.rotation.y += 0.03;
        gel.rotation.x += 0.03;

				renderer.render( scene, camera );
			}

			animate();


    // Background

      const spaceTexture = new THREE.TextureLoader().load('space.jpg');
        scene.background = spaceTexture;
    
    
// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

