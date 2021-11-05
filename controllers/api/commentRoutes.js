const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Route to get comments
router.get("/", (req, res) => {
    Comment.findAll()
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// Route to post a comment
router.post("/", withAuth, (req, res) => {
    if (req.session) {
        Comment.create({
            comment_txt: req.body.comment_txt,
            entry_id: req.body.entry_id,
            user_id: req.session.user_id
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

// Route to delete a comment
router.delete("/:id", withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id:req.params.id
        }
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: "No comment found with this id!" });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router; 
