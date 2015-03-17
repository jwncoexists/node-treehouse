var http = require("http"); // require the http module


// print out message with # badges & points
function printMessage(userName, badgeCount, points) {
  var message = userName + " has " + badgeCount + " total badges and " + points + " points in JavaScript";
  console.log(message);
}

// print out error messages
function printError(error) {
  console.error(error.message);
}

function getProfile(userName) {
  // connect to the api url (http://teamtreehouse.com/<username>.json)
  var request = http.get("http://teamtreehouse.com/" + userName + ".json", function(response) {
    var body = "";

    // read the data returned.  This event happens many times
    // cuz response is a stream of data sent in packets
    // construct the body by concatenating these chunks together
    response.on('data', function(chunk) {
      body += chunk;
    });

    // node emits an "end" event when data is complete
    // want to convert string into an object
    // use javascripts native  method called json.parse to convert to object
    response.on('end', function(){
      if(response.statusCode === 200) {
        try {
          // parse data
          var profile = JSON.parse(body);
          // print the data
          // can get the # of badges by calling the length of the badges array
          // in the points object, use the key javascript to get the # points
          printMessage(userName, profile.badges.length, profile.points.JavaScript);
        } catch(error) {
          // encountered a parse error
          printError(error);
        }
      } else {
        // Status Code Error
        // get the system message by indexing into http.STATUS_CODES
        printError({message: "There was an error getting the profile for: " +
             userName + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
      }
    });

  });

  // if apis give you an error event, you should add programming to handle the error
  // look at documentation to see errors generated for the api
  // we will do ours on the request.on error event
  // his will get executed when an error event is emitted
  // all error objects have a message property
  // may want to add friendlier error messages

  // handle connection Error
  request.on("error", printError);
}

// now make it available outside (to app.js)
module.exports.get = getProfile;
