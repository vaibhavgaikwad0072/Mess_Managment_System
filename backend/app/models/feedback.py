from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class Feedback(Base):
    id = Column(Integer, primary_key=True, index=True)
    rating = Column(Integer, nullable=False) # 1-5
    comment = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user_id = Column(Integer, ForeignKey("user.id"))
    user = relationship("User", backref="feedbacks")
