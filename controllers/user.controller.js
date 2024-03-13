const userModel = require("../models/user.model.js")
const passport = require("passport");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));


const signup = async (req, res, next) => {
    var userData = new userModel({
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
      });
    
      userModel.register(userData, req.body.password).then(function () {
        passport.authenticate("local")(req, res, function () {
          res.status(201).json({"user": userData})
        });
      });
}

const login = async (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) { 
          return res.status(500).json({ error: err.message }); // Server error
        }
        if (!user) { 
          return res.status(401).json({ error: 'Invalid username or password' }); // Unauthorized
        }
        req.logIn(user, function(err) {
          if (err) {
            return res.status(500).json({ error: err.message }); // Server error
          }
          return res.status(200).json({ message: 'Login successful', user: user }); // Success
        });
      })(req, res, next);
}

const userInfo = async (req, res) => {
  const userId = req.params.userId;
  console.log("userid", userId)

  try {
     // Fetch the user along with populated posts
     const user = await userModel.findById(userId).populate('posts');
     if (!user) {
       return res.status(404).json({ message: 'User not found' });
     }
 
     let firstPostImage = null;
     if (user.posts.length > 0) {
       const firstPost = user.posts[0];
       // Assuming firstPost has a field named 'postImage' that stores the image filename/path
       firstPostImage = firstPost.postImage;
     }
 
     res.json({ user, firstPostImage });
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


// const logout = (req, res) => {
//     req.logout();
//     res.status(200).json({ message: 'Logout successful' });
// }

const setProfilePic = async function (req, res) {
  try {
    console.log("request body", req.body.userID);
    console.log("request file", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const user = await userModel.findById(req.body.userID);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.profileImage = req.file.filename;
    await user.save();
    res.json({ user });
  } catch (error) {
    console.error("File upload error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

const editProfile = async (req, res) => {
  try {
    const { userID, name, username, email } = req.body;
   console.log(req.body)

    // Fetch user from the database
    const user = await userModel.findById(userID);

    // Update user properties
    user.name = name ? name : user.name;
    user.username = username ? username : user.username;
    user.email = email ? email : user.email;

    // Save updated user
    await user.save();

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { signup, login, userInfo, setProfilePic, editProfile }