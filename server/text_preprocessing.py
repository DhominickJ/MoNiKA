import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
import string

""" 
# Run this code if it doesn't work

```
nltk.download('stopwords')
nltk.download('punkt')
```
"""

def clean_text(text):
    # If input is a list of strings, join them into a single string
    if isinstance(text, list):
        text = ' '.join(text)
    
    # Convert text to lowercase
    text = text.lower()
    
    # Tokenization
    tokens = word_tokenize(text)
    
    # Remove punctuation
    tokens = [token for token in tokens if token not in string.punctuation]
    
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    tokens = [token for token in tokens if token not in stop_words]
    
    # Stemming
    stemmer = PorterStemmer()
    tokens = [stemmer.stem(token) for token in tokens]
    
    return tokens
