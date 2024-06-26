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
  long: {
    type: Number,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   required: true,
  // },
  // email: {
  //   type: String,
  //   required: true,
  // },
  // password: {
  //   type: String,
  //   required: true,
  // },

  likedPlaces: [placeSchema],
});

const Place = mongoose.model("place", placeSchema);
const User = mongoose.model("user", userSchema);

app.use(cors());

app.get("/api/homepage", async (req, res) => {
  const url =
    "https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=12.91285&longitude=100.87808&limit=30&currency=USD&distance=2&open_now=false&lunit=km&lang=en_US";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "401931e516mshebcf325dc280d44p1a1abfjsn16dacd0fe5ec",
      "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    // console.log(result.data);

    res.send(result.data);

    //adding data to mongodb database only once

    // const newPlaceData = result.data;

    // for (let i = 0; i < newPlaceData.length; i++) {
    //   if (newPlaceData[i].detail === "0") continue;

    //   let newPlace = await Place.create({
    //     name: newPlaceData[i].name,
    //     rating: newPlaceData[i].rating,
    //     image: newPlaceData[i].photo
    //       ? newPlaceData[i].photo.images.large.url
    //       : "https://media.istockphoto.com/id/478432824/photo/fashion-stylish-restaurant-interior.jpg?s=1024x1024&w=is&k=20&c=gg-myUsROTcLU8OhieMyEeZdcx_Def6qirnqwvQ56tY=",
    //     long: newPlaceData[i].longitude,
    //     lat: newPlaceData[i].latitude,
    //   });

    //   console.log(newPlace);
    // }
  } catch (error) {
    console.error(error);
  }
});

app.get("/api/homepage/map", async (req, res) => {
  try {
    const data = await fetch(
      "https://us1.locationiq.com/v1/reverse?key=pk.8099310340aa0566a34e0c9935207601&lat=48.8584&lon=2.2945&format=json"
    );
    const result = await data.json();
    console.log(result);
    // res.send(result)
  } catch (error) {
    console.log("Error getting the Map", error);
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
