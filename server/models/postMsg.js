import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String, // convert an image into a string
    likeCount: {
        type: Number,
        default: 0
    }, // object to add information
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;