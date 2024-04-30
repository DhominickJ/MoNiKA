from text_preprocessing import clean_text

def predict_emotion(classifier, vectorizer, input_text):
    preprocessed_text = clean_text(input_text)
    
    # Join the tokens back into a single string
    preprocessed_text = ' '.join(preprocessed_text)
    input_vector = vectorizer.transform([preprocessed_text])
    
    emotion_dict = {
    0: 'sadness',
    1: 'joy',
    2: 'love',
    3: 'anger',
    4: 'fear',
    5: 'surprise'
    }
    
    return emotion_dict[classifier.predict(input_vector)[0]]
