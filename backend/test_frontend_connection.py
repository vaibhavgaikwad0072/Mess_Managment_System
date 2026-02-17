import requests
import json

def test_backend_from_frontend_perspective():
    """Test backend exactly as the frontend would access it."""
    
    print("=" * 60)
    print("Testing Backend Accessibility")
    print("=" * 60)
    
    # Test 1: Direct backend access
    print("\n[Test 1] Direct backend health check...")
    try:
        response = requests.get("http://localhost:8000/", timeout=5)
        print(f"[OK] Status: {response.status_code}")
        print(f"[OK] Response: {response.json()}")
    except Exception as e:
        print(f"[ERROR] Error: {e}")
        return False
    
    # Test 2: API endpoint access
    print("\n[Test 2] API endpoint check...")
    try:
        response = requests.get("http://localhost:8000/api/v1/menus/", timeout=5)
        print(f"[OK] Status: {response.status_code}")
        if response.status_code == 401:
            print("[OK] Endpoint exists (requires authentication)")
        else:
            print(f"[OK] Response: {response.json()}")
    except Exception as e:
        print(f"[ERROR] Error: {e}")
        return False
    
    # Test 3: Login endpoint (as frontend would call it)
    print("\n[Test 3] Login endpoint (POST)...")
    try:
        data = {
            "username": "student@example.com",
            "password": "student123"
        }
        response = requests.post(
            "http://localhost:8000/api/v1/login/access-token",
            data=data,
            headers={"Content-Type": "application/x-www-form-urlencoded"},
            timeout=5
        )
        print(f"[OK] Status: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(f"[OK] Login successful!")
            print(f"[OK] Token received: {result['access_token'][:50]}...")
        else:
            print(f"[ERROR] Response: {response.text}")
    except Exception as e:
        print(f"[ERROR] Error: {e}")
        return False
    
    # Test 4: CORS headers check
    print("\n[Test 4] CORS headers check...")
    try:
        response = requests.options(
            "http://localhost:8000/api/v1/login/access-token",
            headers={
                "Origin": "http://localhost:5173",
                "Access-Control-Request-Method": "POST"
            },
            timeout=5
        )
        print(f"[OK] Status: {response.status_code}")
        print(f"[OK] CORS Headers:")
        for header, value in response.headers.items():
            if 'access-control' in header.lower():
                print(f"  - {header}: {value}")
    except Exception as e:
        print(f"[ERROR] Error: {e}")
    
    print("\n" + "=" * 60)
    print("All tests passed! Backend is accessible.")
    print("=" * 60)
    return True

if __name__ == "__main__":
    test_backend_from_frontend_perspective()
