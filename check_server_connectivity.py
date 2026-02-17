import requests
import sys

BACKEND_URL = "http://127.0.0.1:8000"

def check_backend_status():
    print(f"Checking backend at {BACKEND_URL}...")
    try:
        # Check root
        resp = requests.get(f"{BACKEND_URL}/")
        print(f"Root: {resp.status_code}")
        
        # Check docs
        resp = requests.get(f"{BACKEND_URL}/docs")
        print(f"Docs: {resp.status_code}")
        
        # Check CORS (OPTIONS request)
        print("Checking CORS...")
        resp = requests.options(f"{BACKEND_URL}/api/v1/login/access-token", headers={
            "Origin": "http://localhost:5173",
            "Access-Control-Request-Method": "POST"
        })
        print(f"Options Status: {resp.status_code}")
        print(f"Access-Control-Allow-Origin: {resp.headers.get('access-control-allow-origin')}")
        
    except Exception as e:
        print(f"FAILED to connect: {e}")
        sys.exit(1)

if __name__ == "__main__":
    check_backend_status()
