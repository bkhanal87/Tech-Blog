const router = require("express").Router();
const { User, Entry, Comment } = require("../../models");

const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");


// GET api/posts/ -- get all posts
router.get("/", (req, res) => {
    Entry.findAll({
        
        attributes: [
            'id',
            'entry_text',
            'title',
            'created_at',
        ],
        order: [['created_at', 'DESC']],
        
        include: [
            {
                model: User,
                attributes: ['name']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'entry_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['name']
                }
            }
        ]
    }).then(dbPostData => res.json(dbPostData))  // return the post
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET api/posts/:id -- get a single post by id
router.get('/:id', (req, res) => {
    Entry.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'entry_text',
            'title',
            'created_at',
        ],
        include: [
            {
                model: User,
                attributes: ['name']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'entry_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['name']
                }
            }
        ]
    }).then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post with this id was found!' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST api/posts -- create a new post
router.post('/', withAuth, (req, res) => {
    Entry.create({
        title: req.body.title,
        entry_text: req.body.entry_text,
        user_id: req.session.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT api/posts/1-- update a post's title or text
router.put('/:id', withAuth, (req, res) => {
    Entry.update(req.body,
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
});

// DELETE api/posts/1 -- delete a post
router.delete('/:id', withAuth, (req, res) => {
    Entry.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;