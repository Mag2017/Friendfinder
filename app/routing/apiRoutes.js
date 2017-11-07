var friends= require("..//data/friends.js");
var path =require('path');

var totalDifference = 0
module.exports = function(app) {

    app.get("/api/friends.js", function(req,res) {
        res.json(friends);
        });

    app.post("/api/friends",function(req,res) {
        
        var bestMatch = {
            name:"",
            photo:"",
            friendDifference:1000
        };
        console.log(req.body);
//We then take the results of the user and parse it.
        var userData = req.body;
        var userName = userData.name;
        var userImage = userData.image;
        var userScores = userData.scores;

        var totalDifference = 0;

        console.log(userScores); 
//This variable will calculate the difference between the user scores and the scores of the database

        var totalDifference = 0;
//Here we loop through all the friends possibilities in the database.

        for(var i=0; i< friends.length; i++) {

            console.log(friends[i]);
            totalDifference = 0;
    
            //we loop through all the scores of each friend

            for (var j=0;j< friends[i].scores[j]; j++){
            
            //We calculate the difference between the scores and sum them into the totalDifference
            totalDifference += Math.abs(parseInt(userScores[j]) -parseInt(friends[i].scores[j]));

            //if the sum of difference is less than the differences of the current "best match"
                If (totalDifference <=bestMatch.friendDifference) 
                {

            //Reset the bestMatch to be the new friend.
            bestMatch.name = friends[i].name;
            bestMatch.photo = friends[i].photo;
            bestMatch.friendDifference = totalDifference;
               }
            }
        }
    //Now save user's data to the database (this has to happen After the check, otherwise
    //the database will always return that the user is the user's best friend

    friends.push(userData);

    //Return a JSON with the user's bestMatch.This will be used by the HTML in the next page
    res.json(bestMatch);
});
};

