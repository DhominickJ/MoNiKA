// import records from "./records"
import { InferenceSession, Tensor } from 'onnxruntime-web';

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
  document.getElementById('textForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    const textInput = document.getElementById('query').value;
    const custom_serv = document.getElementById('server').value;
    const output = document.getElementById('output');
    let ipaddress = '';
    if (!custom_serv){
        ipaddress = 'localhost';
    } else {
        ipaddress = custom_serv;
    }
    if (textInput) {
        fetch('http://' + ipaddress +':5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: textInput }),
        })

        .then(response => response.json())
        .then(data => {
            output.innerHTML = data.classification;
        })
        .catch(error => {
            console.error('Error:', error);
            output.innerHTML = 'An error occurred.';
        });
    } else {
        output.innerHTML = 'Please enter some text.';
      }
    });
  }