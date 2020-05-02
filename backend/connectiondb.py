from pymongo import MongoClient
import json

def inicializar_db_heroes ():
    try:
        client = MongoClient(host='db',port=27017)

        mydb = client["super_heroes"]
        return mydb
    except (Exception) as err:
        return err

def inicializar_db_movies ():
    try:
        client = MongoClient(host='db',port=27017)
        mydb = client["movies"]
        return mydb
    except (Exception) as err:
        return err

def cargar_datos_heroes (db):
    with open('superheroes.json') as f:
        file_data = json.load(f)
    
    db.list.drop()
    db.list.insert_many(file_data)