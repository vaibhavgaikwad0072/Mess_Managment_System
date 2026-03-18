import sys
import os
from datetime import datetime, timedelta
import random

# Add current directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.db.session import SessionLocal
from app.models.user import User, UserRole
from app.models.menu import Menu
from app.models.complaint import Complaint
from app.models.feedback import Feedback
from app.core.security import get_password_hash

def seed_data():
    db = SessionLocal()
    try:
        print("Seeding high-fidelity dataset...")

        # 1. Create Users
        users = [
            {"email": "admin@example.com", "name": "System Admin", "role": UserRole.ADMIN, "pass": "admin123"},
            {"email": "student@example.com", "name": "Rahul Sharma", "role": UserRole.STUDENT, "pass": "student123"},
            {"email": "priya@example.com", "name": "Priya Patel", "role": UserRole.STUDENT, "pass": "student123"},
            {"email": "amit@example.com", "name": "Amit Kumar", "role": UserRole.STUDENT, "pass": "student123"},
        ]

        user_objs = {}
        for u in users:
            user = db.query(User).filter(User.email == u["email"]).first()
            if not user:
                print(f"  Creating user: {u['email']}")
                user = User(
                    email=u["email"],
                    hashed_password=get_password_hash(u["pass"]),
                    full_name=u["name"],
                    role=u["role"].value,
                    is_active=True
                )
                db.add(user)
                db.flush()
            user_objs[u["email"]] = user

        # 2. Create Weekly Menu
        days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        menu_items = {
            "Monday": {"breakfast": "Idli Sambar & Tea", "lunch": "Veg Thali (Dal, Paneer, Roti)", "dinner": "Mixed Veg & Paratha"},
            "Tuesday": {"breakfast": "Poha & Jalebi", "lunch": "Rajma Rice & Salad", "dinner": "Chicken/Paneer Curry & Rice"},
            "Wednesday": {"breakfast": "Aloo Paratha & Curd", "lunch": "Chole Bhature", "dinner": "Kadhi Pakoda & Rice"},
            "Thursday": {"breakfast": "Bread Butter & Omelet", "lunch": "South Indian Thali", "dinner": "Veg Biryani & Raita"},
            "Friday": {"breakfast": "Upma & Coffee", "lunch": "Mix Dal & Bhindi Fry", "dinner": "Egg Curry / Malai Kofta"},
            "Saturday": {"breakfast": "Puri Sabzi", "lunch": "Pasta & Garlic Bread", "dinner": "Chinese Combo (Noodles/Manchurian)"},
            "Sunday": {"breakfast": "Stuffed Paratha", "lunch": "Special Hyderabadi Biryani", "dinner": "Light Khichdi & Papad"},
        }

        # Clear existing menu
        db.query(Menu).delete()
        for day in days:
            for meal_type, items in menu_items[day].items():
                menu_entry = Menu(
                    day_of_week=day,
                    meal_type=meal_type,
                    items=items
                )
                db.add(menu_entry)

        # 3. Create Sample Complaints
        complaint_data = [
            {"title": "Water cooler not working", "desc": "The water cooler on the 2nd floor has been broken for 2 days.", "cat": "hygiene", "status": "open", "user": "student@example.com"},
            {"title": "Food was too salty", "desc": "Today's lunch (Rajma) had excessive salt.", "cat": "food", "status": "resolved", "user": "priya@example.com"},
            {"title": "Late dinner service", "desc": "Dinner started 20 mins late today.", "cat": "service", "status": "in-progress", "user": "amit@example.com"},
            {"title": "Exhaust fan noise", "desc": "The exhaust fan in the dining hall is making loud noises.", "cat": "other", "status": "open", "user": "student@example.com"},
        ]

        for c in complaint_data:
            complaint = Complaint(
                title=c["title"],
                description=c["desc"],
                category=c["cat"],
                status=c["status"],
                student_id=user_objs[c["user"]].id,
                created_at=datetime.utcnow() - timedelta(days=random.randint(1, 5))
            )
            db.add(complaint)

        # 4. Create Sample Feedback
        feedback_comments = [
            "Great breakfast today!", "The paneer was fresh.", "Wait time for lunch was too long.",
            "Really enjoyed the Sunday Biryani.", "Hygiene in the wash area needs improvement.",
            "Staff was very polite today."
        ]
        
        for _ in range(15):
            u_email = random.choice(list(user_objs.keys()))
            if user_objs[u_email].role == UserRole.STUDENT.value:
                fb = Feedback(
                    rating=random.randint(3, 5),
                    comment=random.choice(feedback_comments),
                    meal_type=random.choice(["breakfast", "lunch", "dinner"]),
                    student_id=user_objs[u_email].id
                )
                db.add(fb)

        db.commit()
        print("Database successfully seeded with professional data!")
        print("\nCredentials:")
        print("  Admin:   admin@example.com / admin123")
        print("  Student: student@example.com / student123")

    except Exception as e:
        print(f"Error seeding data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
