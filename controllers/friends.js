const Friend = require('../models/Friends');
const User = require('../models/Users');

const ObjectID = require('mongodb').ObjectID;


exports.friend_add = (req, res, next) => {

    const { email } = req.body;

    User.findOne({email}), (err, user) => {
        if (err) console.log(err)

        else if (!user) res.status(403).json("User does not exist")

        else {
            const friend = new Friend({
                friend: user._id,
                email: email,
                status: "pending"
            })
            User.findOneAndUpdate({_id: new ObjectID(req.user)}, {$push: {friends: friend}}, (err, user) => {
                if (err) return next(err);
        
                console.log(req.body)
        
                return res.status(200).json('Friend Added.');
            });
        }
    }
    
}

