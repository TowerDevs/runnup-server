const Route = require('../models/Routes')

const ObjectID = require('mongodb').ObjectID;

exports.route_create = (req, res) => {
    const { name, length, duration, pace, calories } = req.body

    const route = new Route ({
        user:  ObjectID(req.user),
        name: name,
        distance: length,
        duration: duration,
        pace: pace,
        calories: calories
    })

    console.log(req.body)

    route.save(function (err) {
        if (err) return res.status(500).json(err.message);
        console.log('Route added successfully')
        res.status(201).json(route)
    })
}

exports.route_findByUserID = function(req, res) {
    Route.find({ user : req.user }, 'name distance duration pace calories')
    .exec(function(err, routes){
        if(err){
            
            return res.status(500).send({
                message: "Error retrieving routes with given User ID" + req.user
            })
        }
        res.status(200).json(routes);
    });
};

exports.route_details = function (req, res) {
    Route.findById(req.params.id, function (err, route) {
        if (err) return res.status(500).json(err.message);
        console.log("Route details retrieved.")
        res.status(200).json(route);
    })
};

exports.route_update = function (req, res) {
    Route.findByIdAndUpdate(req.params.id, {$set: req.body}, 
    function (err, route) {
        if (err) return res.status(500).json(err.message);
        console.log("Route updated.")
        res.status(200).json(route);
    });
};

exports.route_delete = function (req, res) {
    Route.findByIdAndRemove(req.params.id, function (err, route) {
        if (err) return res.status(500).json(err.message);
        console.log("Route deleted.")
        res.status(200).json(route);
    })
};