

module.exports = function (user, res) {
    if (user.isAdmin == false) {
        return res.status(401).send("Access Denied");
    }
}