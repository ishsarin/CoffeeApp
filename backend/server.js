const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

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
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  likedPlaces: [
    { name: String, rating: Number, image: String, long: Number, lat: Number },
  ],
});

const Place = mongoose.model("place", placeSchema);
const User = mongoose.model("user", userSchema);

app.use(cors());
app.use(bodyParser.json());

app.get("/api/homepage", async (req, res) => {
  // const url =
  //   "https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng?latitude=12.91285&longitude=100.87808&limit=30&currency=USD&distance=2&open_now=false&lunit=km&lang=en_US";
  // const options = {
  //   method: "GET",
  //   headers: {
  //     "x-rapidapi-key": "9249316e6bmsh87cd3ad4dd32527p1b162cjsndfe173a02884",
  //     "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
  //     "Content-Type": "application/json",
  //   },
  // };

  const data = await Place.find({});
  res.send(data);

  // try {
  //   const response = await fetch(url, options);
  //   const result = await response.json();
  //   // console.log(result.data);
  //   res.send(result.data);

  //   //adding data to mongodb database only once

  //   // const newPlaceData = result.data;

  //   // for (let i = 0; i < newPlaceData.length; i++) {
  //   //   if (newPlaceData[i].detail === "0") continue;

  //   //   let newPlace = await Place.create({
  //   //     name: newPlaceData[i].name,
  //   //     rating: newPlaceData[i].rating,
  //   //     image: newPlaceData[i].photo
  //   //       ? newPlaceData[i].photo.images.large.url
  //   //       : "https://media.istockphoto.com/id/478432824/photo/fashion-stylish-restaurant-interior.jpg?s=1024x1024&w=is&k=20&c=gg-myUsROTcLU8OhieMyEeZdcx_Def6qirnqwvQ56tY=",
  //   //     long: newPlaceData[i].longitude,
  //   //     lat: newPlaceData[i].latitude,
  //   //   });

  //   //   console.log(newPlace);
  //   // }
  // } catch (error) {
  //   console.error(error);
  // }
});

app.get("/api/user/liked-places", async (req, res) => {
  // res.send("hello this is liked places");
  console.log(req.query.user);

  const likedPlacesfromDB = await User.findOne({
    name: req.query.user,
  });
  // console.log(likedPlacesfromDB.likedPlaces);
  res.send(likedPlacesfromDB.likedPlaces);
});

app.post("/api/places/liked", async (req, res) => {
  const likedPlacesData = req.body;
  console.log(likedPlacesData);
  // console.log(likedPlacesData.likedPlaces);

  for (let i = 0; i < likedPlacesData.liked.length; i++) {
    let place = likedPlacesData.liked[i];

    // Check if required fields are present
    if (place.name && place.rating && place.long && place.lat) {
      const user = await User.findOneAndUpdate(
        { name: likedPlacesData.user },
        {
          $push: {
            likedPlaces: {
              name: place.name,
              rating: place.rating,
              image: place.image
                ? place.image
                : "https://media.istockphoto.com/id/478432824/photo/fashion-stylish-restaurant-interior.jpg?s=1024x1024&w=is&k=20&c=gg-myUsROTcLU8OhieMyEeZdcx_Def6qirnqwvQ56tY=",
              long: place.longitude,
              lat: place.latitude,
            },
          },
        },
        { new: true }
      );
      await user.save();
      // console.log(user);
    }
  }
});

app.post("/api/user/signin", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ name: userName, password: password });

    if (user) {
      console.log("User found");
      res.send(user);
    } else {
      console.log("User not found");
      // res.status(401).send({ error: "Invalid credentials" });
      res.send("Invalid credentials");
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.post("/api/user/signup", async (req, res) => {
  const userDetails = req.body;
  // console.log(newUser);

  const newUser = await User.create({
    name: userDetails.userName,
    email: userDetails.email,
    password: userDetails.password,
  });
  newUser.save();
});

app.post("/api/new-location", async (req, res) => {
  const { name, rating, lat, long, img } = req.body;

  console.log(img, name, rating, lat, long);

  const newLocation = new Place({
    name: name,
    rating: rating,
    image: img,
    long: long,
    lat: lat,
  });
  newLocation.save();
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
