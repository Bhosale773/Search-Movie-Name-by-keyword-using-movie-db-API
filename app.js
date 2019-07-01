var express=require("express");
var app=express();
var request=require("request");

app.set("view engine", "ejs");
app.use(express.static("style"));

app.get("/",function(req,res)
{
    res.render("home");
});

app.get("/result",function(req,res)
{
    var movie=req.query["movie-name"];
    request("http://www.omdbapi.com/?apikey=thewdb&s="+movie, function(error,response,body)
    {
        var data = JSON.parse(body);
        if(!error && response.statusCode==200)
        {
            res.render("result",{data:data});
        }
    });
});

app.listen(process.env.PORT||1000,function()
{
    console.log("Server started");
});