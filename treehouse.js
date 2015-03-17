// Look at a user's badge count & Javascript points
// note that pages look different if you are a teacher vs. student
// get to the profile info by going to teamtreehouse.com/<user>.json
// Use node.js to connect to treehouse's api to get profile info to print out

var profile = require("./profile.js"); // .js is optional, but path is mandatory ./ is same directory

// var users = ["chalkers", "joykesten2", "jennifernelson", "davemcfarland"];
var users = process.argv.slice(2); // start at 3rd index and return the rest

users.forEach(function(userName) {
  profile.get(userName);
});

// the previous forEach loop can be replaced with the following since profile.get
// only takes 1 parameter and users.each has supplies 1 param
// users.forEach(profile.get);
