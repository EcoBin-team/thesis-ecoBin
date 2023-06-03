const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getFeeds = async (req, res) => {
  try {
    const feeds = await prisma.feed.findMany();
    res.json(feeds);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createFeed = async (req, res) => {
  const { title, subtitle, image, date, layout } = req.body;
  try {
    const feed = await prisma.feed.create({
      data: {
        title,
        subtitle,
        image,
        date,
        layout,
      },
    });
    res.status(201).json(feed);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getFeeds,
  createFeed,
};