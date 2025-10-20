import users from "./users.json" with { type: "json" };

export function validUser(username, password) {
    return users.find(u => u.username == username && u.password == password);
}
