const Run = require('../models/runs')

const ObjectID = require('mongodb').ObjectID;

exports.run_create = (req, res, next) => {
    const { timestamp, route, avgPace, totalTime } = req.body

    const run = new Run ({
        user:  ObjectID(req.user),
        timestamp: timestamp,
        route: route,
        avgPace: avgPace,
        totalTime: totalTime,
    })

    run.save(function (err) {
        if (err) return res.status(500).json(err.message);
        console.log('Run added successfully')
        res.status(201).json(run)
    })
}

exports.run_findByUserID = function(req,res,next) {
    Run.find({ user : req.user })
    .exec(function(err, runs){
        if(err){
            
            return res.status(500).send({
                message: "Error retrieving runs with given User ID" + req.user
            })
        }
        console.log('Runs retrieved')
        res.status(200).json(runs);
    });
};

exports.run_findByRouteID = function(req,res,next) {
    Run.find({ 
        user : req.user,
        route : route 
    })
    .exec(function(err, runs){
        if(err){
            
            return res.status(500).send({
                message: "Error retrieving runs with given Route ID" + req.params.routeID
            })
        }
        console.log('Runs under route retrieved')
        res.status(200).json(runs);
    });
};

exports.run_update = function (req, res, next) {
    Run.findByIdAndUpdate(req.params.id, {$set: req.body}, 
    function (err, run) {
        if (err) return res.status(500).json(err.message);
        console.log('Run updated')
        res.status(200).json(run);
    });
};

exports.run_details = function (req, res, next) {
    Run.findById(req.params.id, function (err, run) {
        if (err) return res.status(500).json(err.message);
        console.log('Run details retrieved')
        res.status(200).json(run);
    })
};

exports.run_delete = function (req, res, next) {
    Route.findByIdAndRemove(req.params.id, function (err, run) {
        if (err) return res.status(500).json(err.message);
        console.log('Run deleted')
        res.status(200).json(run);
    })
};