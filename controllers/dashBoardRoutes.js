const router = require("express").Router();
const sequelize = require("../config/connection");

const { Entry, User, Comment } = require("../models");
const withAuth = require("../utils/auth")

// Get route that renders the dashboard page only for logged in users

router.get('/', withAuth, (req, res) => {
    Entry.findAll({
        where: { 
            user_id: req.session.user_id
        },
        attributes: [
            "id",
            "entry_text",
            "title",
            "created_at",
        ],
        include: [
            {
                model: User,
                attributes: ["name"]
            }
        ]
    }).then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true })); 
        console.log(posts);
        res.render("dashboard", { posts, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get route for editing a post

router.get('/edit/:id', withAuth, (req, res) => {
    Entry.findOne({
        where: { 
            id: req.session.id
        },
        attributes: [
            "id",
            "entry_text",
            "title",
            "created_at",
        ],
        include: [
            {
                    model:Comment,
                    attributes: ["id", "comment_text", "entry_id", "user_id", "created_at"],
                    include: {
                        model: User,
                        attributes: ["name"]
                }
            },
            {
                model: User,
                attributes: ["name"]
            }
        ]
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: "No post with this id was found" });
            return;
        }

        const posts = dbPostData.get({ plain: true }); 
        console.log(posts);
        res.render("edit-entry", { post, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get route for editing the logged in user

router.get('/edituser', withAuth, (req, res) => {
    User.findOne({
        attributes: { exclude: ["password"] },
        where: { 
            id: req.session.user_id
        }
        
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: "No user with this id was found" });
            return;
        }

        const user = dbUserData.get({ plain: true }); 
        console.log(posts);
        res.render("edit-user", { user, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router; 
