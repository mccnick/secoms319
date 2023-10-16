// created this file to import the raspberry pi json information

document.addEventListener("DOMContentLoaded", function () {
  fetch("mpu6050_data_2023-10-10_02-12.json")
    .then((response) => response.json())
    .then((data) => {
      displaySensorData(data.sensor_data);
    })
    .catch((error) => {
      console.error("Error fetching the JSON Data: ", error);
    });
});

function displaySensorData(data) {
  const dataContainer = document.getElementById("sensor-data");

  data.forEach((item) => {
    const accelerometerData = item.accelerometer;
    const gyroData = item.gyro;

    const dataHtml = `
            <div class="sensor-item">
                <h4>Accelerometer</h4>
                <p>X: ${accelerometerData.x}</p>
                <p>Y: ${accelerometerData.y}</p>
                <p>Z: ${accelerometerData.z}</p>

                <h4>Gyro</h4>
                <p>X: ${gyroData.x}</p>
                <p>Y: ${gyroData.y}</p>
                <p>Z: ${gyroData.z}</p>
            </div>
            <hr>
        `;

    dataContainer.innerHTML += dataHtml;
  });
}

// TODO: add function to pull appropriate data from json file

// Line chart
const xVal = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

new Chart("accelerometerChart", {
  type: "line",
  data: {
    labels: xVal,
    datasets: [
      {
        label: "Running",
        // TODO: data needs to be one to one with xVal
        data: [3, 20, 5, 60, 34, 54, 1, 33, 45, 23, 43, 21],
        borderColor: "red",
        borderWidth: 2,
        fill: false,
      },
      {
        label: "Not Moving",
        // TODO: data needs to be one to one with xVal
        data: [1, 33, 45, 23, 43, 21, 3, 20, 5, 60, 34, 54],
        borderColor: "green",
        borderWidth: 2,
        fill: false,
      },

      {
        label: "Walking",
        data: [10, 12, 11, 9, 11, 12, 9, 10, 12, 10, 12, 10], // Example data, modify as needed
        borderColor: "yellow",
        borderWidth: 2,
        fill: false,
    },
    
      {
        label: "Cycling",
        // TODO: data needs to be one to one with xVal
        data: [21, 5, 60, 3, 20, 23, 43, 34, 54, 1, 33, 45],
        borderColor: "blue",
        borderWidth: 2,
        fill: false,
      },
    ],
  },
  options: {
    legend: { display: true },
    text: "Recording",
  },
});

// Doughnut chart
const labelVal = ["Running", "Walking", "Cycling", "Not Moving"];
const yValues = [55, 49, 44, 15];
const barColors = ["#b91d47", "#f0db4f", "#2b5797", "#1e7145"];

new Chart("motionType", {
  type: "doughnut",
  data: {
    labels: labelVal,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues,
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Range of motion",
    },
  },
});

// //TODO: Testing 3D scatter graph
// // 3D Scatter graph

// // Create a scene
// var scene = new THREE.Scene();

// // Create a camera
// var camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
// camera.position.z = 5;

// // Create a renderer
// var renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.getElementById("graph-container").appendChild(renderer.domElement); // Append the renderer to the container

// // Example accelerometer data (replace with your data)
// var data = [
//   { x: 1, y: 2, z: 3 },
//   { x: 2, y: 3, z: 4 },
//   { x: 3, y: 4, z: 5 },
//   // { x: 1, y: 2, z: 3 },
//   // { x: 2, y: 3, z: 4 },
//   // { x: 2, y: 3, z: 4 },
//   // { x: 3, y: 4, z: 5 },
//   // Add more data points here
// ];

// // Create data points
// var points = new THREE.Points();
// var geometry = new THREE.BufferGeometry();
// var positions = new Float32Array(data.length * 3);

// for (var i = 0; i < data.length; i++) {
//   positions[i * 3] = data[i].x;
//   positions[i * 3 + 1] = data[i].y;
//   positions[i * 3 + 2] = data[i].z;
// }

// geometry.addAttribute("position", new THREE.BufferAttribute(positions, 3));
// points.geometry = geometry;

// // Create a material
// var material = new THREE.PointsMaterial({ color: 0x00ff00 });

// // Add the points to the scene
// var scatterPlot = new THREE.Points(geometry, material);
// scene.add(scatterPlot);

// // Render the scene
// function animate() {
//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);
// }

// animate();
