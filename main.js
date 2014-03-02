/**
 * Created by kalebmurphy on 1/28/14.
 */





var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
//    renderer.setClearColor( 0xffffff, 1)
document.getElementById('viewport').appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 1.7;
camera.lookAt(new THREE.Vector3(0, 0, 0));


var sphereRadius = 1, segments = 40, rings = 5;
var radius = (sphereRadius / (rings) * Math.PI) / 2 ;
var mesh = [];

var geo = [];

for (var i = 0; i < rings; i++) {
    var centerGeo = normalizeGeo(new THREE.HexGeometry(radius, segments, 0));
    var outerGeo = normalizeGeo(new THREE.HexGeometry(radius, segments, segments / 2));
    if (i == 0) {
        geo[i] = centerGeo.clone();
    }
    else {
        geo[i] = outerGeo.clone();
    }
    mesh[i] = new THREE.Mesh(projectGeo(geo[i], sphereRadius), new THREE.MeshNormalMaterial({wireframe: true }));
    scene.add(mesh[i]);

    radius *= 2;
}

function normalizeGeo(geo) {
    var vertices = geo.vertices;
    for (var i = 0; i < vertices.length; i++) {
        vertices[i].z = sphereRadius;
        vertices[i] = vertices[i].normalize();
    }
    return geo;
}

function projectGeo(geo, rad) {
    var vertices = geo.vertices;
    for (var i = 0; i < vertices.length; i++) {
        vertices[i].multiplyScalar(rad);
    }
    return geo;
}


function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
};

render();


