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
                        status: "Pending"
                    })
                    User.findOneAndUpdate({_id: new ObjectID(req.user)}, {$push: {friends: friend}}, (err) => {
                        if (err) return res.status(500).json(err.message);        
                        console.log(req.body)        
                        return res.status(200).json('Friend Added.');
                    });
                    User.findOneAndUpdate({email: email}, {$push: {friendRequests: new ObjectID(req.user)}}, (err) => {
                        if (err) return res.status(500).json(err.message);        
                        console.log(req.body)        
                        return res.status(200).json('Friend request sent.');
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

exports.friend_respond = (req, res, next) => {

    const { requestor, response } = req.body;

    if (response == "Accept") {
        const friend = new Friend({
            friend: requestor,
            status: "Accepted"
        })
        User.findOneAndUpdate({_id: new ObjectID(req.user)}, {$push: {friends: friend}, $pull: {friendRequests: requestor}}, (err, user) => {
            if (err) return res.status(500).json(err.message);        
            console.log(req.body)        
            console.log(user.friends[1])        
            console.log("Checking for match for user with ID: " + requestor + " and has a friend with this email: " + user.email)  
            
            const friendEmail = user.email

            User.findOneAndUpdate({_id: new ObjectID(requestor), 'friends.email': friendEmail}, {$set: {'friends.$.status': 'Accepted'}}, (err, user) => {
                if (err) return res.status(500).json(err.message);        
                console.log(user)        
                return res.status(200).json('Friend status set to accepted.');
            });
        });

    } else if (response == "Reject") {
        User.findOneAndUpdate({_id: new ObjectID(req.user)}, {$pull: {friendRequests: requestor}}, (err) => {
            if (err) return res.status(500).json(err.message);        
            console.log(req.body)        
            const friendEmail = user.email

            User.findOneAndUpdate({_id: new ObjectID(requestor) }, {$pull: {'friends.email': friendEmail}}, (err, user) => {
                if (err) return res.status(500).json(err.message);        
                console.log(user)        
                return res.status(200).json('Friend status set to accepted.');
            });        
        });
    } else if (response == "Block") {
        User.findOneAndUpdate({_id: new ObjectID(req.user)}, {$push: {blockedUsers: requestor}}, (err) => {
            if (err) return res.status(500).json(err.message);        
            console.log(req.body)        
            const friendEmail = user.email

            User.findOneAndUpdate({_id: new ObjectID(requestor), 'friends.email': friendEmail}, {$set: {'friends.$.status': 'Blocked'}}, (err, user) => {
                if (err) return res.status(500).json(err.message);        
                console.log(user)        
                return res.status(200).json('Friend status set to accepted.');
            });        
        });
    }



}

