var friends = require("../data/friends");


module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });



    app.post("/api/friends", function(req, res) {
        console.log(req.body.scores);
        var user = req.body;

        for (var i = 0; i < user.scores.length; i++) {
            user.scores[i] = parseInt(user.scores[i]);

        }

        var value = 0;
        var diffMin = 40;

        for (var i = 0; i < friends.length; i++) {
            var diffTotal = 0;
            for (var j = 0; j < friends[i].scores.length; j++) {
                var diff = Math.abs(user.scores[j] - friends[i].scores[j]);
                diffTotal += diff;
            }
            if (diffTotal < diffMin) {
                value = i;
                diffMin = diffTotal;
            }
        }


        friends.push(user)
        res.json(friends[value]);
    })
}
