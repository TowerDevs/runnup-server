const Friend = require('../models/Friends');
const User = require('../models/Users');

const ObjectID = require('mongodb').ObjectID;


exports.friend_add = (req, res, next) => {

    const { email } = req.body;

    console.log({email})

    User.findOne({ email }, (err, user) => {

        if (err) return console.log(err)
        else if (!user) return res.status(404).json("User does not exist")

        else if (user.id == req.user) {
            return res.status(404).json("You cannot add yourself as a friend.")
        }

        else {

            console.log("User ID" + user._id)

            const friend = new Friend({
                email: email,
                status: "pending"
            })
            User.findOneAndUpdate({_id: new ObjectID(req.user)}, {$push: {friends: friend}}, (err) => {
                if (err) return next(err);        
                console.log(req.body)        
                return res.status(200).json('Friend Added.');
            });

        }

    });
    
}

