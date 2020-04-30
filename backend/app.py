from flask import Flask
from flask import render_template, jsonify, request, redirect, url_for,send_file
import json
from connectiondb import inicializar_db,cargar_datos
from flask_cors import CORS
import os

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
        db = inicializar_db()
        cargar_datos (db)
        return "OK"
    except (Exception) as err:
        return str(err), 500

@app.route('/', methods=['GET'])
def listall():
    try:
        db = inicializar_db()
        res = []
        for x in db.list.find({},{"_id":0}):
            res.append(x)
        return jsonify (res)
    except (Exception) as err:
        return str(err), 500

@app.route('/marvel', methods=['GET'])
def listmarvel():
    try:
        db = inicializar_db()
        res = []
        for x in db.list.find({"house":"MARVEL"},{"_id":0}):
            res.append(x)
        return jsonify (res)
    except (Exception) as err:
        return str(err), 500

@app.route('/dc', methods=['GET'])
def listdc():
    try:
        db = inicializar_db()
        res = []
        for x in db.list.find({"house":"DC"},{"_id":0}):
            res.append(x)
        return jsonify (res)
    except (Exception) as err:
        return str(err), 500

@app.route('/get', methods=['POST'])
def get():
    try:
        id = request.json ["id"]
        db = inicializar_db()
        res = db.list.find_one({"id":id},{"_id":0})
        return jsonify (res)
    except (Exception) as err:
        return str(err), 500

@app.route('/add', methods=['POST'])
def add():
    try:
        db = inicializar_db()

        name = request.json ["name"]
        character = request.json ["character"]
        biography = request.json ["biography"]
        house = request.json ["house"]
        year = request.json ["year"]
        images = request.json ["images"]

        if 'equipment' in request.json:
            equipment = request.json["equipment"]
            nuevo = {
                "id":(db.list.count()+1),
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
                "id":(db.list.count()+1),
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

@app.route('/modify', methods=['POST'])
def modify():
    try:
        db = inicializar_db()

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
            "id":id,
            "name":name,
            "character":character,
            "biography":biography,
            "house":house,
            "year":year,
            "images":images,
            "equipment":equipment,
            "img_count":img_count
        }
        db.list.update_one({"id":nuevo["id"]},{"$set":nuevo})
        return "OK"
    except (Exception) as err:
        return str(err), 500

@app.route('/delete', methods=['POST'])
def delete():
    try:
        id = request.json ["id"]
        db = inicializar_db()
        res = db.list.delete_one({"id":id})
        return "OK"
    except (Exception) as err:
        return str(err), 500

if __name__ == '__main__':
    app.run(host='backend', port='5000', debug=True)