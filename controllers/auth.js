const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.user_create = function (req, res, next) {
    let userData = req.body
    User.findOne({email: userData.email}, (err, user) => {
        if (err) {
            console.log(err)
        } 
        else if (user) {
                res.statusMessage = 'User already exists'
                res.status(403).send("User already exists")
            }
        else {
            let user = new User(
                {
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    region: req.body.region,
                    spotifyID: req.body.spotifyID,
                    friends: null,
                }
            );
        
            user.save(function (err, registeredUser) {
                if (err) {
                    return next(err);
                } 
                else {
                    let payload = { subject: registeredUser._id}
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({token})
                }
                
            })
        }
        
    })
    
}

exports.user_login = function (req, res, next) {
    let userData = req.body
    User.findOne({email: userData.email}, (err, user) => {
        if (err) {
            console.log(err)
        } 
        else {
            if (!user) {
                res.statusMessage = 'Invalid email'
                res.status(401).send('Invalid email')
            } 
            else { 
                (bcrypt.compare(userData.password, user.password, function (err, result) {
                    if (result) {
                        let payload = {subject: user._id}
                        let token = jwt.sign(payload, 'secretKey')
                        res.status(200).send({token})     
                        return true
                    } else {
                        res.statusMessage = 'Incorrect Password'
                        res.status(401).send('Incorrect password')
                        return false
                    }
                })) 
            } {
                
            }
            
        }
    })
}

exports.user_all = function (req, res, next) {
    User.find(function(err, user) {
        if (err)
            return next(err);
        res.json(user);
    });   
}

exports.user_details = function (req, res, next) {
    User.findById(req.user.id, function (err, user) {
        if (err) return next(err);
        res.send(user);
    })
};

exports.user_update = function (req, res, next) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, 
    function (err, user) {
        if (err) {
            return next(err);
        }
        res.send('User updated.');
    });
};

module.exports = router
