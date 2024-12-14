import brain from 'brain.js';
import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import cors from 'cors';
import trainingData from './trainingData.mjs';
 

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Träna nötverket med träningsdatan som importerats
const net = new brain.NeuralNetwork({ hiddenLayers: [5] });
net.train(trainingData, { iterations: 2000 });

// Fetcha recept från Spoonacular- API
const fetchRecipesFromAPI = async (ingredients) => {
    const apiKey = 'e657dd39c4684583a47e6e0e666bd01d'; 
    const ingredientList = ingredients.join(',');
    const apiURL = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientList}&number=5&apiKey=${apiKey}`;

    try {
        const response = await fetch(apiURL);
        if (!response.ok) throw new Error('Failed when trying to fetch data from the api');
        return await response.json();
    } catch (error) {
        console.error('Error fetching recipes:', error.message);
        return [];
    }
};

// Endpoint för att ta emot användarinmatningar från frontend
app.post('/predict', async (req, res) => {
    const ingredients = req.body.ingredients;

    //Konverterar till rätt format
    const inputObject = ingredients.reduce((acc, item) => ({ ...acc, [item]: 1 }), {});

    // Kör nätverket på inputs och tar fram det bästa förslaget
    const prediction = net.run(inputObject);
    const bestRecipe = Object.keys(prediction).reduce((a, b) => (prediction[a] > prediction[b] ? a : b));

    // Fetchar recept baserat på ingredienserna via ett öppet API
    const apiRecipes = await fetchRecipesFromAPI(ingredients);

    // Returnerar nätverkets bästa rekommendation samt API:ts filrerade rekommendation
    res.send({
        brainPrediction: bestRecipe,
        apiSuggestions: apiRecipes,
    });
});

//Servern hostas på port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
