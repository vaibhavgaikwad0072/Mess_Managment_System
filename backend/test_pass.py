import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.security import verify_password, get_password_hash

try:
    print("Testing password hashing...")
    hash = get_password_hash("test")
    print(f"Hash: {hash}")
    print(f"Verify: {verify_password('test', hash)}")
    print("Password hashing working correctly.")
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
