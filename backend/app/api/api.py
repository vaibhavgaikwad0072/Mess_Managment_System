from fastapi import APIRouter

from app.api.endpoints import auth, menus, complaints, feedback

api_router = APIRouter()
api_router.include_router(auth.router, tags=["login"])
api_router.include_router(auth.router, prefix="/users", tags=["users"]) # Reuse auth for signup
api_router.include_router(menus.router, prefix="/menus", tags=["menus"])
api_router.include_router(complaints.router, prefix="/complaints", tags=["complaints"])
api_router.include_router(feedback.router, prefix="/feedback", tags=["feedback"])
