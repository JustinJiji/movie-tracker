const { fetchMultiDetails } = require("../services/viewDetailsService");

const getMultiDetails = async (req, res) => {
  const media_type = req.params.media_type || null;
  const id = req.params.id;

  try {
    const data = await fetchMultiDetails(media_type, id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch multi details" });
  }
};

module.exports = { getMultiDetails };
