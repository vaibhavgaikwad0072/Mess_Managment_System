import sys
import os

# Add the current directory to sys.path to ensure 'app' can be imported correctly
# This assumes the script is run from the 'backend' directory or that 'backend' is the current working directory
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.db.session import SessionLocal
from app.models.user import User, UserRole
from app.core.security import get_password_hash

def create_users():
    db = SessionLocal()
    try:
        # Create Student
        student_email = "student@example.com"
        student = db.query(User).filter(User.email == student_email).first()
        if not student:
            print(f"Creating student user: {student_email}")
            student = User(
                email=student_email,
                hashed_password=get_password_hash("student123"),
                full_name="Student User",
                role=UserRole.STUDENT.value,
                is_active=True
            )
            db.add(student)
        else:
            print(f"Student user {student_email} already exists. Updating password.")
            student.hashed_password = get_password_hash("student123")
            db.add(student)

        # Create Admin
        admin_email = "admin@example.com"
        admin = db.query(User).filter(User.email == admin_email).first()
        if not admin:
            print(f"Creating admin user: {admin_email}")
            admin = User(
                email=admin_email,
                hashed_password=get_password_hash("admin123"),
                full_name="Admin User",
                role=UserRole.ADMIN.value,
                is_active=True
            )
            db.add(admin)
        else:
            print(f"Admin user {admin_email} already exists. Updating password.")
            admin.hashed_password = get_password_hash("admin123")
            db.add(admin)
        
        db.commit()
        print("Users created/verified successfully.")
    except Exception as e:
        print(f"Error creating users: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_users()
