const {verifyToken} = require('../utils/jwtHelper');

const verifyTokenHandler =async (req,res,next)=>{
    // retrieve token from http header
    let token = req.headers['authorization'];
    if(token && token.includes('Bearer')){
        try {
            const result = await verifyToken(token);
            return next();
        } catch (error) {
            return res.status(401).json({message:'Invalid token'});
        }
    }else{
            res.status(401).json({message:'No token contains'});
    }
}

module.exports = {
    verifyTokenHandler
}