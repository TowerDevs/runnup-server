const Friend = require('../models/Friends');
const User = require('../models/Users');

const ObjectID = require('mongodb').ObjectID;


exports.friend_add = (req, res, next) => {

    const { email } = req.body;

    let emailToCheck = req.body.email;

    console.log({email})

    var bool;


    User.findOne({ email }, (err, user) => {

        if (err) return console.log(err)
        else if (!user) return res.status(404).json("User does not exist")

        else if (user.id == req.user) {
            return res.status(403).json("You cannot add yourself as a friend.")
        }

        else if (0){

            let sender = User.findOne({_id: new ObjectID(req.user)},function(err,user){
                if (err) throw err;
                //console.log("returned from the model: ",user.friends)
                return user.friends;
            })
            console.log("Email: "+ email)    

        }

        else {

             User.findOne({_id: new ObjectID(req.user)}, (err, user) => {
                if (err) return next(err);        

                var isInArray = function() {
                    bool = false;
                    for (i = 0; i < user.friends.length; i++) {
                        console.log("Checking " + user.friends[i].email + " and " + emailToCheck)

                        if (user.friends[i].email == emailToCheck){
                            bool = true;
                            return bool
                            break
                        } 
                    }
                    console.log(bool)

                    return bool
                }

                bool = isInArray();

                console.log("isInArray: " + bool)

                if (bool) {
                    return res.status(403).json('Friend is already added.');
                }
                else if (!bool) {
                    console.log(req.user + " added user with email: " + email)
    
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
                else {
                    console.log("something went wrong")
                }

                return bool
     
            });
        }

    });
    
}

