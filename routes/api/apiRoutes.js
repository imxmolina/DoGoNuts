// REQUIRED CONTROLLERS
const router = require("express").Router();
var axios = require("axios");
const boxController = require("../../controllers/boxControllers");
const donutController = require("../../controllers/donutControllers");
const userController = require("../../controllers/userControllers");

// PASSPORT
var passport = require('passport');
require('../../config/passport')(passport);

// GETS TOKEN FOR AUTHORIZATION
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

// GETS ALL DONUTS
function isUserAuth (req, res, next) {
  var token = getToken(req.headers);
  console.log(token)
  if (token) {
    next()
  } else {
    return res.status(403).send({ success: false, msg: 'Unauthorized.' });
  }
}  

// DONUT GET
router.route("/api/donuts")
  .get(donutController.findAll)

// BOXES GET AND POST
router.route("/api/box", passport.authenticate('jwt', { session: false }), isUserAuth)
  .get(boxController.findAll)
  .post(boxController.create)
  .put(boxController.update)

// SINGLE BOX GET, PUT, DELETE
router.route("/api/box/:id")
  .get(boxController.findById)
  .put(boxController.update)
  .get(donutController.findAll)
  .delete(boxController.remove)

router.get("/api/users", passport.authenticate('jwt', { session: false }), isUserAuth, (req, res) => {
  res.json({message: "Success."})
})
  

////////// --> NEXMO CODE <-- /////////////

const mongojs = require("mongojs");
var ObjectID = require('mongodb').ObjectID;

const databaseUrl = "donutDB";
const collections = ["boxes"];

// Use mongojs to hook the database to the db variable
const db = mongojs(databaseUrl, collections);

//make sure to install the Nexmo lib
const Nexmo = require('nexmo');

const NEXMO_API_KEY = 'cff92ae3';  // NEXMO API KEY
const NEXMO_API_SECRET = '17amhiUWmLN6AIJa';  // NEXMO API SECRET

// Our Secret Numbers
const TO_NUMBER_IAN = '15204252041'; // Ian
const TO_NUMBER_ISAMAR = '15203319392'; // Isamar
const TO_NUMBER_TONY = '15203897799'; // Tony
const TO_NUMBER_AARON = '14805659751'; // Aaron

const nexmo = new Nexmo({
  apiKey: NEXMO_API_KEY,
  apiSecret: NEXMO_API_SECRET
})

var tiger = [];
var tigerfinal = [];



// func def
function MakeItRain(req) {

  tigerfinal = [];
  tiger = [];

  console.log("make it rain");
  const from = '18039784007';
  const toIan = TO_NUMBER_IAN;
  const toIsamar = TO_NUMBER_ISAMAR;
  const toTony = TO_NUMBER_TONY;
  const toAaron = TO_NUMBER_AARON;

  console.log("  --> --> MIR <-- <--");

  var newbid = ObjectID.createFromHexString(req.boxid);
  console.log("value of newbid: --> " + newbid)
 
  db.boxes.findOne({ '_id': newbid }, function (err, found) {
    // Log any errors if the server encounters one
    if (err) {
      console.log(err);
    }
    // Otherwise, execute
    else {
      
      console.log(found);
      console.log("found.donutcount[0]  -->  " + found.donutcount[0]);

      setTimeout(function () {

        for (var i = 0; i < found.donutcount.length; i++) {
          tiger[i] = '"' + found.donutcount[i] + '"';
        }

        console.log("  tiger: " + tiger);
      }, 1000);

    }
  });

  setTimeout(function () {
    
    var foundCount = 0;
    tigerfinal = [];

    for (var i = 0; i < tiger.length; i++) {
      var newtiger = tiger[i].substring(1, 25);
      console.log("newtiger value: --> " + newtiger);
      var newbidD = ObjectID.createFromHexString(newtiger);

      db.donuts.findOne({ '_id': newbidD }, function (err, found) {

        if (err) {
          console.log(err);
        }
        // Otherwise, execute
        else {

          console.log("Donut Details: " + i + "  " + found.name);
          
          tigerfinal.push(found.name);
          foundCount++;
          console.log(foundCount , found.name.length , tigerfinal.length , tiger.length);

          if (foundCount === tiger.length) {
            console.log("value for tiger final: --> " + found.name.length + " " + foundCount + "   " + tigerfinal);
            a = tigerfinal;
            result = {};
            for (var j = 0; j < a.length; ++j) {
              if (!result[a[j]])
                result[a[j]] = 0;
              ++result[a[j]];
            }
           
            // SEND TEXT CODE
            console.log(result);
            let pretext = JSON.stringify(result);
            let textt = pretext.replace('{', '');
            let texttt = textt.replace('}',''); 
            let textttt = texttt.replace(/"/g,'');
            let texttttt = textttt.replace(/\u00AE/g,'');
            const text6 = texttttt.replace(/\u2122/g,'');
            console.log('final text --> ' + text6);

            nexmo.message.sendSms(from, toAaron, text6, (error, response) => {
              if (error) {
                throw error;
              } else if (response.messages[0].status != '0') {
                console.error(response);
                throw 'Nexmo returned back a non-zero status';
              } else {
                console.log(response);
              }
            }); //END OF TEXT SEND
          }
        }

      });
    }
    tigerfinal = [];

  }, 1100);

} // END OF MakeItRain()

/////////// --> END OF NEXMO CODE <-- ////////////////////

// --> ROUTE TO MAKE IT RAIN <-- //
router.route("/makeitrain")
.post((req, res) => {
  MakeItRain(req.body);
})

module.exports = router;







