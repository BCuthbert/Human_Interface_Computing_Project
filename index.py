from flask import Flask, jsonify
from flask_cors import CORS
from flask import request
import json
import csv

app = Flask(__name__)
CORS(app)

@app.route('/')
def helloworld():
    return "<p>Hello, world</p>"


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)