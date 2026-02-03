const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const bookRoutes = require("./routes/bookRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.use("/api/books", bookRoutes);

app.use(errorHandler);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });
 