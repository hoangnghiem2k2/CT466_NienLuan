const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddleWare = (req, res, next) => {
    // 1. Extract token with error handling
    const authorizationHeader = req.headers.token; // Use 'authorization' for standard format
    let token;
  
    try {
      if (!authorizationHeader) {
        throw new Error('Authorization header is missing');
      }
  
      const parts = authorizationHeader.split(' '); // Split on space
      if (parts.length !== 2 || parts[0] !== 'Bearer') {
        throw new Error('Invalid authorization format');
      }
  
      token = parts[1]; // Extract token
    } catch (error) {
      return res.status(401).json({ message: error.message, status: 'ERROR' }); // Handle invalid format or missing header
    }
  
    // 2. Verify token with proper error handling
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        // Differentiate between different error types (e.g., invalid token, expired token)
        if (err.name === 'JsonWebTokenError') {
          return res.status(401).json({ message: 'Invalid token', status: 'ERROR' });
        } else if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token expired', status: 'ERROR' });
        } else {
          // Handle other errors (e.g., signing key issues)
          console.error('Error verifying token:', err);
          return res.status(500).json({ message: 'Internal server error', status: 'ERROR' }); // Generic error for unexpected issues
        }
      }
  
      // 3. Check for admin role and proceed if authorized
      if (!decoded.isAdmin) {
        return res.status(403).json({ message: 'Forbidden: User is not an admin', status: 'ERROR' });
      }
  
      // User is authorized, proceed to next middleware
      next();
    });
  };
  

const authUserMiddleWare = (req, res, next) => {
    const token = req.headers.token.split(' ')[1]
    const userId = req.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERROR'
            })
        }
        if (user?.isAdmin || user?.id === userId) {
            next()
        } else {
            return res.status(404).json({
                message: 'The authemtication',
                status: 'ERROR'
            })
        }
    });
}

module.exports = {
    authMiddleWare,
    authUserMiddleWare
}