from flask import Flask, render_template, url_for, jsonify, send_from_directory
import json

app = Flask(__name__)


@app.route('/<path:path>')
def send_js(path):
    return send_from_directory('static', path)


@app.route('/serve_json')
def serve_json():
    with open('static/samples.json') as f:
        data = json.load(f)
    return jsonify(data)


@app.route('/')
def index():
    return render_template('index.html')


if(__name__ == '__main__'):
    app.run(debug=True)
