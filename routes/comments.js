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
    //2.8 + 2.9
    let filteredComments = comments;

    // Filter by userId
    if (req.query.userId) {
      filteredComments = filteredComments.filter(
        (comment) => comment.userId == req.query.userId
      );
    }
    // Filter by postId
    if (req.query.postId) {
      filteredComments = filteredComments.filter(
        (comment) => comment.postId == req.query.postId
      );
    }

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
//comment id specific section
router
  .route("/:id")
  .get((res, req, next) => {
    //since comments have unique id's, i can just use find instead
    // since it only returns one object
    const comment = comments.find((c) => c.id == req.params.id);
    if (!comment) {
      return next(error(404, "Comment not found"));
    }
    res.json(comment);
  })
  //2.6 patch
  .patch((req, res, next) => {
    // ids are unique, so use find() again
    const comment = comments.find((c) => c.id == req.params.id);
    //again error handling for non existentence
    if (!comment) {
      return next(error(404, "Comment not found"));
    }

    // checking for expmty revision
    if (!req.body.body) {
      return next(error(400, "Missing 'body' in request"));
    }

    // Update the comment's body.
    comment.body = req.body.body;

    // Return the updated comment.
    res.json(comment);
  })
  //2.7
  .delete((req, res, next) => {
    const index = comments.findIndex((c) => c.id == req.params.id);
    //return value of findIndex is -1 if none are found
    if (index === -1) {
      return next(error(404, "Comment not found"));
    }
    const deletedComment = comments.splice(index, 1)[0];
    res.json(comments);
    return next(
      error(204, `This object/comment was removed: ${deletedComment}`)
    );
  });
