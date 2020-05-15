const Friend = require('../models/Friends');
const User = require('../models/Users');

const ObjectID = require('mongodb').ObjectID;


exports.friend_add = (req, res) => {

    const { email } = req.body;

    const user1 = req.user;

    let emailToCheck = req.body.email;

    console.log({email})

    var bool;

    User.findOne({ email }, (err, user) => {

        const user2 = user._id;

        if (err) return console.log(err)
        else if (!user) return res.status(404).json("User does not exist")

        else if (user.id == req.user) {
            return res.status(403).json("You cannot add yourself as a friend.")
        } else {

             User.findOne({_id: new ObjectID(req.user)}, (err, user) => {
                if (err) return res.status(500).json(err.message);        
                
                var isInFriends = function() {
                    bool = false;
                    for (i = 0; i < user.friends.length; i++) {
                        console.log("Checking " + user.friends[i].email + " and " + emailToCheck)

                        if (user.friends[i].email.trim() == emailToCheck.trim()){
                            bool = true;
                            console.log("match found")
                            break
                        } 
                        return bool
                    }
                    console.log("isInFriends: " + bool)

                    return bool
                }

                bool = isInFriends();

                var isInBlocked = function() {
                    bool2 = false;
                    console.log(user.blockedUsers)
                    for (i = 0; i < user.blockedUsers.length; i++) {
                        console.log("Checking " + user.blockedUsers[i] + " and " + user2)

                        if (user.blockedUsers[i].toString().trim() == user2.toString().trim()){
                            bool2 = true;
                            console.log("match found")
                            break
                        } 
                    }
                    console.log("isInBlocked: " + bool2)

                    return bool2
                }

                bool2 = isInBlocked();

                var isInFriendRequests = function() {
                    bool3 = false;
                    console.log(user.friendRequests)
                    for (i = 0; i < user.friendRequests.length; i++) {
                        console.log("Checking " + user.friendRequests[i] + " and " + user2)

                        if (user.friendRequests[i].toString().trim() == user2.toString().trim()){
                            bool3 = true;
                            console.log("match found")
                            break
                        } 
                    }
                    console.log("isInFriendRequests: " + bool3)

                    return bool3
                }

                bool3 = isInFriendRequests();

                if (bool) {
                    return res.status(403).json('Friend is already added, pending or blocked.');
                } else if (bool2) {
                    return res.status(403).json('User is in blocked list.');
                } else if (bool3) {
                    return res.status(403).json('User has already sent you a friends request.');
                }
                else {
                    console.log(req.user + " sent a request to user with email: " + email)
                    console.log(user._id)
                    console.log(user1)
                    console.log(user2)
    
                    const friend = new Friend({
                        friend: user2,
                        email: email,
                        status: "Pending"
                    })
                    User.findOneAndUpdate({_id: new ObjectID(req.user)}, {$push: {friends: friend}}, (err) => {
                        if (err) return res.status(500).json(err.message);        
                        User.findOneAndUpdate({email: email}, {$push: {friendRequests: new ObjectID(req.user)}}, (err) => {
                            if (err) return res.status(500).json(err.message);        
                            return res.status(200).json(friend);
                        });                    
                    });
                }

                return bool
     
            });
        }

    });
    
}

exports.friend_respond = (req, res) => {

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
                return res.status(200).json(friend);
            });
        });

    } else if (response == "Reject") {
        User.findOneAndUpdate({_id: new ObjectID(req.user)}, {$pull: {friendRequests: requestor}}, (err, user) => {
            if (err) return res.status(500).json(err.message);        
            console.log(req.body + "removed from friend requestd")        
            const friendEmail = user.email

            User.findOneAndUpdate({_id: new ObjectID(requestor) }, {$pull: { friends: { email: friendEmail }}}, (err, user) => {
                if (err) return res.status(500).json(err.message);        
                console.log(user)        
                return res.status(200).json(requestor);
            });        
        });
    } else if (response == "Block") {
        User.findOneAndUpdate({_id: new ObjectID(req.user)}, {$push: {blockedUsers: requestor}, $pull: {friendRequests: requestor}}, (err, user) => {
            if (err) return res.status(500).json(err.message);        
            console.log(req.body)        
            const friendEmail = user.email

            User.findOneAndUpdate({_id: new ObjectID(requestor), 'friends.email': friendEmail}, {$set: {'friends.$.status': 'Blocked'}}, (err, user) => {
                if (err) return res.status(500).json(err.message);        
                console.log(user)        
                return res.status(200).json(requestor);
            });        
        });
    }

}

exports.friend_manage = (req, res) => {

    const { friend, decision } = req.body;

    if (decision == "Remove"){
        User.findOneAndUpdate({_id: new ObjectID(req.user)}, {$pull: { friends: { friend: friend }}}, (err, user) => {
            if (err) return res.status(500).json(err.message);        
            console.log(req.body + "removed from friend requestd")        
            const friendEmail = user.email

            User.findOneAndUpdate({_id: new ObjectID(friend) }, {$pull: { friends: { email: friendEmail }}}, (err, user) => {
                if (err) return res.status(500).json(err.message);        
                console.log(user)        
                return res.status(200).json(friend);
            });        
        });
    } else if (decision == "Block"){
        User.findOneAndUpdate({_id: new ObjectID(req.user)}, {$push: {blockedUsers: friend}, $pull: { friends: { friend: friend }}}, (err, user) => {
            if (err) return res.status(500).json(err.message);        
            console.log(req.body + "removed from friend requestd")        
            const friendEmail = user.email

            User.findOneAndUpdate({_id: new ObjectID(friend), 'friends.email': friendEmail }, {$set: {'friends.$.status': 'Blocked'}}, (err, user) => {
                if (err) return res.status(500).json(err.message);        
                console.log(user)        
                return res.status(200).json(friend);
            });        
        });
    }

}

