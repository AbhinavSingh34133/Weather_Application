const express = require("express")
const https = require("https")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.urlencoded({extended:true}))



app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})
app.post("/",(req,res)=>{
    console.log(req.body.city_n)
    const url  = "https://api.weatherapi.com/v1/current.json?key=82b669ee64234377b4671311230503&q="+req.body.city_n
    https.get(url,(response)=>{
        response.on("data",function(data){
            const weatherdata = JSON.parse(data)
            const temp = weatherdata.current.temp_c;
            const weathercondition = weatherdata.current.condition.text;
            res.write("<h1>The current temp in "+req.body.city_n+" is " + temp + " degree Celcius</h1>")
            res.write("<p>The current weather condition is " + weathercondition+"</p>")
            res.write("<img src='//cdn.weatherapi.com/weather/64x64/day/113.png'>")
            res.send()
        })
    })
})

app.listen(3000,function(){
    console.log("Server has sucessfully Started")
})