const express = require("express");
const connectDB = require("./db");
const studentMarksRoutes = require("./routes/studentMark");
const topStudentsRoutes = require("./routes/topper");
const averageMarkRoutes = require("./routes/average");
const cors = require('cors'); // Import CORS

const app = express();
const port = 3000;

// Connect to the database
connectDB();

// Middleware to parse JSON requests and enable CORS
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", studentMarksRoutes);
app.use("/api", topStudentsRoutes);
app.use("/api", averageMarkRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
