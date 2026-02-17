from typing import Optional
from pydantic import BaseModel
from datetime import date

class MenuBase(BaseModel):
    day_of_week: str
    meal_type: str
    items: str

class MenuCreate(MenuBase):
    pass

class MenuUpdate(MenuBase):
    pass

class Menu(MenuBase):
    id: int

    class Config:
        from_attributes = True
