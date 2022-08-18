require("dotenv").config();

//#region express configures
var express = require("express");
var path = require("path");
var logger = require("morgan");
const session = require("express-session");
const DButils = require("./routes/utils/DButils");
var cors = require('cors')

var app = express();
app.use(logger("dev")); //logger
app.use(express.json()); // parse application/json



app.use(
  session({
    cookieName: "session", // the cookie key name
    //secret: process.env.COOKIE_SECRET, // the encryption key
    key:["ID"],
    secret: "templateasdasdasdas", // the encryption key
    duration: 24 * 60 * 60 * 1000, // expired after 20 sec
    activeDuration: 1000 * 60 * 5, // if expiresIn < activeDuration,
  
    //the session will be extended by activeDuration milliseconds
  })
);
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "public"))); //To serve static files such as images, CSS files, and JavaScript files
// app.use(express.static(path.join(__dirname, "dist")));

//app.use(express.static(path.join(__dirname, '../assignment-3-3-basic/dist')));
app.use(express.static(path.join(__dirname, '../FrontEnd-master/dist')));


app.get("/",function(req,res)
{   
 // res.sendFile(path.join(__dirname, '../assignment-3-3-basic/dist/index.html'));
  res.sendFile(path.join(__dirname, '../FrontEnd-master/dist'));
  // res.sendFile(__dirname+"/index.html");

});

// app.use(cors());
// app.options("*", cors());

const corsConfig = {
  origin: true,
  credentials: true
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

var port = process.env.PORT || "80";
//#endregion
const user = require("./routes/user");
const recipes = require("./routes/recipes");
const auth = require("./routes/auth");
const cookieParser = require("cookie-parser");
const { cookie } = require("express-validator");


//#region cookie middleware
app.use(function (req, res, next) {
  if (req.session && req.session.user_id) {
    DButils.execQuery("SELECT user_id FROM users")
      .then((users) => {
        if (users.find((x) => x.user_id === req.session.user_id)) {
          req.user_id = req.session.user_id;
        }
        next();
      })
      .catch((error) => next());
  } else {
    next();
  }
});
//#endregion

// ----> For cheking that our server is alive
app.get("/alive", (req, res) => res.send("I'm alive"));

// Routings
app.use("/users", user);
app.use("/recipes", recipes);
app.use(auth);

app.use((req, res, next) => {
  res.status(404).send({ message: "Not found", success: false })
})


// Default router
app.use(function (err, req, res, next) {
  res.status(err.status || 500).send({ message: err.message, success: false });
});

// run front 
// app.get('/', (req,res) => {
//   res.sendFile(path.join(__dirname, '../assignment-3-3-basic/dist/index.html'));
// });


const server = app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});

process.on("SIGINT", function () {
  if (server) {
    server.close(() => console.log("server closed"));
  }
  process.exit();
});
 

module.exports = app ;