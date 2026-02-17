from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api import deps
from app.models.feedback import Feedback
from app.schemas.feedback import FeedbackCreate, Feedback as FeedbackSchema
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[FeedbackSchema])
def read_feedbacks(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(deps.get_current_active_admin),
) -> Any:
    feedbacks = db.query(Feedback).offset(skip).limit(limit).all()
    return feedbacks

@router.post("/", response_model=FeedbackSchema)
def create_feedback(
    *,
    db: Session = Depends(deps.get_db),
    feedback_in: FeedbackCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    feedback = Feedback(**feedback_in.dict(), user_id=current_user.id)
    db.add(feedback)
    db.commit()
    db.refresh(feedback)
    return feedback
