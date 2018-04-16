var request = require('request');
var password = require('./secrets.js')

console.log('Welcome to the GitHub Avatar Downloader!');

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

getRepoContributors("jquery", "jquery", function(err, result) {
  var contributors = JSON.parse(result);

  //prints out any erros associated with accessing the information
  console.log("Errors:", err);

  //prints out all of the contributers and their avatar url
  contributors.forEach(function(element, index){
    console.log('#' + (index + 1), '\b:' + element.login, '--', element.avatar_url );

  });
  //console.log("Result:", contributors);
});