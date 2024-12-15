from fastapi import FastAPI
from datetime import datetime
import psutil
import platform
import requests
import GPUtil
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv 
from fastapi.responses import JSONResponse

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

@app.get("/gpu-usage")
def get_gpu_usage():
    try: 
        gpus = GPUtil.getGPUs() 
        if not gpus:
            return JSONResponse(
                content={"message": "No GPUs available on the server."},
                status_code=200
            ) 
        return [{"gpu": gpu.name, "load": gpu.load * 100} for gpu in gpus]

    except Exception as e: 
        return JSONResponse(
            content={"error": f"An error occurred while fetching GPU data: {str(e)}"},
            status_code=500
        )


# location
@app.get("/location")
def get_location():
    try:
        response = requests.get("https://ipinfo.io")
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": "Failed to fetch location", "details": str(e)}
