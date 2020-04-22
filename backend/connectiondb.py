from pymongo import MongoClient

def inicializar_db ():
    try:
        client = MongoClient(host='db',port=27017)

        mydb = client["super_heroes"]
        return mydb
    except (Exception) as err:
        return err