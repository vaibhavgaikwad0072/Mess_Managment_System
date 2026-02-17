from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api import deps
from app.models.complaint import Complaint
from app.schemas.complaint import ComplaintCreate, ComplaintUpdate, Complaint as ComplaintSchema
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[ComplaintSchema])
def read_complaints(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    if current_user.role == "admin":
         complaints = db.query(Complaint).offset(skip).limit(limit).all()
    else:
         complaints = db.query(Complaint).filter(Complaint.user_id == current_user.id).offset(skip).limit(limit).all()
    return complaints

@router.post("/", response_model=ComplaintSchema)
def create_complaint(
    *,
    db: Session = Depends(deps.get_db),
    complaint_in: ComplaintCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    complaint = Complaint(**complaint_in.dict(), user_id=current_user.id)
    db.add(complaint)
    db.commit()
    db.refresh(complaint)
    return complaint

@router.put("/{complaint_id}", response_model=ComplaintSchema)
def update_complaint_status(
    *,
    db: Session = Depends(deps.get_db),
    complaint_id: int,
    complaint_in: ComplaintUpdate,
    current_user: User = Depends(deps.get_current_active_admin),
) -> Any:
    complaint = db.query(Complaint).filter(Complaint.id == complaint_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
    complaint.status = complaint_in.status
    db.add(complaint)
    db.commit()
    db.refresh(complaint)
    return complaint
