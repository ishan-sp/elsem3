const MODEL_URL = "https://teachablemachine.withgoogle.com/models/cd43TeA5z/";

let model, labelContainer, maxPredictions;
let modelReady = false; // Track if the model is ready

async function init() {
    labelContainer = document.createElement("div");
    labelContainer.id = "label-container"; // Set an ID for styling or future reference
    document.querySelector(".overlay-content").appendChild(labelContainer); // Append it to the overlay content
    const modelURL = MODEL_URL + "model.json";
    const metadataURL = MODEL_URL + "metadata.json";
    
    try {
        console.log("Loading model...");
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        modelReady = true; // Set the model ready flag
        console.log("Model loaded successfully.");
    } catch (error) {
        console.error("Error loading model:", error);
        alert("Failed to load the model. Please try again.");
    }
}

async function handleFileUpload(event) {
    const files = event.target.files; // Get the uploaded files
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const img = document.createElement("img");
            img.src = URL.createObjectURL(file); // Correctly using the built-in URL object
            img.onload = async () => {
                const resultContainer = document.createElement("div");
                resultContainer.style.marginBottom = "20px"; // Add some space between results
                labelContainer.appendChild(img); // Display the uploaded image
                
                // Ensure the model is loaded before predicting
                if (modelReady) {
                    console.log("Making prediction for:", file.name);
                    await predictImage(img);
                } else {
                    alert("Model is not loaded. Please try again.");
                }
            };
        }
    } else {
        alert("No files uploaded. Please upload an image file.");
    }
}

async function predictImage(image) {
    try {
        const prediction = await model.predict(image);
        console.log("Prediction results:", prediction);
        let topPrediction = prediction[0];
        
        for (let i = 1; i < maxPredictions; i++) {
            if (prediction[i].probability > topPrediction.probability) {
                topPrediction = prediction[i];
            }
        }
        
        // Display the prediction result
        if (topPrediction.className === "invalid" && topPrediction.probability > 0.5) {
            labelContainer.innerHTML += "Invalid: " + topPrediction.probability.toFixed(2) + "<br>";
        } else {
            labelContainer.innerHTML += topPrediction.className + ": " + topPrediction.probability.toFixed(2) + "<br>";
        }
    } catch (error) {
        console.error("Error during prediction:", error);
        labelContainer.innerHTML += "Error during prediction. Please try again.<br>";
    }
}

// Initialize the model when the page loads
window.onload = async () => {
    await init(); // Load the model on page load
    document.getElementById("file-input").addEventListener("change", handleFileUpload);
};




