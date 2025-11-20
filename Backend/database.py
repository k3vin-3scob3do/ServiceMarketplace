from pymongo import MongoClient

MONGO_URL = "mongodb://localhost:27017"
MONGO_URL_SERVER = "mongodb+srv://0241747_db_user:UTNirq3TNXvRwvmJ@cluster0.xa86fpq.mongodb.net/?appName=Cluster0"
# MONGO_URL_SERVIDOR = "" 
DB_NAME = "ServiceMarketplaceDB"

client = MongoClient(MONGO_URL)
db = client[DB_NAME]