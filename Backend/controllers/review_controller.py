from models.review import Review
from database import db
from bson import ObjectId
from utils import ResponseMessage

collection = db["reviews"]

def registerReview(review: Review):
    try:
        result = collection.insert_one(review.model_dump())
        if result.inserted_id:
            return ResponseMessage.message200
        return ResponseMessage.message400
    except Exception as e:
        print("Error en registerReview:", e)
        return ResponseMessage.message500


def getReviews(service_id: str = None, user_id: str = None):
    try:
        query = {}
        if service_id:
            query["service_id"] = service_id
        if user_id:
            query["user_id"] = user_id

        reviews = []
        cursor = collection.find(query)
        for doc in cursor:
            doc["_id"] = str(doc["_id"])
            reviews.append(doc)

        return {
            **ResponseMessage.message200,
            "data": reviews,
        }
    except Exception as e:
        print("Error en getReviews:", e)
        return ResponseMessage.message500


def getReview(review_id: str):
    try:
        if not ObjectId.is_valid(review_id):
            return ResponseMessage.message400

        review = collection.find_one({"_id": ObjectId(review_id)})
        if review:
            review["_id"] = str(review["_id"])
            return {
                **ResponseMessage.message200,
                "data": review,
            }
        return ResponseMessage.message404
    except Exception as e:
        print("Error en getReview:", e)
        return ResponseMessage.message500


def updateReview(review_id: str, review: Review):
    try:
        if not ObjectId.is_valid(review_id):
            return ResponseMessage.message400

        updated = collection.update_one(
            {"_id": ObjectId(review_id)}, {"$set": review.model_dump()}
        )

        if updated.modified_count > 0:
            return ResponseMessage.message200
        return ResponseMessage.message400
    except Exception as e:
        print("Error en updateReview:", e)
        return ResponseMessage.message500


def deleteReview(review_id: str):
    try:
        if not ObjectId.is_valid(review_id):
            return ResponseMessage.message400

        deleted = collection.delete_one({"_id": ObjectId(review_id)})
        if deleted.deleted_count > 0:
            return ResponseMessage.message200
        return ResponseMessage.message404
    except Exception as e:
        print("Error en deleteReview:", e)
        return ResponseMessage.message500
