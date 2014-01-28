/**
 * Created by kalebmurphy on 1/28/14.
 */





var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
//    renderer.setClearColor( 0xffffff, 1)
document.getElementById('viewport').appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 5;
camera.lookAt(new THREE.Vector3(0, 0, 0));

var i = 1;

var hex = new THREE.HexGeometry(1, 6, i, true);

var hex2 = new THREE.HexGeometry(1, 6, i+1, false);

var mesh = new THREE.Mesh(hex,new THREE.MeshNormalMaterial({wireframe: true }));
var mesh2 = new THREE.Mesh(hex2,new THREE.MeshNormalMaterial({wireframe: true }));

mesh.position = new THREE.Vector3(-1,0,0);
mesh2.position = new THREE.Vector3(1,0,0);
scene.add(mesh);
scene.add(mesh2);

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
};

render();


