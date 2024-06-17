require("dotenv").config();
const express = require("express");
const trendingRoutes = require("./routes/trendingRoutes");
const popularRoutes = require("./routes/popularRoutes");
const searchRoutes = require("./routes/searchRoutes");
const viewDetailsRoutes = require("./routes/viewDetailsRoutes");
const upcomingRoutes = require("./routes/upcomingRoutes")

const app = express();
const PORT = process.env.PORT || 3005;

app.use("/trending", trendingRoutes);
app.use("/popular", popularRoutes);
app.use("/search", searchRoutes);
app.use("/viewdetails", viewDetailsRoutes); 
app.use("/movie", upcomingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
