from fastapi import FastAPI
from datetime import datetime
import psutil
import platform
import requests
import GPUtil
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv 

load_dotenv()

app = FastAPI()

allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")

# middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins, 
    allow_methods=["*"],
    allow_headers=["*"],
)

# time
@app.get("/time")
def get_time():
    return {"current_time": datetime.now().isoformat()}

# version
@app.get("/python-version")
def get_python_version():
    return {"python_version": platform.python_version()}

# battery
@app.get("/battery-status")
def get_battery_status():
    battery = psutil.sensors_battery()
    return {"battery_percent": battery.percent, "plugged": battery.power_plugged}

# ram
@app.get("/cpu-ram-usage")
def get_cpu_ram_usage():
    return {
        "cpu_percent": psutil.cpu_percent(interval=1),
        "ram_usage": psutil.virtual_memory().percent,
    }

# temp
@app.get("/cpu-temp")
def get_cpu_temp():
    try:
        temp = psutil.sensors_temperatures().get("coretemp", [])
        return {"cpu_temp": temp[0].current if temp else None}
    except AttributeError: 
        return {"cpu_temp": "N/A"}   

# gpu
@app.get("/gpu-usage")
def get_gpu_usage():
    gpus = GPUtil.getGPUs()
    return [{"gpu": gpu.name, "load": gpu.load * 100} for gpu in gpus]

# location
@app.get("/location")
def get_location():
    response = requests.get("https://ipinfo.io")
    return response.json()
