const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.createComment = async (req, res) => {
    try {
        const { postId, content } = req.body;
        const comment = new Comment({
            post: postId,
            author: req.user.id,
            content
        });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getComments = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ post: postId }).populate('author', 'username');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.approveComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByIdAndUpdate(id, { approved: true }, { new: true });
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
