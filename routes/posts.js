const express = require("express");
const router = express.Router();

const posts = require("../data/posts");
const error = require("../utilities/error");
//importing the comments array
const comments = require("./data/comments");

router
  .route("/")
  .get((req, res) => {
    const links = [
      {
        href: "posts/:id",
        rel: ":id",
        type: "GET",
      },
    ];
    //added part 2.2 here ex. http://localhost:3000/api/posts?api-key=perscholas&userId=3
    //both use the same end point, just made an addition to account for the optional addition of
    //a query parameter to filter out, and then return so it doesn't move on to the rest of the posts
    if (req.query.userId) {
      const filteredPosts = posts.filter(
        (post) => post.userId == req.query.userId
      );
      res.json({ filteredPosts, links });
      return;
    }

    res.json({ posts, links });
  })
  .post((req, res, next) => {
    if (req.body.userId && req.body.title && req.body.content) {
      const post = {
        id: posts[posts.length - 1].id + 1,
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
      };

      posts.push(post);
      res.json(posts[posts.length - 1]);
    } else next(error(400, "Insufficient Data"));
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const post = posts.find((p) => p.id == req.params.id);

    const links = [
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "PATCH",
      },
      {
        href: `/${req.params.id}`,
        rel: "",
        type: "DELETE",
      },
    ];

    if (post) res.json({ post, links });
    else next();
  })
  .patch((req, res, next) => {
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        for (const key in req.body) {
          posts[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (post) res.json(post);
    else next();
  })
  .delete((req, res, next) => {
    const post = posts.find((p, i) => {
      if (p.id == req.params.id) {
        posts.splice(i, 1);
        return true;
      }
    });

    if (post) res.json(post);
    else next();
  });

//2.10 GET /posts/:id/comments
//Retrieves all comments made on the post with the specified id.
router.route("/:id/comments").get((req, res, next) => {
  // Extract the post id from the URL parameters.
  const postId = req.params.id;
  // Filter the comments array to only those that match the postId.
  const postComments = comments.filter((comment) => comment.postId == postId);
  //error handling
  if (postComments == []) {
    return next(error(404, "No related comments to post id"));
  } else {
    // otherwise res with the filtered comments
    res.json(postComments);
  }
});

//2.11
router.route("/posts/:id/comments").get((req, res, next) => {
  // Extract the post id from the URL parameter.
  const postId = req.params.id;

  // Filter the comments array for comments with the matching postId.
  let filteredComments = comments.filter((comment) => comment.postId == postId);

  // If a userId query parameter is provided, further filter the comments.
  if (req.query.userId) {
    filteredComments = filteredComments.filter(
      (comment) => comment.userId == req.query.userId
    );
  }
  if (filteredComments.length === 0) {
    return next(error(404, "No comments found for this post and user."));
  }

  res.json(filteredComments);
});
module.exports = router;
