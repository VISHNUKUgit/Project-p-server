const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
    console.log("inside jwtMiddleware");

    // Extracting the JWT from the Authorization header
    
    const token = req.headers['authorization'] && req.headers['authorization'].split(" ")[1].replace(/^"|"$/g, '');
    
    console.log("Received token:", token);

    

    try {
        // Verifying the JWT using the secret key "ss9876"
        const jwtResponse = jwt.verify(token, "ss9876");

        // Adding the decoded user ID to the request object
        req.payload = jwtResponse.userid;

        // Passing control to the next middleware or route handler
        next();
    } catch (error) {
        console.log(error);
        if (error.name === 'TokenExpiredError') {
            // Responding with a 401 Unauthorized status if the token has expired
            res.status(401).json("Authorization failed, token has expired");
        } else if (error.name === 'JsonWebTokenError') {
            // Responding with a 401 Unauthorized status for other JWT-related errors
            res.status(401).json("Authorization failed, invalid token");
        } else {
            // Responding with a generic 500 Internal Server Error for other unexpected errors
            res.status(500).json("Internal Server Error");
        }
    }
};

module.exports = jwtMiddleware;
