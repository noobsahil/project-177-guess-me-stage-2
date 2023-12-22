from flask import Flask, render_template, jsonify, request
import random

app = Flask(__name__)

words = [
  {
    "inputs": 5,
    "category": "Fruit",
    "word": "apple"
  },
  {
    "inputs": 5,
    "category": "Weapon",
    "word": "sword"
  },
  {
    "inputs": 6,
    "category": "Colour",
    "word": "yellow"
  },
  {
    "inputs": 6,
    "category": "Animal",
    "word": "spider"
  },
  {
    "inputs": 10,
    "category": "Sport",
    "word": "basketball"
  },
  {
    "inputs": 8,
    "category": "Animal",
    "word": "dinosaur"
  },
  {
    "inputs": 4,
    "category": "Plant",
    "word": "tree"
  },
]

@app.route("/")
def index():
  return render_template("index.html")

@app.route("/get-words")
def get_word():
  return jsonify({
    "status": "success",
    "word": random.choice(words)
  })

if __name__ == "__main__":
  app.run(debug=True)