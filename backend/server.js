// server.js

require("dotenv").config();
const express = require("express");
const trendingRoutes = require("./routes/trendingRoutes");
const popularRoutes = require("./routes/popularRoutes");
const searchRoutes = require("./routes/searchRoutes");
const viewDetailsRoutes = require("./routes/viewDetailsRoutes");
const upcomingRoutes = require("./routes/upcomingRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());

app.use("/trending", trendingRoutes);
app.use("/popular", popularRoutes);
app.use("/search", searchRoutes);
app.use("/viewdetails", viewDetailsRoutes);
app.use("/movie", upcomingRoutes);
app.use("/admin", adminRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
