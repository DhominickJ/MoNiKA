// import records from "./records"
// import { InferenceSession, Tensor } from 'onnxruntime-web';

// Importing the model
// import * as ort from 'onnxruntime-node';
// const { InferenceSession } = require('onnxruntime-web');

// export default function home() {
//     document.getElementById('name')
//         .innerHTML = 'Sumi~'

//     const data = document.getElementById('query')

//     // Specifying the buttons
//     const button = document.getElementById('submit-query')

//     button.addEventListener('click', records.newQueryAdd)
//     return data
// }

export default function home() {
    window.onload = function() {
    document.getElementById('textForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally, sure?
        const textInput = document.getElementById('query').value; // uhuh...
        if (textInput) {
            fetch('http://localhost:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: textInput }), // Please observer proper parsing.
            })
            .then(response => response.json())
            .then(data => {
                document.getElementById('output').innerHTML = data.classification;
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('output').innerHTML = 'An error occurred.';
            });
        } else {
            document.getElementById('output').innerHTML = 'Please enter some text.';
        }
        });
    }
}