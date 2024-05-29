const {Pool} = require('pg');

const pool = new Pool({
    user : 'signup_login_user',
    password: 'signup_login_user',
    host: 'localhost',
    port: '5432',
    database: 'signup_login_user_db'
})

module.exports = pool