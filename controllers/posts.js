const Post = require("../models/posts");

exports.create = (req, res) => {
    const { title, category, body } = req.body;

    Post.create({
        title, 
        category, 
        body
    })
    .then(post => {
        return res.status(201).json(post);
    })
    .catch(err => {
        return res.status(500).json({ message: err.message });
    });
};

exports.read= (req, res) => {
    Post.find()
    .sort({ updatedAt: 1 })
    .then(posts => {
        if(!posts) {
            return res.status(404).json({ message: "Posts not found" });
        };

        return res.status(200).json(posts);
    })
    .catch(err => {
        return res.status(500).json({ message: err.message });
    });
};

exports.return = (req, res) => {
    const { _id } = req.params;

    Post.findById(_id)
    .then(post => {
        if(!post) {
            return res.status(404).json({ message: "Post not found" });
        };

        return res.status(200).json(post);
    })
    .catch(err => {
        return res.status(500).json({ message: err.message });
    });
};

exports.update = (req, res) => {
    const { _id } = req.params;
    const { title, category, body } = req.body; 

    Post.findByIdAndUpdate(_id, {
        $set: {
            title,
            category,
            body
        }
    })
    .then(post => {
        if(!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json(post);
    })
    .catch(err => {
        return res.status(500).json({ message: err.message });
    });
};

exports.delete = (req, res) => {
    const { _id } = req.params;
    
    Post.findByIdAndDelete(_id)
    .then(post => {
        if(!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json({ message: "Post deleted" });
    })
    .catch(err => {
        return res.status(500).json({ message: err.message });
    });
};