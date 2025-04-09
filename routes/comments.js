//2.3 created a route for comments, as well as a temporary storage
// in the "comments" variable
//prefixed url is /comments
const express = require("express");
const router = express.Router();
const error = require("../utilities/error");

// Import the comments array from the data folder
const comments = require("../data/comments");

router
  .route("/")
  .get((req, res) => {
    const links = [
      {
        href: "/api/comments",
        rel: "iteslf",
        type: "GET",
      },
    ];
    res.json({ links, comments });
  })
  //2.4 adding a post (comment)
  .post((req, res, next) => {
    const { userId, postId, body } = req.body;
    if (userId && postId && body) {
      const comment = {
        id: comments[comments.length - 1].id + 1,
        userId: userId,
        postId: postId,
        body: body,
      };
      //add to comments
      comments.push(comment);
      //res with 201 status for creation
      res.status(201).json(comment);
    } else {
      return next(error(400, "Missing required input"));
    }
  });
// Export both the router and the in-memory comments array.
module.exports = router;
//2.5
router.route("/:id").get((res, req) => {
  //since comments have unique id's, i can just use find instead
  // since it only returns one object
  const comment = comments.find((c) => c.id == req.params.id);
  if (!comment) {
    return next(error(404, "Comment not found"));
  }
  res.json(comment);
});
