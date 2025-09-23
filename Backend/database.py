from pymongo import MongoClient

MONGO_URL = "mongodb://localhost:27017"
# MONGO_URL_SERVIDOR = "" 
DB_NAME = "ServiceMarketplaceDB"

client = MongoClient(MONGO_URL)
db = client[DB_NAME]