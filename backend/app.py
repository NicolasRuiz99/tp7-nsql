from flask import Flask
from flask import render_template, jsonify, request, redirect, url_for
import json
from connectiondb import inicializar_db
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def listall():
    try:
        db = inicializar_db()
        res = []
        for x in db.list.find({}):
            res.append(x)
        return jsonify (res)
    except (Exception) as err:
        return str(err), 500


if __name__ == '__main__':
    app.run(host='backend', port='5000', debug=True)