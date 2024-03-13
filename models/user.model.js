var mongoose = require("mongoose")
var plm = require("passport-local-mongoose")



const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    name: String,
    email: String,
    password: String,
    profileImage: {
        type: String,
        default: ""
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
})

userSchema.plugin(plm)  // it provide extra methods to perform user authentication properly

module.exports = mongoose.model("User", userSchema)