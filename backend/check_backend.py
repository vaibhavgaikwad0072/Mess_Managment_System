import requests
import sys

def check_backend():
    """Check if the backend server is running and accessible."""
    url = "http://127.0.0.1:8000/"
    
    print("Checking backend server...")
    print(f"URL: {url}")
    print("-" * 50)
    
    try:
        response = requests.get(url, timeout=5)
        if response.status_code == 200:
            print("[OK] Backend server is running!")
            print(f"Response: {response.json()}")
            return True
        else:
            print(f"[ERROR] Backend server returned status code: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("[ERROR] Cannot connect to backend server!")
        print("\nTo start the backend server:")
        print("1. Open a terminal")
        print("2. Navigate to: c:\\Users\\lenovo\\Desktop\\Hostel_mess_Managment\\backend")
        print("3. Run: uvicorn app.main:app --reload")
        return False
    except requests.exceptions.Timeout:
        print("[ERROR] Connection timeout!")
        print("The server might be slow to respond.")
        return False
    except Exception as e:
        print(f"[ERROR] {e}")
        return False

if __name__ == "__main__":
    success = check_backend()
    sys.exit(0 if success else 1)
