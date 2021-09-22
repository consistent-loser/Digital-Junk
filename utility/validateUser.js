module.exports = function (token_ID, fetched_ID, res) {
    if (token_ID != fetched_ID) {
        return res.status(401).send(`Access Denied ${token_ID} ${fetched_ID}`);
    }
}