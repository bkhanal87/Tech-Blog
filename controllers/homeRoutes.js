const router = require("express").Router();
const { Entry, User, Comment } = require("../models");

// Route for rendering the Homepage
router.get("/", (req, res) => {
  Entry.findAll({
    attributes: ["id", "entry_text", "title", "created_at"],
    order: [["created at", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["name"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "entry_id", "user_id", "created_at"]
      }
    ]
  })
    .then((dbPostData) => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render("homepage", {
        posts,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});



// Route for rendering the single post page
router.get("/entries/:id", (req, res) => {
  Entry.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "entry_text", "title", "created_at"],
    include: [
      {
        model: User,
        attributes: ["name"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "entry_id", "user_id", "created_at"],
      }
    ]
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "Entry with this id was not found!" });
        return;
      }
      const post = dbPostData.get({ plain: true });
      res.render("singleEntry", {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Route to redirect user to the dashboard if the user is logged in
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;

  }

  res.render('login');
});

//Route for rendering the sign up page
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/dashboard");
        return;
    }
    res.render("login");
});

module.exports = router; 