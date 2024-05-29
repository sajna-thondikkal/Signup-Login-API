var jwt = require('jsonwebtoken');
var SECRET = 'keibotsajna'

function createjwt(userId){
    var token = jwt.sign({userId:userId},SECRET);
    return token;

}

module.exports = {
    createjwt
}