// created this file to import the raspberry pi json information

document.addEventListener("DOMContentLoaded", function() {
    fetch('mpu6050_data_2023-10-10_02-12.json')
        .then(response => response.json())
        .then(data => {
            displaySensorData(data.sensor_data);
        })
        .catch(error => {
            console.error("Error fetching the JSON Data: ", error);
        });
});

function displaySensorData(data) {
    const dataContainer = document.getElementById("sensor-data");

    data.forEach(item => {
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
