const express = require("express");
const tagsRouter = express.Router();

const { getAllTags } = require("../db");

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next();
});

tagsRouter.get("/", async (req, res) => {
  const tags = await getAllTags();

  res.send({
    tags,
  });
});

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  const { tagName } = req.params;

  try {
    const postTags = await postsByTagName(tagName);
    res.send({ postTags });
  } catch ({ name, message }) {
    next({
      name: "MissingTagsError",
      message: "There are currently no tags associated with this!",
    });
  }
});
module.exports = tagsRouter;
