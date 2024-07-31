const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const userController = require('../controllers/userController'); 

// User Auth Routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// User Routes
router.get('/user/:email', userController.getUserByEmail); 

// Post Routes
router.post('/posts', auth, postController.createPost);
router.get('/posts', postController.getPosts);
router.get('/posts/:id', postController.getPostById);
router.put('/posts/:id', auth, postController.updatePost);
router.delete('/posts/:id', auth, postController.deletePost);

// Comment Routes
router.post('/comments', auth, commentController.createComment);
router.get('/comments/:postId', commentController.getComments);
router.put('/comments/:id/approve', auth, commentController.approveComment);

module.exports = router;
