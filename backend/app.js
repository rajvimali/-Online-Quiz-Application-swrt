const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const quizRoutes = require("./routes/quizRoutes"); // Make sure the path is correct

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", quizRoutes); // Make sure this route is present

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
