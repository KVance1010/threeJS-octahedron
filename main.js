import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let camera, scene, renderer, mesh, controls;

init();
animate();

function init() {
    // Initialize scene
    scene = new THREE.Scene();

    // Set up the camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, -80, 100); // Position the camera
    camera.lookAt(new THREE.Vector3(0, 0, 0)); // Look at the center of the scene

    scene.add(camera);

    // Create initial octahedron mesh
    mesh = createMesh(new THREE.OctahedronGeometry(15, 0));

    // Apply initial rotation to ensure one vertex is facing up
    mesh.rotation.x = Math.PI / 4; // Tilt to make a point face upwards
    mesh.rotation.y = 0; // No additional rotation around Y-axis initially

    // Position the octahedron so its top point is near the top of the view
    mesh.position.set(0, 0, 0); // Center the octahedron in the scene

    scene.add(mesh);

    // Set up lighting
    const ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);
    const spotLight = new THREE.SpotLight(0xffffff);
    scene.add(spotLight);

    // Set up renderer
    renderer = new THREE.WebGLRenderer(); // Use WebGLRenderer
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Set background color to black
    renderer.setClearColor(0x000000);

    document.body.appendChild(renderer.domElement);

    // Initialize OrbitControls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Animation loop is required if damping is enabled
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.autoRotate = false; // Set to true if you want auto-rotation
}

function createMesh(geom) {
    // Wireframe material with color #1F5368
    const wireFrameMat = new THREE.MeshBasicMaterial({
        color: 0x1F5368,
        wireframe: true
    });
    
    // Create mesh with wireframe material
    const mesh = new THREE.Mesh(geom, wireFrameMat);

    return mesh;
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    // Update controls
    controls.update(); // Only required if controls.enableDamping = true or controls.autoRotate = true

    mesh.rotation.x += 0.001; // Slow down the rotation speed on x-axis
    mesh.rotation.y += 0.001; // Increase the rotation speed around y-axis

    renderer.render(scene, camera);
}
