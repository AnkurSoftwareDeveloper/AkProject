from flask import Flask, jsonify;
from flask_cors import CORS;
app = Flask(__name__)
CORS(app)

weather = {
     "data": [
     {
         "day": "1/6/2019",
         "temperature": "23",
         "windspeed": "16",
         "event": "Sunny"
     },
     .
     .
     ]
    }

@app.route("/", methods=['GET'])
def index():
    return "Welcome to MyProject"

def WeatherReport():
     global weather
     return jsonify([weather])

@app.route("/")
def home():
    return "Hello, Flask!"


if __name__ == "__main__":
    app.run(debug=True)