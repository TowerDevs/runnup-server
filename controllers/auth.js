const User = require('../models/Users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const secretKey = process.env.AUTH_SECRET;

const Routes = require('../models/Routes')
const Runs = require('../models/Runs')

const ObjectID = require('mongodb').ObjectID;


exports.user_create = (req, res, next) => {
    const { name, email, password, region } = req.body

    User.findOne({ email }, (err, user) => {
        if (err) console.log(err)

        else if (user) res.status(403).json("User already exists")

        else {
            const user = new User({
                name: name,
                email: email,
                password: bcrypt.hashSync(password, 10),
                region: region
            });

            user.save((err, registeredUser) => {
                if (err) return next(err);

                const payload = { subject: registeredUser._id}
                const token = jwt.sign(payload, secretKey)

                return res.status(201).json(token)
            })
        }
    })
}

exports.user_login = (req, res, next) => {
    const { email, password } = req.body

    User.findOne({ email }, (err, user) => {
        if (err) console.log(err)

        else if (!user) res.status(401).json('Invalid email')

        bcrypt.compare(password, user.password, (err, result) => {
            if(err) return res.status(500).json(err.message);

            if (result) {
                const payload = {subject: user._id}
                const token = jwt.sign(payload, secretKey)

                return res.status(201).json(token);
            }

            return res.status(401).json('Incorrect password')
        })
    })
}

exports.user_details = (req, res, next) => {

    User.findOne({_id: new ObjectID(req.user)}, (err, user) => {
        if (err) return res.status(500).json(err.message);

        return res.json(user);
    })
};

exports.user_update = (req, res, next) => {

    User.findOneAndUpdate({_id: new ObjectID(req.user)}, {$set: req.body}, (err, user) => {
        if (err) return res.status(500).json(err.message);

        console.log(req.body)

        return res.status(200).json('User updated.');
    });
};

exports.user_delete = (req, res, next) => {

    User.deleteOne({_id: new ObjectID(req.user)}, (err, user) => {
        if (err) return res.status(500).json(err.message);

        // Routes.deleteMany({user: new ObjectID(req.user) }).exec()
        // Runs.deleteMany({user: new ObjectID(req.user) }).exec()

        return res.status(200).json('User deleted.');
    });
};
