var camera, scene, renderer, mesh, stats;

init();
animate();

function init() {
    stats = initStats();
    
    // Setup controls
    var controls = new function() {
        this.radius = 10;
        this.detail = 0;
        this.type = 'Octahedron'; // Set to 'Octahedron' by default

        this.redraw = function() {
            // Remove the old mesh
            scene.remove(mesh);
            
            // Create a new mesh with the selected geometry
            if (controls.type === 'Octahedron') {
                mesh = createMesh(new THREE.OctahedronGeometry(controls.radius, controls.detail));
                scene.add(mesh);
            }
        };
    }

    var gui = new dat.GUI();
    gui.add(controls, 'radius', 0, 40).step(1).onChange(controls.redraw);
    gui.add(controls, 'detail', 0, 3).step(1).onChange(controls.redraw);
    gui.add(controls, 'type', ['Octahedron']).onChange(controls.redraw); // Only Octahedron option

    scene = new THREE.Scene();

    // Set up the camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, -80, 100); // Position the camera higher
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

    var ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);
    var spotLight = new THREE.SpotLight(0xffffff);
    scene.add(spotLight);

    renderer = new THREE.WebGLRenderer(); // Use WebGLRenderer
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Set background color to black
    renderer.setClearColor(0x000000);

    document.body.appendChild(renderer.domElement);
}

function createMesh(geom) {
    // Wireframe material with color #1F5368
    var wireFrameMat = new THREE.MeshBasicMaterial({
        color: 0x1F5368,
        wireframe: true
    });
    
    // Create mesh with wireframe material
    var mesh = new THREE.Mesh(geom, wireFrameMat);

    return mesh;
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    stats.update();
    
    mesh.rotation.x += 0.001; // Slow down the rotation speed on x-axis
    mesh.rotation.y += 0.001; // Increase the rotation speed around y-axis

    renderer.render(scene, camera);
}

function initStats() {
    var stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms

    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.body.appendChild(stats.domElement);

    return stats;
}
