from pymongo import MongoClient
import json

def inicializar_db ():
    try:
        client = MongoClient(host='db',port=27017)

        mydb = client["super_heroes"]
        return mydb
    except (Exception) as err:
        return err

with open('currencies.json') as f:
    file_data = json.load(f)

# if pymongo < 3.0, use insert()
collection_currency.insert(file_data)
# if pymongo >= 3.0 use insert_one() for inserting one document
collection_currency.insert_one(file_data)
# if pymongo >= 3.0 use insert_many() for inserting many documents
collection_currency.insert_many(file_data)