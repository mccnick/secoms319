import os
import time
import json
from mpu6050 import mpu6050

# Initialise mpu6050 sensor
sensor = mpu6050(0x68)  # Use the correct I2C address of sensor

# TODO: Find appropriate delay for sensor
##  Sensor reading Delay
DELAY = 1

# Get the current directory where the Python script is located
script_dir = os.path.dirname(os.path.abspath(__file__))


### Generates file with filename and a timestamp
def generate_filename():
    timestamp = time.strftime("%Y-%m-%d_%H-%M", time.localtime())
    filename = f"mpu6050_data_{timestamp}.json"
    return filename


### Generates a new folder to store files created
def data_folder():
    folder_name = os.path.join(script_dir, "sensor_data")
    if not os.path.exists(folder_name):
        os.makedirs(folder_name)
    return folder_name



### Function to read sensor data and append to JSON file
def read_and_save():
    try:
        folder_name = data_folder()
        filename = os.path.join(folder_name, generate_filename())
        while True:
            accel = sensor.get_accel_data()
            gyro = sensor.get_gyro_data()
            temperature = sensor.get_temp()

            #### Create a dictionary to store the data
            sensor_data = {
                "accelerometer": {"x": accel["x"], "y": accel["y"], "z": accel["z"]},
                # "gyroscope": {"x": gyro["x"], "y": gyro["y"], "z": gyro["z"]},
                # "temperature": temperature,
            }

            #### Append data to the current JSON file
            if os.path.exists(filename):
                with open(filename, "r") as json_file:
                    existing_data = json.load(json_file)
                sensor_data_list = existing_data.get("sensor_data", [])
                sensor_data_list.append(sensor_data)
                sensor_data = {"sensor_data": sensor_data_list}

            with open(filename, "w") as json_file:
                json.dump(sensor_data, json_file, indent=4)
                print("Adding to", filename)

            time.sleep(DELAY)

    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    print("Reading data from MPU6050.")
    read_and_save()
