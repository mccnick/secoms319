import os
import time
import json
from mpu6050 import mpu6050

sensor = mpu6050(0x68)
DELAY = 30

def gen_file():
    timestamp = time.strftime("%Y-%m-%d_%H-%M", time.localtime())
    f = f"mpu6050_data_{timestamp}.json"
    return f

def data_folder():
    folder_name = 'sensor_data'
    if not os.path.exists(folder_name):
        os.makedirs(folder_name)
    return folder_name

def r_s():
    try:
        folder_name = data_folder()
        while True:
            f = os.path.join(folder_name, gen_file())
            accel = sensor.get_accel_data()
            gyro = sensor.get_gyro_data()

            sensor_data = {
                "accelerometer": {"x": accel["x"], "y": accel["y"], "z": accel["z"]},
                "gyro": {"x": gyro["x"], "y": gyro["y"], "z": gyro["z"]},
            }

            with open(f, "w") as json_file:
                json.dump(sensor_data, json_file)
                print("Saving to", f)

            time.sleep(DELAY)

    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    print("Reading data from MPU6050 and saving to JSON files.")
    r_s()
