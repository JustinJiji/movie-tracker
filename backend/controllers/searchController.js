const { fetchSearchedItem } = require("../services/searchService");

const getSearchedItem = async (req, res) => {
  const query = req.query.query; // Get the query parameter from the request
  try {
    const data = await fetchSearchedItem(query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch searched item" });
  }
};

module.exports = { getSearchedItem };
