const Run = require('../models/Routes')

exports.run_create = (req, res, next) => {
    const { userID, day, routeID, avgPace, totalTime } = req.body

    const run = new Run ({
        userID: userID,
        day: day,
        routeID: routeID,
        avgPace: avgPace,
        totalTime: totalTime,
    })

    run.save(function (err) {
        if (err) return res.status(500).json(err.message);
        
        res.send('Run added successfully')
    })
}

exports.run_findByUserID = function(req,res,next) {
    Run.find({ userID : userID })
    .exec(function(err, runs){
        if(err){
            
            return res.status(500).send({
                message: "Error retrieving runs with given User ID" + req.params.userID
            })
        }
        res.send(runs);
    });
};

exports.run_findByRouteID = function(req,res,next) {
    Run.find({ 
        userID : userID,
        routeID : routeID 
    })
    .exec(function(err, runs){
        if(err){
            
            return res.status(500).send({
                message: "Error retrieving runs with given Route ID" + req.params.routeID
            })
        }
        res.send(runs);
    });
};

exports.run_update = function (req, res, next) {
    Run.findByIdAndUpdate(req.params.id, {$set: req.body}, 
    function (err, run) {
        if (err) {
            return res.status(500).json(err.message);
        }
        res.send(run);
    });
};

exports.run_details = function (req, res, next) {
    Run.findById(req.params.id, function (err, run) {
        if (err) return res.status(500).json(err.message);
        res.send(run);
    })
};

exports.run_delete = function (req, res, next) {
    Route.findByIdAndRemove(req.params.id, function (err) {
        if (err) return res.status(500).json(err.message);
        res.send('Deleted successfully!');
    })
};