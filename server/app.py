from flask import Flask, request, jsonify, redirect
from flask_cors import CORS
from text_preprocessing import clean_text
from model_loading import load_classifier, load_vectorizer
from emotion_prediction import predict_emotion
import socket
import os

app = Flask(__name__)
CORS(app) # This will enable CORS for all routes

# Load the trained model and vectorizer
classifier = load_classifier('models/emotion-classifier.joblib')
vectorizer = load_vectorizer('models/vectorizer.joblib')

@app.route('/server', methods=['POST'])
def server():
    IPAddress = socket.gethostbyname(socket.gethostname())
    return IPAddress

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if 'text' not in data:
        return jsonify({'error': 'No text field'}), 400

    input_text = data['text']
    print(input_text)
    try:
        predicted_emotion = predict_emotion(classifier, vectorizer, input_text)
        return jsonify({'classification': predicted_emotion})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/', methods=['GET'])
def get():
    return redirect('https://monika-khaki.vercel.app/', code=302)

if __name__ == '__main__':
    os.system('cls' if os.name == 'nt' else 'clear')
    port = '6969'
    IPAddress = socket.gethostbyname(socket.gethostname())
    print('\n\n\n=============================================')
    print('Starting server...')
    print('Register Device on https://' + IPAddress + ':' + port)
    print('=============================================')
    print('Enter this on the server address on the app: ' + IPAddress)
    print('=============================================')
    app.run(port=port, host='0.0.0.0', ssl_context='adhoc')
    print('=============================================')
    
