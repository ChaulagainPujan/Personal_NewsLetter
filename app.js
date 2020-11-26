//jshint esversion : 6
const express=require("express");
const bodyParser=require("body-parser");

const request=require("request");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  var fName=req.body.firstName;
  var lName=req.body.lastName;
  var email=req.body.email;

  var data={
    members:[
      {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:fName,
        LNAME:lName
      }
      }
    ]
  };

  var jsonData=JSON.stringify(data);

  var options={
    url:"https://us7.api.mailchimp.com/3.0/lists/a1a2371243",
    method:"POST",
    headers:{
      "Authorization":"pujanclgn e2af0f8b4c78799d97ba6c26f0762796-us7"
    },
    body:jsonData
  };


  request(options,function(err,response,body){
    if(err)
    {

      res.sendFile(__dirname+"/failure.html");
      console.log(err);
    } else{
      if(response.statusCode===200)
      {

        res.sendFile(__dirname+"/success.html");
      }
      else
      {

        res.sendFile(__dirname+"/failure.html");
      }
      console.log(response.statusCode);
    }
  });

});

app.post("/failure",function(req,res){
  res.redirect("/");
});


app.listen(process.env.PORT || 3000,function()
{
  console.log("Connected to port 3000");
});









// e2af0f8b4c78799d97ba6c26f0762796-us7
// a1a2371243
