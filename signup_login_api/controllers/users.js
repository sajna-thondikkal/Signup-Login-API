const userRepository = require('../repositories/users.js');
const errorResponse = require('../utils/errorResponse.js');
const asyncHandler = require('../middlewares/asyncHandler.js');
const {createjwt} = require('../utils/jwtHelper.js');
const {compareWithHashedPassword} = require('../utils/passwordHelper.js');

// @desc create users
// @rout POST/api/v1/users
// @ access public
const signUp = asyncHandler( async (req,res,next)=>{
    const { first_name,last_name,password,dob,address,place,city,district,state,email,phone } = req.body;
    const users = await userRepository.loginUser(first_name);
    if(users && users.length > 0){
        return(next(new errorResponse(`User already exist with username ${first_name}`,400)));
    }
    const userId = await userRepository.signUpUser(first_name,last_name,password,dob,address,place,city,district,state,email,phone)
    const token = createjwt(userId);
    console.log(userId);
    if(userId){
        res.status(200).json({"message":"Successfully created new user",first_name:first_name,token:token})
    }
})

// @desc login user
// @rout POST/api/v1/users
// @access public
const login = asyncHandler(async (req,res,next)=>{
    const {first_name,password} = req.body;
    const users = await userRepository.loginUser(first_name);
    if(!users || users.length == 0){
        return(next(new errorResponse(`Invalid credentials`,400)));
    }
    const user = users[0];
    const isValid = compareWithHashedPassword(password,user.password);
    if(isValid){
        const token = createjwt(user.id);
        return res.status(200).json({"message":"Logged in successfully",user:{name:user.first_name},token:token});
    }
        return(next(new errorResponse("Invalid credentials",400)));
})

module.exports = {
    signUp,
    login
}
