const Route = require('../models/Routes')

exports.route_create = (req, res, next) => {
    const { userID, routeName, length, duration } = req.body

    const route = new Route ({
        userID: userID,
        routeName: routeName,
        length: length,
        duration: duration,
    })

    route.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Route added successfully')
    })
}

exports.route_findByUserID = function(req,res,next) {
    Route.find({ userID : userID })
    .exec(function(err, routes){
        if(err){
            
            return res.status(500).send({
                message: "Error retrieving routes with given User ID" + req.params.userID
            })
        }
        res.send(routes);
    });
};

exports.route_details = function (req, res, next) {
    Route.findById(req.params.id, function (err, route) {
        if (err) return next(err);
        res.send(route);
    })
};

exports.route_update = function (req, res, next) {
    Route.findByIdAndUpdate(req.params.id, {$set: req.body}, 
    function (err, route) {
        if (err) {
            return next(err);
        }
        res.send(route);
    });
};

exports.route_delete = function (req, res, next) {
    Route.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};