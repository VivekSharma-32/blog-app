const express = require("express");
const {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
  userBlogController,
} = require("../controllers/blogController");

// Router object
const router = express.Router();

// GET ALL BLOGS | GET
router.get("/all-blogs", getAllBlogsController);

// CREATE NEW BLOG | POST
router.post("/create-blog", createBlogController);

// UPDATE BLOG | PUT
router.put("/update-blog/:id", updateBlogController);

// GET SINGLE BLOG | GET
router.get("/get-blog/:id", getBlogByIdController);

// DELETE BLOG | DELETE
router.delete("/delete-blog/:id", deleteBlogController);

// USER BLOG | GET
router.get("/user-blog/:id", userBlogController);

module.exports = router;
