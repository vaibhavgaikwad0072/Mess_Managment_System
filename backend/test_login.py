import requests

def test_login():
    url = "http://localhost:8000/api/v1/login/access-token"
    data = {
        "username": "student@example.com",
        "password": "student123"
    }
    
    # Test with x-www-form-urlencoded
    try:
        print("Testing with x-www-form-urlencoded...")
        response = requests.post(url, data=data)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.text}")
        if response.status_code == 200:
            print("Login Successful!")
        else:
            print("Login Failed!")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_login()
