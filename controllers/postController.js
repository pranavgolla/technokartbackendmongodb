const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    try {
        const { title, content, status } = req.body;
        const post = new Post({
            title,
            content,
            author: req.user.id,
            status
        });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, author, status } = req.query;
        const query = {};

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } }
            ];
        }

        if (author) query.author = author;
        if (status) query.status = status;

        const posts = await Post.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .populate('author', 'username');

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        await Post.findByIdAndDelete(id);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id).populate('author', 'username');
        
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
