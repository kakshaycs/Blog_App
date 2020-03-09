var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();
mongoose.connect('mongodb://localhost:27017/Blog', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

var blogSchema = new mongoose.Schema({
      title:String,
      image : String,
      description : String,
      created : { type: Date, default: Date.now}
});
var BLOG = mongoose.model("blogs",blogSchema);

// BLOG.create({title:"new blog", image:"str", description:"lolz" }, function(err,blog){
//       if(err)
//           console.log(err);
//       else
//           console.log(blog);   
// });


app.get("/",function(req,res){
   BLOG.find({},function(err,blog){
         if(err)
            console.log(err);
         else
            res.render("index",{blogs:blog});
   });
});


app.listen(process.env.PORT,process.env.IP,function(){
      console.log("running !!");
});