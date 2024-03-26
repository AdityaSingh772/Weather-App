const { log } = require("console");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));




app.get("/", function(req, res){
    
    res.sendFile(__dirname+"/index.html");
    
    
});

app.post("/", function(req, res){
    console.log(req.body.cityName);

    const city = req.body.cityName;
    const apikey = process.env.api_key;
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"&units=metric";
    https.get(url, function(response){

        console.log(response.statusCode);
        response.on("data", function(data){
            const WeatherData = JSON.parse(data);
            const temp = WeatherData.main.temp;
            const des = WeatherData.weather[0].description;
            const icon = WeatherData.weather[0].icon;
            const imgURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";

            res.write("<h1>The weather in "+city+" is "+des);
            res.write("<h1>The Temperature in "+city+" is "+temp+" degree celcius.</h1>");
            res.write("<img src="+imgURL+">");
            
            console.log(temp);
            console.log(des);
            res.send();
        });

    });
});




app.listen(3000, function(){
    console.log("The server is running on the port 3000");
});
