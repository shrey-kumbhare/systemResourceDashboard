# main.py
from fastapi import FastAPI
import psutil
import platform
import requests

app = FastAPI()

@app.get("/system-info")
def get_system_info():
    # Get current time
    current_time = psutil.boot_time()

    # Get Python version
    python_version = platform.python_version()

    # Get battery status
    battery_status = psutil.sensors_battery()

    # Get CPU temperature and usage
    cpu_temperature = psutil.sensors_temperatures()
    cpu_usage = psutil.cpu_percent()

    # Get RAM usage
    ram_usage = psutil.virtual_memory().percent

    # Get GPU usage (Note: This requires a separate library like GPUtil)
    # gpu_usage = GPUtil.getGPUs()[0].load * 100

    # Get approximate location based on IP address
    ip_address = requests.get('https://api.ipify.org').text
    location_response = requests.get(f'https://ipapi.co/{ip_address}/json/').json()
    location = location_response['city'] + ', ' + location_response['region']

    return {
        "current_time": current_time,
        "python_version": python_version,
        "battery_status": battery_status,
        "cpu_temperature": cpu_temperature,
        "cpu_usage": cpu_usage,
        "ram_usage": ram_usage,
        "location": location
    }