var request = require('request');
var fs = require('fs');
var password = require('./secrets.js');
var args = process.argv.slice(2);

console.log('Welcome to the GitHub Avatar Downloader!');
//console.log(password);
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

function downloadImageByURL(url, filePath) {
  request.get(url)
  .pipe(fs.createWriteStream(filePath));
}


getRepoContributors("jquery", "jquery", function(err, result) {

  var contributors = JSON.parse(result);

  //prints out any erros associated with accessing the information
  console.log("Errors:", err);

  //prints out all of the contributers and their avatar url
  contributors.forEach(function(element, index){

    downloadImageByURL(element.avatar_url, `avatars/${element.login}.jpg`);
    console.log(`Downloaded ${element.login}.jpg`);

  });
});




//downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./kvirani.jpg");