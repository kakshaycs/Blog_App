//Add package
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var app = express();


// app config
mongoose.connect('mongodb://localhost:27017/Blog', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static("public"));
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

// home page GET request
app.get("/",function(req,res){
   BLOG.find({},function(err,blog){
         if(err)
            console.log(err);
         else
            res.render("index",{Blogs:blog});
   });
});

// GET request for showing new blog form
app.get("/new",function(req,res){
   res.render("new");
});


// POST request for creating new Blog
app.post("/",function(req,res){
   console.log(req.body.blog);
   BLOG.create(req.body.blog,function(err,blog){
      if(err)
         console.log(err);
      else{
       //console.log(blog)
       res.redirect("/");  
      }
   });
   //res.redirect("/");
});


//GET request for showing details of BLOG
app.get("/:id",function(req,res){
   BLOG.findById(req.params.id,function(err,foundBlog){
      if(err){
         console.log(err);
         res.redirect("/");
      } else
         res.render("show",{x:foundBlog});
   });
});


// GET request for edit form
app.get("/:id/edit",function(req,res){
   BLOG.findById(req.params.id,function(err,foundBlog){
      if(err){
         console.log(err);
         res.redirect("/");
      }else
         res.render("edit",{x:foundBlog});
   });
});

//POST request for update
app.put("/:id",function(req,res){
   
   BLOG.findByIdAndUpdate(req.params.id,req.body.blog,function(err,blog){
      if(err){
         console.log(err);
         res.redirect("/");
      }else
         res.redirect("/"+req.params.id);
   });
});

//Delete request for the Blog
app.delete("/:id",function(req,res){
   BLOG.findByIdAndRemove(req.params.id,function(err,blog){
      if(err)
         console.log(err);
         
      res.redirect("/")
         
   });
   
});

// running server
app.listen(process.env.PORT,process.env.IP,function(){
      console.log("running !!");
});