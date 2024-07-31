const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    approved: { type: Boolean, default: false }
});

module.exports = mongoose.model('Comment', commentSchema);
