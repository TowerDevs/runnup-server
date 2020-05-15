const Route = require('../models/Routes')

const ObjectID = require('mongodb').ObjectID;

exports.route_create = (req, res, next) => {
    const { name, length, duration, pace, calories } = req.body

    const route = new Route ({
        user:  ObjectID(req.user),
        name: name,
        distance: length,
        duration: duration,
        pace: pace,
        calories: calories
    })

    console.log(req.user)

    route.save(function (err) {
        if (err) {
            return next(err);
        }
        res.status(201).send('Route added successfully')
    })
}

exports.route_findByUserID = function(req,res,next) {
    Route.find({ user : req.user }, 'name distance duration pace calories')
    .exec(function(err, routes){
        if(err){
            
            return res.status(500).send({
                message: "Error retrieving routes with given User ID" + req.user
            })
        }
        res.status(200).send(routes);
    });
};

exports.route_details = function (req, res, next) {
    Route.findById(req.params.id, function (err, route) {
        if (err) return next(err);
        res.status(200).send(route);
    })
};

exports.route_update = function (req, res, next) {
    Route.findByIdAndUpdate(req.params.id, {$set: req.body}, 
    function (err, route) {
        if (err) {
            return next(err);
        }
        res.status(200).send(route);
    });
};

exports.route_delete = function (req, res, next) {
    Route.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.status(200).send('Deleted successfully!');
    })
};