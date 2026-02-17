import requests

URL = "http://127.0.0.1:8000/api/v1/login/access-token"
CREDENTIALS = {"username": "student@example.com", "password": "student123"}

def test_urlencoded():
    print("Testing application/x-www-form-urlencoded...")
    response = requests.post(URL, data=CREDENTIALS)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")

def test_multipart():
    print("\nTesting multipart/form-data...")
    # requests handles multipart if 'files' is provided or if data is a dict and header assumes it?
    # actually requests sends x-www-form-urlencoded by default for 'data' dict.
    # to send multipart, we usually use 'files'. But let's try to simulate what axios FormData does.
    # explicit multipart
    from requests_toolbelt.multipart.encoder import MultipartEncoder
    m = MultipartEncoder(fields=CREDENTIALS)
    response = requests.post(URL, data=m, headers={'Content-Type': m.content_type})
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")

if __name__ == "__main__":
    try:
        test_urlencoded()
    except Exception as e:
        print(f"Urlencoded failed: {e}")
    
    # We might not have requests_toolbelt, so let's skip complex multipart if not available
    # But standard 'files' acts as multipart
    print("\nTesting multipart/form-data (via files param hack)...")
    # Sending as files forces multipart
    response = requests.post(URL, files={k: (None, v) for k, v in CREDENTIALS.items()})
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")
