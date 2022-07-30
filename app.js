const express=require("express");
const bodyp=require("body-parser");
const requet=require("request");
const https=require("https");
const app=express();
app.use(express.static("public"));
app.use(bodyp.urlencoded({extended:true}))
app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/signup.html")
})
app.post("/",(req,resp)=>{
var fname=req.body.fname;
var lname=req.body.lname;
var email=req.body.emaill;
const data={
  members:[
    {
    email_address:email,
    status:"subscribed",
    merge_fields:{
      FNAME:fname,
      LNAME:lname
    }
  }

  ]
};
 const jsoon=JSON.stringify(data);
 const url="https://us13.api.mailchimp.com/3.0/lists/988a062fc0";
 const options={
   method:"POST",
   auth:"yash1:8d89d0525318d367b0f04a17903ae702-us13"
 };
  const requ=https.request(url,options,(respo)=>{
    if(respo.statusCode===200)
    {
      resp.sendFile(__dirname+"/success.html");
    }
      else {
        resp.sendFile(__dirname+"/failure.html");
      }

   respo.on("data",(data)=>{
     console.log(JSON.parse(data));

   });
 });
 app.post("/failure",(req,response)=>{
 response.redirect("/");
 });
 requ.write(jsoon);
 requ.end();
});

app.listen(process.env.PORT || 3000,()=>{
  console.log("server is running on port 3000");
});
//ab181926af676d73a948971df393bfe3-us13
//988a062fc0
