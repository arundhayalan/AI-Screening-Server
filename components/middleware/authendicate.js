// middleware/authenticate.js

const jwttoken = require('jsonwebtoken');
const UserModel = require('../Models/user');
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateUser = async (req, res, next) => {
    // Get the token from the request header
    const token = req.header('Authorization');
    console.log(token);

    // Check if token is present
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Verify the token
        const tokenValue = token.replace('Bearer ', '');
        console.log(tokenValue);
        console.log(JWT_SECRET);
        const decoded = jwttoken.verify(tokenValue, JWT_SECRET);
        console.log(decoded);

        // Find the user associated with the token
        const user = await UserModel.findById(decoded.userId);
        console.log(user);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized user' });
        }

        // Attach the user object to the request
        req.user = user;
        next();
        
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Unauthorized whole' });
    }
};

module.exports = authenticateUser;
