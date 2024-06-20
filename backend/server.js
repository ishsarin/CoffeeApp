const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Place = mongoose.model("place", placeSchema);

app.use(cors());

app.get("/api/homepage", async (req, res) => {
  const url =
    "https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=12.91285&longitude=100.87808&limit=30&currency=USD&distance=2&open_now=false&lunit=km&lang=en_US";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "e37de9475cmshc91754dee8d657cp1f9b19jsnf9309833a34a",
      "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    // console.log(result.data);
    res.send(result.data);
  } catch (error) {
    console.error(error);
  }
});

app.listen("3000", () => {
  console.log("backend is running");
});

try {
  mongoose
    .connect(
      "mongodb+srv://sarinish2000:mQpTSItv3haLhc4B@cluster0.cpqmiij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("Connected to MongoDB!"));
} catch (error) {
  console.log("Error connecting to MongoDB", error);
}
