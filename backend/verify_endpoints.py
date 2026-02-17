import requests
import json

def verify_endpoints():
    print("Verifying Backend Endpoints...")
    base_url = "http://127.0.0.1:8000"
    
    # Try different combinations
    endpoints = [
        "/api/v1/login/json",
        "/api/v1/login/json/",
        "/login/json",
        "/api/v1/login/access-token"
    ]
    
    for ep in endpoints:
        url = base_url + ep
        try:
            # Try POST first as it's a POST endpoint
            response = requests.post(url, json={"email": "student@example.com", "password": "student123"}, timeout=5)
            print(f"POST {ep} -> Status: {response.status_code}")
            if response.status_code == 200:
                print(f"  [FOUND IT!]")
        except Exception as e:
            print(f"POST {ep} -> Error: {e}")

if __name__ == "__main__":
    verify_endpoints()
