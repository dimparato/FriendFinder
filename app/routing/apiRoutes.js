var friendData=require("../data/friendData");

module.exports=function(app){
    app.get("/api/friends", function(req, res){
        res.json(friendData);
    });
    app.post("/api/friends", function(req, res){
        var match;
        var tempDiff;
        var tempTotalDiff;
        var minDiff=1000;

        for(let i=0; i<friendData.length; i++){
            tempTotalDiff=0;
            for(let j=0; j<req.body.scores.length; j++){
                tempDiff=req.body.scores[j]-friendData[i].scores[j];
                tempTotalDiff+=Math.abs(tempDiff);
            }
            if(minDiff>tempTotalDiff){
                minDiff=tempTotalDiff;
                match=friendData[i];
            }
        }
        
        friendData.push(req.body);
        res.json(match);
    });
}