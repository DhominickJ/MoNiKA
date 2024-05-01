from flask import Flask, request, jsonify
from flask_cors import CORS
from text_preprocessing import clean_text
from model_loading import load_classifier, load_vectorizer
from emotion_prediction import predict_emotion

app = Flask(__name__)
CORS(app) # This will enable CORS for all routes

# Load the trained model and vectorizer
classifier = load_classifier('models/emotion-classifier.joblib')
vectorizer = load_vectorizer('models/vectorizer.joblib')

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
    
if __name__ == '__main__':
    app.run(debug=True, port=6969, host='0.0.0.0', ssl_context='adhoc')
