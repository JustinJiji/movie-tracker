require("dotenv").config();
const express = require("express");
const trendingRoutes = require("./routes/trendingRoutes");
const popularRoutes = require("./routes/popularRoutes")

const app = express();
const PORT = process.env.PORT || 3005;

app.use("/trending", trendingRoutes);
app.use("/popular", popularRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
