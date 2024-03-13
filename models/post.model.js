var mongoose = require("mongoose")



const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    postImage: {
        type: String,
        required: true
       },
    title: {
        type: String,
        required: true
       },
    description: {
        type: String,
        required: true
       },
})

module.exports = mongoose.model("Post", postSchema)