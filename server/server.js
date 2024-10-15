const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");

const userRouter = require("./routes/userRouter");
const showRouter = require("./routes/showRouter");
const movieRouter = require("./routes/movieRouter");
const theatreRouter = require("./routes/theatreRouter");
const bookingRouter = require("./routes/bookingRouter");

const port = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["*"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
// require("dotenv").config(); // load env variables into process.env

/**
 * to read from env file, we use a package called dotenv
 * what it does is, it reads the .env file and populates the process.env object
 */

const clientBuildPath = path.join(__dirname, "../client/build");
console.log(clientBuildPath);
app.use(express.static(clientBuildPath));

connectDB();

// const connectDB = require("./config/db");
/**
 * diff between import and require
 * import is ES6 syntax
 * require is commonJS syntax
 * require can be conditional. import cannot be conditional
 * import happens at the beginning of the file
 * require can be used anywhere in the file
 * require can be conditonally loaded
 */

app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/theatres", theatreRouter);
app.use("/api/shows", showRouter);
app.use("/api/bookings", bookingRouter);

// Catch-all route to serve index.html for any other route
app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

app.listen(port, () => {
  console.log("Server started at port :", port);
});
