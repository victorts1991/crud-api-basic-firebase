var express = require("express")
var app = express()

app.listen(3001, () => {
    console.log("Server running on port 3001")

    app.get("/persons", (req, res, next) => {
        res.json(["Tony","Lisa","Michael","Ginger","Food"]);
    });
});