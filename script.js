import * as THREE from 'three';

function cylinderVolume(radius, height) {
    /** Calculate the volume of a cylinder. */
    return Math.PI * Math.pow(radius, 2) * height;
}

function plotCylinder(radius, height, filledVolume) {
    /** Visualize the cylinder with the specified filled volume. */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('visualization').innerHTML = ''; // Clear previous visualizations
    document.getElementById('visualization').appendChild(renderer.domElement);

    // Create data for the cylinder
    const geometry = new THREE.CylinderGeometry(radius, radius, height, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xD3D3D3, transparent: true, opacity: 0.5 });
    const cylinder = new THREE.Mesh(geometry, material);
    scene.add(cylinder);

    // Calculate the height of the filled volume
    let filledHeight = filledVolume / (Math.PI * Math.pow(radius, 2));

    // Cap the filled height to the cylinder height
    filledHeight = Math.min(filledHeight, height);

    // Create filled cylinder for the volume
    const filledGeometry = new THREE.CylinderGeometry(radius, radius, filledHeight, 32);
    const filledMaterial = new THREE.MeshBasicMaterial({ color: 0x0000FF, transparent: true, opacity: 0.7 });
    const filledCylinder = new THREE.Mesh(filledGeometry, filledMaterial);
    filledCylinder.position.y = filledHeight / 2; // Position it correctly
    scene.add(filledCylinder);

    // Set camera position
    camera.position.z = Math.max(height, 5);

    // Render the scene
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}

document.getElementById('cylinder-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const diameter = parseFloat(document.getElementById('diameter').value);
    const height = parseFloat(document.getElementById('height').value);
    let volumeInput = parseFloat(document.getElementById('volume').value);
    const unit = document.getElementById('unit').value;

    // Convert diameter to radius
    const radius = diameter / 2;

    // Convert volume to cubic centimeters
    let volumeInCm3;
    switch (unit) {
        case 'mL':
            volumeInCm3 = volumeInput; // 1 mL = 1 cm³
            break;
        case 'L':
            volumeInCm3 = volumeInput * 1000; // 1 L = 1000 cm³
            break;
        case 'm3':
            volumeInCm3 = volumeInput * 1000000; // 1 m³ = 1,000,000 cm³
            break;
        default:
            volumeInCm3 = volumeInput; // cm³
    }

    // Calculate the total volume of the cylinder
    const totalVolume = cylinderVolume(radius, height);

    // Check if the volume to visualize exceeds the cylinder's volume
    if (volumeInCm3 > totalVolume) {
        alert("The volume exceeds the cylinder's total volume. Adjusting to maximum capacity.");
        volumeInCm3 = totalVolume;
    }

    // Plot the cylinder with the specified filled volume
    plotCylinder(radius, height, volumeInCm3);
});
