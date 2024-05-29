addUser = "INSERT INTO users(first_name,last_name,password,dob,address,place,city,district,state,email,phone) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id";
getUserByUsername = "SELECT * FROM users WHERE first_name=$1";

module.exports = {
    addUser,
    getUserByUsername
}