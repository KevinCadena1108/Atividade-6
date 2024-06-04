import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Crie uma cena
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  10000 // aumente este valor
);
camera.position.set(0, 20, 50); // Posicione a câmera para olhar para o piano

// Crie um renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff); // Define a cor de fundo para branco
document.body.appendChild(renderer.domElement);

// Adicione luz
const light = new THREE.AmbientLight(0xffffff, 0.5); // luz ambiente fraca
scene.add(light);

// Controles de órbita
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0); // Faz a câmera orbitar ao redor do centro da cena
controls.update();

// Carregue um modelo GLTF
const loader = new GLTFLoader();
loader.load(
  "Modelos3D/retro_piano/scene.gltf", // substitua pelo caminho do seu modelo
  function (gltf) {
    gltf.scene.position.set(0, -0.015, 0); // Posicione o meio do modelo no centro da cena
    gltf.scene.scale.set(0.03, 0.03, 0.03); // Reduza o tamanho do modelo
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
// Carregue um segundo modelo GLTF
const loader2 = new GLTFLoader();
loader2.load(
  "Modelos3D/lampada/scene.gltf",
  function (gltf) {
    gltf.scene.position.set(-20, 40, -30); // Posicione a lâmpada em cima do piano
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Carregue um terceiro modelo GLTF
const loader3 = new GLTFLoader();
loader3.load(
  "Modelos3D/pessoa/scene.gltf", // substitua pelo caminho do seu modelo
  function (gltf) {
    gltf.scene.position.set(-20, -10, 30); // Posicione o modelo conforme necessário
    gltf.scene.scale.set(17, 17, 17); // Aumente o tamanho do modelo
    gltf.scene.rotation.y = Math.PI; // Vire o modelo para o outro lado
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Função de animação
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
// Crie a geometria do plano
const planeGeometry = new THREE.PlaneGeometry(100, 100);

// Crie o material azul fraco
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  side: THREE.DoubleSide,
});

// Crie o plano com a geometria e o material
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

// Rotacione o plano para que ele fique horizontal
plane.rotation.x = Math.PI / 2;

// Mova o plano mais para baixo
plane.position.y = -10; // Altere este valor conforme necessário
plane.position.x = -20;

// Adicione o plano à cena
scene.add(plane);

// Inicie a animação
animate();
