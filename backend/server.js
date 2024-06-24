const express = require("express");
const connectDB = require("./db");
const studentMarksRoutes = require("./routes/studentMark");
const topStudentsRoutes = require("./routes/topper");
const averageMarkRoutes = require("./routes/average");
const cors = require('cors'); 

const app = express();
const port = 3000;

connectDB();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api", studentMarksRoutes);
app.use("/api", topStudentsRoutes);
app.use("/api", averageMarkRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
