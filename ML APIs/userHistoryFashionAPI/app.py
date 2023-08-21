from flask import Flask, request, jsonify, render_template
from mlxtend.frequent_patterns import association_rules
from flask_cors import CORS
from apyori import apriori
import pandas as pd
import numpy as np
import random
import csv

app = Flask(__name__)
CORS(app)

#Creating Main Dataset ready for Apriori Algorithm 
purchases = pd.read_csv('history.csv', header=None)
purchases.head()
purchases.values.tolist()
purchaseList = []
for i in range(len(purchases)):
    purchaseList.append([str(purchases.values[i, j]) for j in range(0, 6) if str(purchases.values[i, j]) != 'nan'])



#Putting Unique Items with ProductId to dictionar for faster access 
with open('uniqueItemswithproductIdFashion.csv','r') as csvfile:
    datareader = csv.DictReader(csvfile)
    ids={}
    for row in datareader:
        #print(str(row['ITEM']))
        ids[str(row['ProductTitle'])]=int(row['ProductId'])

@app.route('/', methods=['GET'])
def home():
    return '''Past purchases'''

@app.route('/predict/<string:txt>', methods=['GET'])

def predict(txt):
    rules = apriori(purchaseList, min_support=0.002, min_confidence=0.02, min_lift=3, min_length=1)
    cart_item = txt
    final = [x for item in rules for x in item[0] if cart_item in item[0]]
    final = list(set(final))
    finalDict = {
        item: {
            "Name": item,
            "id": ids.get(item, -1),
            "api": "Recent Purchase"
        }
        for item in final
    }

    keys_set = set(finalDict.keys())

    if len(keys_set) >= 5:
        random_keys = random.sample(keys_set, 5)
    else:
        random_keys = keys_set

    output = {key: finalDict[key] for key in random_keys}

    return jsonify(output)

if __name__ == "__main__":
    app.run(host="127.0.0.1",debug=True,port=8003)

