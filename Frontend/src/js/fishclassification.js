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
    // Create a professional result card
    const resultCard = document.createElement("div");
    resultCard.classList.add("result-card");

    // Add uploaded image to result card
    const uploadedImage = document.createElement("img");
    uploadedImage.src = image.src;
    uploadedImage.alt = "Uploaded Marine Image";
    resultCard.appendChild(uploadedImage);

    try {
        const prediction = await model.predict(image);
        
        // Sort predictions by probability
        prediction.sort((a, b) => b.probability - a.probability);

        // Create prediction display
        const predictionElement = document.createElement("div");
        predictionElement.classList.add("prediction-text");
        
        const topPrediction = prediction[0];
        predictionElement.textContent = `${topPrediction.className}: ${(topPrediction.probability * 100).toFixed(2)}%`;
        
        resultCard.appendChild(predictionElement);
        labelContainer.appendChild(resultCard);

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