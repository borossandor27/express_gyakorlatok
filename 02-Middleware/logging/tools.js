const users = require("./users.json");
function validUser(username, password) {
    return users.find(u => u.username == username && u.password == password);
}
module.exports = { validUser };