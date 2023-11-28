from flask import Flask, jsonify
from flask_cors import CORS
from flask import request
import json
import csv
import hashlib
import re


app = Flask(__name__)
CORS(app)

user = {
    "name": None,
    "isLoggedIn": None,
}


def readCSV():
    pairs = []
    with open("authenticate.csv", newline='') as file:
        spam = csv.reader(file, delimiter=',')
        for line in spam:
            pairs.append(line)
        return pairs


def writeCSV(pairs):
    with open("authenticate.csv", "w", newline='') as file:
        for pair in pairs:
            file.write(pair[0] + "," + pair[1])
            file.write("\n")




def encrypt(password):
    encoded = password.encode()
    hashed = hashlib.sha256(encoded).hexdigest()
    encoded2 = hashed.encode()
    hashed2 = hashlib.sha256(encoded2).hexdigest()
    return hashed2



# default: admin, password
@app.route('/auth')
def authenticate():
    username = request.args.get("username")
    password = request.args.get("password")
    print(encrypt(password))
    encrypted = encrypt(password)
    data = readCSV()
    flag = False
    for pairs in data:
        if pairs[0] == username:
            if pairs[1] == encrypted:
                print("FOUND USER____________")
                loginMess = "Logged in, " + pairs[0]
                flag = True
            else:
                print("INCORRECT PASSWORD_____________")
    if not flag:
        print("USER NOT FOUND__________")
        loginMess = "Incorrect username or password."
        user["isLoggedIn"] = False
        return jsonify({"found": False, "username": username, "loginmsg": loginMess})
    else:
        user["name"] = username
        user["isLoggedIn"] = True
        return jsonify({"found": True, "username": username, "loginmsg": loginMess})

@app.route('/new')
def newAcc():
    username = request.args.get("username")
    password = request.args.get("password");
    regex = re.compile("[@_!#$%^&*()<>?/|}{~:]")
    if (regex.search(password) == None): # if no special characters
        return jsonify({"special": False})
    data = readCSV()
    for pair in data:
        print(pair[0])
        if pair[0] == username:
            print("FLAG:" + pair[0])
            return jsonify({"success": False})
    data.append([username,encrypt(password)])
    writeCSV(data)
    return jsonify({"success": True, "special": True})

@app.route('/isLoggedIn')
def checkLoggedIn():
    if user["isLoggedIn"]:
        return jsonify({"username": user["name"]});
    return jsonify({"username": None})



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)


