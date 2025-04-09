//2.3 created a route for comments, as well as a temporary storage
// in the "comments" variable
//prefixed url is /comments
const express = require("express");
const router = express.Router();
const error = require("../utilities/error");

// Import the comments array from the data folder
const comments = require("../data/comments");

router.route("/").get((req, res) => {
  const links = [
    {
      href: "/api/comments",
      rel: "iteslf",
      type: "GET",
    },
  ];
  res.json({ links, comments });
});
// Export both the router and the in-memory comments array.
module.exports = router;
