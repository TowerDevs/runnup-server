const User = require('../models/Users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.user_create = (req, res, next) => {
    let { name, email, password, region } = req.body
    
    User.findOne({email: userData.email}, (err, user) => {
        if (err) console.log(err)
        
        else if (user) {
                res.statusMessage = 'User already exists'
                res.status(403).json("User already exists")
            }
        else {
            let user = new User({
                    name: name,
                    email: email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    region: region,
                    spotifyID: null,
                    friends: null,
            });
        
            user.save(function (err, registeredUser) {
                if (err) return next(err);
                 
                let payload = { subject: registeredUser._id}
                let token = jwt.sign(payload, 'secretKey')
                
                return res.status(201).json(token)
               
            })
        }
        
    })
    
}

exports.user_login = (req, res, next) => {
    let { email, password } = req.body
    
    User.findOne({ email: email }, (err, user) => {
        if (err) console.log(err)
        
        else {
            if (!user) {
                res.statusMessage = 'Invalid email'
                res.status(401).send('Invalid email')
            } 
            else { 
                (bcrypt.compare(password, user.password, (err, result) => {
                    if (result) {
                        let payload = {subject: user._id}
                        let token = jwt.sign(payload, 'secretKey')
                        
                        return res.status(201).json(token)     
                    } else {
                        res.statusMessage = 'Incorrect Password'
                        return res.status(401).send('Incorrect password')
                    }
                })) 
            } {
                
            }
            
        }
    })
}

exports.user_all = (req, res, next) => {
    User.find((err, user) => {
        if (err) return next(err);
        
        return res.status(200).json(user);
    });   
}

exports.user_details = (req, res, next) => {
    const { id } = req.user;
    
    User.findById(id, (err, user) => {
        if (err) return next(err);
        
        return res.json(user);
    })
};

exports.user_update = function (req, res, next) {
    const { id } = req.user;
    
    User.findByIdAndUpdate(id, {$set: req.body}, (err, user) => {
        if (err) return next(err);
        
        return res.status(200).json('User updated.');
    });
};

module.exports = router
