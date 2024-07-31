const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ENV = require("dotenv").config();
const process = require("process");
const travelapikey = process.env.X_RAPID_API_KEY;
const mongodbpassword = process.env.MONGODB;
const PORT = process.env.PORT || 3000;
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
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
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
    {
      name: String,
      rating: Number,
      image: String,
      long: Number,
      lat: Number,
      address: String,
      phone: String,
    },
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
  //       "x-rapidapi-key": ${travelapikey},
  //     "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
  //     "Content-Type": "application/json",
  //   },
  // };

  const data = await Place.find({});
  // console.log(data);
  res.send(data);

  // try {
  //   const response = await fetch(url, options);
  //   const result = await response.json();
  //   // console.log(result.data);
  //   res.send(result.data);

  //   //adding data to mongodb database only once

  //   const newPlaceData = result.data;
  //   console.log(newPlaceData.address);

  //   for (let i = 0; i < newPlaceData.length; i++) {
  //     if (newPlaceData[i].detail === "0") continue;

  //     let newPlace = await Place.create({
  //       name: newPlaceData[i].name,
  //       rating: newPlaceData[i].rating,
  //       image: newPlaceData[i].photo
  //         ? newPlaceData[i].photo.images.large.url
  //         : "https://media.istockphoto.com/id/478432824/photo/fashion-stylish-restaurant-interior.jpg?s=1024x1024&w=is&k=20&c=gg-myUsROTcLU8OhieMyEeZdcx_Def6qirnqwvQ56tY=",
  //       long: newPlaceData[i].longitude,
  //       lat: newPlaceData[i].latitude,
  //       address: newPlaceData[i].address,
  //       phone: newPlaceData[i].phone,
  //     });

  //     console.log(newPlace);
  //   }
  // } catch (error) {
  //   console.error(error);
  // }
});

app.get("/api/user/liked-places", async (req, res) => {
  // res.send("hello this is liked places");
  // console.log(req.query.user);

  const likedPlacesfromDB = await User.findOne({
    name: req.query.user,
  });
  console.log(likedPlacesfromDB);
  res.send(likedPlacesfromDB === null ? null : likedPlacesfromDB.likedPlaces);
});

app.post("/api/places/liked", async (req, res) => {
  const likedPlacesData = req.body;
  // console.log(likedPlacesData);
  // console.log(likedPlacesData.likedPlaces);

  for (let i = 0; i < likedPlacesData.liked.length; i++) {
    let place = likedPlacesData.liked[i];

    // Check if required fields are present
    if (
      place.name &&
      place.rating &&
      place.long &&
      place.lat &&
      place.address
    ) {
      await User.findOneAndUpdate(
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
              address: place.address,
              phone: place.phone ? place.phone : "",
            },
          },
        },
        { new: true }
      );
      // console.log(user);
    }
  }
});

app.post("/api/user/signin", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ name: userName, password: password });

    if (user) {
      // console.log("User found");
      res.send(user);
    } else {
      // console.log("User not found");
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
  console.log(userDetails);

  const newUser = await User.create({
    name: userDetails.userName,
    email: userDetails.email,
    password: userDetails.password,
  });
  newUser.save();
});

app.post("/api/user/removed/places", async (req, res) => {
  const removedPlaces = req.body;
  console.log(removedPlaces);
  for (let i = 0; i < removedPlaces.placesRemoved.length; i++) {
    await User.updateOne(
      {
        id: removedPlaces.placesRemoved[i].id,
      },
      {
        $pull: {
          likedPlaces: {
            // id: removedPlaces.placesRemoved[i].id
            name: removedPlaces.placesRemoved[i].name,
          },
        },
      }
    );
  }
});

app.post("/api/new-location", async (req, res) => {
  const { name, rating, lat, long, img, address, phone } = req.body;

  // console.log(img, name, rating, lat, long);

  const newLocation = new Place({
    name: name,
    rating: rating,
    image: img,
    long: long,
    lat: lat,
    address: address,
    phone: phone,
  });
  newLocation.save();
});

try {
  app.listen(PORT, () => {
    console.log(`backend is running on port:${PORT}`);
  });
  mongoose
    .connect(`${mongodbpassword}?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => console.log("Connected to MongoDB!"));
} catch (error) {
  console.log("Error connecting to MongoDB", error);
}
