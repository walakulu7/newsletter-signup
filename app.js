const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");    
});

app.post("/", function(req, res) {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            } 
        }
    ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/4fe11c0ef4";

    const options = {
        method: "POST",
        auth: "walakulu1:ca4ea423491337sdf234eeaa249234d9ba4-us212"
    }
    
   const httpsrequest = https.request(url, options, function(response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data) {
            console.log(JSON.parse(data));
        });
    });

    httpsrequest.write(jsonData);
    httpsrequest.end();


});

app.post("/failure", function(req, res) {
    res.redirect("/");
});


app.listen(process.env.PORT || 3000, function(req, res) {
    console.log("Server is running on port 3000.");
});

//

// API Key
// ca4eafe913371bc23eeaa249623d9ba4-us21

// List/Audience ID
// 4fe11c0ef4
