const User = require('../models/User'); // Import the User model

// Get user by email
exports.getUserByEmail = async (req, res) => {
    const { email } = req.params;
    console.log(email)
    

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(user)

        res.status(200).json(user);
        
    } catch (error) {
        console.error('Error fetching user by email:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
