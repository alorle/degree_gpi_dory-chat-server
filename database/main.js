var pgp = require('pg-promise')();
var db = pgp(process.env.DATABASE_URL);
pgp.pg.defaults.ssl = true;

function getUsers() {
  return db.any("SELECT * FROM users");
}

function getUser(id) {
  return db.one("SELECT * FROM users WHERE email LIKE $1", id);
}

function createUser(name, email, password) {
  return db.none("INSERT INTO users VALUES ($1, $2, $3)", [name, email, password]);
}

function deleteUser(email) {
  return db.none("DELETE FROM users WHERE email LIKE $1", email);
}

module.exports = {
  getUsers: getUsers,
  getUser: getUser,
  createUser: createUser,
  deleteUser: deleteUser
};