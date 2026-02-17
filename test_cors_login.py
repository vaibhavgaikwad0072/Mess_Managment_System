import requests

URL = "http://127.0.0.1:8000/api/v1/login/access-token"

# Simulate exactly what the frontend sends
headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Origin": "http://localhost:5173"
}

data = {
    "username": "student@example.com",
    "password": "student123"
}

print("Testing POST request with CORS headers...")
try:
    response = requests.post(URL, data=data, headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")
    print(f"\nCORS Headers in Response:")
    print(f"Access-Control-Allow-Origin: {response.headers.get('access-control-allow-origin')}")
    print(f"Access-Control-Allow-Credentials: {response.headers.get('access-control-allow-credentials')}")
except Exception as e:
    print(f"Error: {e}")
