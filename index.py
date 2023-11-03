from flask import Flask, jsonify
from flask_cors import CORS
from flask import request
import json
import csv
import hashlib

app = Flask(__name__)
CORS(app)



# Returns each account pair as a doubled array (arr[][])
def readCSV():
    pairs = []
    with open("authenticate.csv", newline='') as file:
        spam = csv.reader(file, delimiter=',')
        for line in spam:
            pairs.append(line)
        return pairs
    




def encrypt(password):
    encoded = password.encode()
    hashed = hashlib.sha256(encoded).hexdigest()
    encoded2 = hashed.encode()
    hashed2 = hashlib.sha256(encoded2).hexdigest()
    print(hashed2)
    return hashed2



@app.route('/auth')
def authenticate():
    username = request.args.get("username")
    password = request.args.get("password")
    encrypted = encrypt(password)
    data = readCSV()
    flag = False
    for pairs in data:
        if pairs[0] == username:
            if pairs[1] == encrypted:
                print("FOUND USER____________")
                flag = True
            else:
                print("INCORRECT PASSWORD_____________")
    if not flag:
        print("USER NOT FOUND__________")
        return jsonify({"found": False, "username": username})
    else:
        return jsonify({"found": True, "username": username})
    
        




if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)


