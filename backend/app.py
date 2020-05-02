from flask import Flask
from flask import render_template, jsonify, request, redirect, url_for,send_file
import json
from connectiondb import inicializar_db_heroes,cargar_datos_heroes,inicializar_db_movies
from flask_cors import CORS
import os
from pymongo import TEXT
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)
app.config['IMG_FOLDER'] = './img'

@app.route('/upload', methods=['POST'])
def fileUpload():
    try:
        for file in request.files.getlist('file'):
            file.save(os.path.join(app.config['IMG_FOLDER'], file.filename))   
        return str(request.files)
    except (Exception) as err:
        return str(err), 500

@app.route('/image/<name>',methods=['GET'])
def getImage(name):
    try:
        filename = './img/' + name
        return send_file(filename, mimetype='image/jpeg')
    except (Exception) as err:
        return str(err), 500

@app.route('/cargar_db', methods=['GET'])
@app.before_first_request
def cargar_db():
    try:
        db1 = inicializar_db_heroes()
        db2 = inicializar_db_movies()
        db2.list.drop()
        cargar_datos_heroes (db1)
        db1.list.create_index( [('name', TEXT),('character',TEXT)] )
        return "OK"
    except (Exception) as err:
        return str(err), 500

@app.route('/hero', methods=['GET'])
def herolistall():
    try:
        db = inicializar_db_heroes()
        res = []
        for x in db.list.find({}):
            x["_id"] = str(x["_id"])
            res.append(x)
        return jsonify (res)
    except (Exception) as err:
        return str(err), 500

@app.route('/movie', methods=['GET'])
def movielistall():
    try:
        db = inicializar_db_movies()
        res = []
        for x in db.list.find({},{"_id":0}):
            res.append(x)
        return jsonify (res)
    except (Exception) as err:
        return str(err), 500

@app.route('/hero/marvel', methods=['GET'])
def herolistmarvel():
    try:
        db = inicializar_db_heroes()
        res = []
        for x in db.list.find({"house":"MARVEL"}):
            x["_id"] = str(x["_id"])
            res.append(x)
        return jsonify (res)
    except (Exception) as err:
        return str(err), 500

@app.route('/hero/dc', methods=['GET'])
def herolistdc():
    try:
        db = inicializar_db_heroes()
        res = []
        for x in db.list.find({"house":"DC"}):
            x["_id"] = str(x["_id"])
            res.append(x)
        return jsonify (res)
    except (Exception) as err:
        return str(err), 500

@app.route('/hero/get', methods=['POST'])
def heroget():
    try:
        id = request.json ["id"]
        db = inicializar_db_heroes()
        res = db.list.find_one({"_id":ObjectId(id)})
        res["_id"] = str(res["_id"])
        return jsonify (res)
    except (Exception) as err:
        return str(err), 500

@app.route('/movie/get', methods=['POST'])
def movieget():
    try:
        id = request.json ["id"]
        db = inicializar_db_movies()
        res = db.list.find_one({"id":id},{"_id":0})
        return jsonify (res)
    except (Exception) as err:
        return str(err), 500

@app.route('/hero/add', methods=['POST'])
def heroadd():
    try:
        db = inicializar_db_heroes()

        name = request.json ["name"]
        character = request.json ["character"]
        biography = request.json ["biography"]
        house = request.json ["house"]
        year = request.json ["year"]
        images = request.json ["images"]

        if 'equipment' in request.json:
            equipment = request.json["equipment"]
            nuevo = {
                "name":name,
                "character":character,
                "biography":biography,
                "house":house,
                "year":year,
                "images":images,
                "equipment":equipment,
                "img_count":len(images)
            }
        else:
            nuevo = {
                "name":name,
                "character":character,
                "biography":biography,
                "house":house,
                "year":year,
                "images":images,
                "img_count":len(images)
            }
        db.list.insert_one(nuevo)
        return "OK"
    except (Exception) as err:
        return str(err), 500

@app.route('/movie/add', methods=['POST'])
def movieadd():
    try:
        db = inicializar_db_movies ()

        title = request.json["title"]
        id = request.json["id"]
        release_date = request.json["release_date"]
        overview = request.json["overview"]
        poster_path = request.json["poster_path"]
        cast = request.json["cast"]

        #buscamos todos los heroes y linkeamos las peliculas

        db2 = inicializar_db_heroes ()
        for element in cast:
            hero = None
            #si esta dividido por /
            if '/' in element["character"]:
                names = element["character"].split(' / ')
                for name in names:
                    if (hero == None):
                        hero = db2.list.find_one( { "$text": { "$search": "\"" + name + "\"" } } )
                    else:
                        break
            else:
                hero = db2.list.find_one( { "$text": { "$search": "\"" + element["character"] + "\"" } } )

            if (hero != None):
                db2.list.update_one({"_id":hero["_id"]},{"$push" : {"movies": {"id":id,"title":title}}}) 
                element["id_hero"] = str(hero["_id"])

        nuevo = {
            "id":id,
            "title":title,
            "release_date":release_date,
            "overview":overview,
            "poster_path":poster_path,
            "cast":cast
        }
        db.list.insert_one(nuevo)

        return "OK"
    except (Exception) as err:
        return str(err), 500

@app.route('/hero/modify', methods=['POST'])
def heromodify():
    try:
        db = inicializar_db_heroes()

        id = request.json["id"]
        name = request.json ["name"]
        character = request.json ["character"]
        biography = request.json ["biography"]
        house = request.json ["house"]
        year = request.json ["year"]
        images = request.json ["images"]
        equipment = request.json ["equipment"]
        img_count = request.json ["img_count"]

        nuevo = {
            "name":name,
            "character":character,
            "biography":biography,
            "house":house,
            "year":year,
            "images":images,
            "equipment":equipment,
            "img_count":img_count
        }
        db.list.update_one({"_id":ObjectId(id)},{"$set":nuevo})
        return "OK"
    except (Exception) as err:
        return str(err), 500

@app.route('/hero/delete', methods=['POST'])
def herodelete():
    try:
        id = request.json ["id"]
        db = inicializar_db_heroes()
        res = db.list.delete_one({"_id":ObjectId(id)})
        return "OK"
    except (Exception) as err:
        return str(err), 500

if __name__ == '__main__':
    app.run(host='backend', port='5000', debug=True)