from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api import deps
from app.models.menu import Menu
from app.schemas.menu import MenuCreate, MenuUpdate, Menu as MenuSchema
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[MenuSchema])
def read_menus(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    menus = db.query(Menu).offset(skip).limit(limit).all()
    return menus

@router.post("/", response_model=MenuSchema)
def create_menu(
    *,
    db: Session = Depends(deps.get_db),
    menu_in: MenuCreate,
    current_user: User = Depends(deps.get_current_active_admin),
) -> Any:
    menu = Menu(**menu_in.dict())
    db.add(menu)
    db.commit()
    db.refresh(menu)
    return menu

@router.put("/{menu_id}", response_model=MenuSchema)
def update_menu(
    *,
    db: Session = Depends(deps.get_db),
    menu_id: int,
    menu_in: MenuUpdate,
    current_user: User = Depends(deps.get_current_active_admin),
) -> Any:
    menu = db.query(Menu).filter(Menu.id == menu_id).first()
    if not menu:
        raise HTTPException(status_code=404, detail="Menu not found")
    for key, value in menu_in.dict(exclude_unset=True).items():
        setattr(menu, key, value)
    db.add(menu)
    db.commit()
    db.refresh(menu)
    return menu
