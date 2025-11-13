from fastapi import APIRouter
from models.review import Review
from controllers import review_controller

router = APIRouter(prefix="/review", tags=["Review"])

@router.post("/register")
def registerReview(review: Review):
    return review_controller.registerReview(review)

@router.get("/")
def getReviews(service_id: str = None, user_id: str = None):
    return review_controller.getReviews(service_id, user_id)

@router.get("/{review_id}")
def getReview(review_id: str):
    return review_controller.getReview(review_id)

@router.put("/update/{review_id}")
def updateReview(review_id: str, review: Review):
    return review_controller.updateReview(review_id, review)

@router.delete("/delete/{review_id}")
def deleteReview(review_id: str):
    return review_controller.deleteReview(review_id)
