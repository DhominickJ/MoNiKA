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

    async function predictEmotion(text) {
      
        // Create an ORT session
        const session = await InferenceSession.create('/model/monika.with_runtime_opt.optimized.onnx', {executionProviders: ['webgl']});
      
        // Create input data tensor (assuming float32 input)
        const inputData = new Float32Array(text);
        const input = new Tensor(inputData, 'float32', [1, text.length]); // Adjust dimensions if needed
      
        // Run inference
        const outputData = await session.run(input);
      
        // Extract the predicted emotion (highest probability index)
        const probabilities = outputData[0].data;
        const predictedEmotionIndex = probabilities.indexOf(Math.max(...probabilities));
      
        // Map the predicted index to an emotion label (assuming you have a mapping)
        const emotions = ['angry', 'happy', 'sad', 'love', 'surprise', 'fear'];
        const predictedEmotion = emotions[predictedEmotionIndex];
      
        return predictedEmotion;
      }
      
      // Example usage
      const preprocessedText = "I feel very frustrated!"; // Replace with actual preprocessing logic
      const predictedEmotion = predictEmotion(preprocessedText);
      console.log("Predicted emotion:", predictedEmotion); // Output might be angry
}