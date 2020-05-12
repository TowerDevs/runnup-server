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

exports.review_findByUserID = function(req,res,next) {
    Route.find({ userID : userID })
    .exec(function(err, reviews){
        if(err){
            
            return res.status(500).send({
                message: "Error retrieving routes with given User ID" + req.params.userID
            })
        }
        res.send('Routes retrieves successfully');
    });
};