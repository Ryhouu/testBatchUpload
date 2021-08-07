// handles for routes

import mongoose from 'mongoose';
import PostMessage from "../models/postMsg.js";

export const getPosts = async (req, res) => {
    // res.send('This works');
    try {
        // retrive all posts in the database
        const postMsgs = await PostMessage.find(); //asynchronous

        console.log(postMsgs);

        res.status(200).json(postMsgs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    // res.send('Creating new post');
    const post = req.body;
    const newPost = new PostMessage(post);
    
    try {
        await newPost.save();               
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    // update that post if the id is valid
    
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true});

    res.json(updatedPost)
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully' });
}