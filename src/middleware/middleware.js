const jwt = require("jsonwebtoken");

const middleware = {
    verifyToken: async (req, res, next) => {
        const token = req.headers.token;
        if(token){
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.SECRETKEY_JWT_TOKEN, (err) => {
                if(err){
                    res.status(403).json({message:"Token is not valid"});
                }else{
                    data = jwt.decode(accessToken);
                    req.user_id = data._id;
                    next();
                }
            });
        }else{
            res.status(401).json("you are not authenticated");
        }
    },
}

module.exports = middleware;
