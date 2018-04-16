var request = require('request');
var fs = require('fs');
var args = process.argv.slice(2);

//imports the important token info
var password = require('./secrets.js');

console.log('Welcome to the GitHub Avatar Downloader!');

//Throws an error if there are not enough input params
if(args.length < 2){
  throw "Not enough paramaters!!!";
}

//accesses the JSON string of the contributors of a specified repo
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': password.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

//A function that requests a download to the file path from the url found in the input params
function downloadImageByURL(url, filePath) {
  request.get(url)
  .pipe(fs.createWriteStream(filePath));
}

//Downloads and converts a JSON file containing all of the contributors information
getRepoContributors(args[0], args[1], function(err, result) {

  var contributors = JSON.parse(result);

  //prints out any erros associated with accessing the information
  console.log("Errors:", err);

  //prints out all of the contributers and their avatar url
  contributors.forEach(function(element, index){

    //forEach contributors element, downloads the avatar picture and confirms via a console.log()
    downloadImageByURL(element.avatar_url, `avatars/${element.login}.jpg`);
    console.log(`Downloaded ${element.login}.jpg`);

  });
});




//downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./kvirani.jpg");