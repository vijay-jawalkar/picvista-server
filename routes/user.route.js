const express = require("express")
const router = express.Router();
const {signup, login, userInfo, setProfilePic, editProfile} = require("../controllers/user.controller.js")
const { createPost, getUserPosts, getPostInfo, getFeedPosts } = require("../controllers/post.controller.js")
const userModel = require("../models/user.model.js")
const {profilePicUpload, postPicUpload} = require("../utils/multer.js")

router.post("/signup", signup)

router.post("/login", login)

// router.post("/logout", logout)

router.get("/:userId", userInfo)

router.post("/fileupload", profilePicUpload.single("image"), setProfilePic);


router.post("/edit", editProfile)

router.post("/createpost", postPicUpload.single("postimage"), createPost);

router.get("/posts/:userId", getUserPosts)

router.get("/posts/post-detail/:postId", getPostInfo)

router.get("/allPosts/feed", getFeedPosts)

// router.get("/post/:id", getFirstPostImage);

module.exports = router