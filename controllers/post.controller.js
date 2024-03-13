const userModel = require("../models/user.model.js")
const postModel = require("../models/post.model.js")


const createPost = async (req, res) => {
    const { userID } = req.body;
    console.log(req.body)
    console.log(req.file.filename)
 
     // Fetch user from the database
     const user = await userModel.findById(userID).populate("posts");
    console.log(user)
      const post = await postModel.create({
        user: user._id,
        postImage: req.file.filename,
        title: req.body.title,
        description: req.body.description,
      });
  
      user.posts.push(post._id);
      await user.save();
      res.json({post})
}

const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.userId; // Get the user ID from request parameters

    // Find all posts of the user using the Post model
    const userPosts = await postModel.find({ user: userId });
    console.log("userPosts", userPosts)

    // If no posts found, send an appropriate response
    if (!userPosts || userPosts.length === 0) {
      return res.status(404).json({ message: 'No posts found for the user' });
    }

    // Send the user posts as response
    res.status(200).json({ userPosts });
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

const getPostInfo = async (req, res) => {
  const postId = req.params.postId;
  console.log("get post id", postId)
  try {
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Error retrieving post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getFeedPosts = async (req, res) => {
  try {
    const posts = await postModel.find();
    console.log("line 66 : feed posts", posts)

    if (!posts || posts.length === 0) {
      return res.json([]);
    }

    res.json(posts);
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createPost, getUserPosts, getPostInfo, getFeedPosts }