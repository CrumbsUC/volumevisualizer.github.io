document.getElementById('cylinder-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const diameter = parseFloat(document.getElementById('diameter').value);
    const height = parseFloat(document.getElementById('height').value);
    const volumeInput = parseFloat(document.getElementById('volume').value);
    const unit = document.getElementById('unit').value;

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

    const radius = diameter / 2;
    const totalVolume = Math.PI * Math.pow(radius, 2) * height;

    if (volumeInCm3 > totalVolume) {
        alert("The volume exceeds the cylinder's total volume. Adjusting to maximum capacity.");
        volumeInCm3 = totalVolume;
    }

    visualizeCylinder(radius, height, volumeInCm3);
});

function visualizeCylinder(radius, height, filledVolume) {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    document.getElementById('visualization').innerHTML = ''; // Clear previous visualizations
    document.getElementById('visualization').appendChild(canvas);

    const ctx = canvas.getContext('2d');

    // Draw cylinder outline (the body)
    ctx.fillStyle = 'lightgray';
    ctx.fillRect(150, 100, radius * 2, height); // Draw the cylinder's body

    // Draw the top of the cylinder
    ctx.beginPath();
    ctx.arc(150 + radius, 100, radius, 0, Math.PI, true);
    ctx.fill();

    // Draw the bottom of the cylinder
    ctx.beginPath();
    ctx.arc(150 + radius, 100 + height, radius, 0, Math.PI, false);
    ctx.fill();

    // Calculate filled height
    const filledHeight = filledVolume / (Math.PI * Math.pow(radius, 2));

    // Draw filled volume
    ctx.fillStyle = 'blue';
    ctx.fillRect(150, 100 + (height - filledHeight), radius * 2, filledHeight); // Draw the filled part

    // Draw the top of the filled volume
    ctx.beginPath();
    ctx.arc(150 + radius, 100 + (height - filledHeight), radius, 0, Math.PI, true);
    ctx.fill();
}
