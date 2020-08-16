const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { response } = require("express");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    console.log(req.body.fname, req.body.lname, req.body.email);

    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: req.body.fname,
                    LNAME: req.body.lname
                }
            }
        ]
    };

    var jason_data = JSON.stringify(data);

    var options = {
        url: "https://us17.api.mailchimp.com/3.0/lists/f8eb4804c0",
        method: "POST",
        headers: {
            "Authorization": "aniket1 api-key"
        },
        // body: jason_data
    };

    request(options, function (error, response, body) {
        if (error) {
            console.error(error);
            res.sendFile(__dirname + "/failure.html");
        }
        else {
            console.log(response.statusCode);
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            }
            else {
                res.sendFile(__dirname + "/failure.html");
            }
        }
    });
});

app.post("/failure", function (req, res) {
    res.redirect("/");
});


app.listen('3000', function () {
    console.log("Server Running on port 3000");
});

// fcdba86c3e45ed0f9397f5ec268835d3-us17

// f8eb4804c0
