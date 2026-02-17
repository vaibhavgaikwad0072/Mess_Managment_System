from sqlalchemy import Column, Integer, String, Date, Text, Enum
from app.db.base_class import Base
import enum

class MealType(str, enum.Enum):
    BREAKFAST = "breakfast"
    LUNCH = "lunch"
    DINNER = "dinner"

class DayOfWeek(str, enum.Enum):
    MONDAY = "Monday"
    TUESDAY = "Tuesday"
    WEDNESDAY = "Wednesday"
    THURSDAY = "Thursday"
    FRIDAY = "Friday"
    SATURDAY = "Saturday"
    SUNDAY = "Sunday"

class Menu(Base):
    id = Column(Integer, primary_key=True, index=True)
    day_of_week = Column(String, nullable=False)
    meal_type = Column(String, nullable=False)
    items = Column(Text, nullable=False) # JSON string or comma separated
